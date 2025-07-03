// React and React Native imports
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Redux action to fetch products
import { getProducts } from '../../libraries/Redux/productActions';

// Common styles and custom components
import { commonStyles } from '../../constants/commonStyle';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import CustomHeader from '../../components/CustomHeader';
import Wrapper from '../../components/Wrapper';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const ITEMS_PER_PAGE = 10; // Number of products to load per page

export default function Dashboard({ navigation }) {
    const dispatch = useDispatch();

    // Get products, loading state, and error from Redux store
    const { products, loading, error } = useSelector((state) => state.products);

    // Local states
    const [visibleProducts, setVisibleProducts] = useState([]); // Products currently visible
    const [page, setPage] = useState(1); // Current page number for pagination
    const [isFetchingMore, setIsFetchingMore] = useState(false); // Loading indicator for fetching more items
    const [searchVisible, setSearchVisible] = useState(false); // Toggle search bar visibility
    const [searchQuery, setSearchQuery] = useState(''); // Search input value

    // Fetch product list when component mounts
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Filter products based on search query
    const filteredProducts = useMemo(() => {
        if (searchQuery.trim() === '') return products;
        return products.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, products]);

    // Reset pagination and update visible products when search query changes
    useEffect(() => {
        setVisibleProducts(filteredProducts.slice(0, ITEMS_PER_PAGE));
        setPage(1);
    }, [filteredProducts]);

    // Load more items when the user reaches the bottom of the list
    const handleLoadMore = () => {
        if (isFetchingMore) return;

        // Load more only if not all filtered products are visible yet
        if (visibleProducts.length < filteredProducts.length) {
            setIsFetchingMore(true);
            setTimeout(() => {
                const nextPage = page + 1;
                const newItems = filteredProducts.slice(0, nextPage * ITEMS_PER_PAGE);
                setVisibleProducts(newItems);
                setPage(nextPage);
                setIsFetchingMore(false);
            }, 500); // delay
        }
    };

    // Toggle the search bar visibility
    const handleSearchToggle = useCallback(() => {
        setSearchVisible(prev => !prev);
    }, []);

    // Clear the search input
    const handleClearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);

    // Navigate to product detail page when a product is selected
    const handleProductPress = useCallback((product) => {
        navigation.navigate('ProductDetail', { product });
    }, [navigation]);

    // Render each product card
    const renderProduct = useCallback(({ item }) => (
        <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
        />
    ), [handleProductPress]);

    // Show loader while products are being fetched
    if (loading) return <Loader />;

    // Show error message if product fetch failed
    if (error) return <Text style={styles.error}>Error: {error}</Text>;

    return (
        <Wrapper>
            <FlatList
                data={visibleProducts} // List of currently visible products
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore} // Load more when reaching bottom
                onEndReachedThreshold={0.5} // Trigger when list is scrolled halfway
                ListFooterComponent={
                    isFetchingMore && <ActivityIndicator size="large" color={Colors.primary} />
                } // Show loading indicator when fetching more
                ListHeaderComponent={
                    <>
                        <CustomHeader title="Dashboard"IconName='menu' onSearch={handleSearchToggle} />
                        {searchVisible && (
                            <View style={[styles.searchContainer, commonStyles.containerPadding]}>
                                <TextInput
                                    placeholder="Search products..."
                                    style={styles.searchInput}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    autoFocus
                                />
                                <TouchableOpacity onPress={handleClearSearch}>
                                    <Text style={styles.clearText}>Clear</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={commonStyles.containerPadding}>
                            <Text style={commonStyles.bold_txt}>Product List</Text>
                        </View>
                    </>
                }
            />
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    error: {
        flex: 1,
        textAlign: 'center',
        marginTop: 50,
        color: Colors.rejected,
        fontSize: 18,
        fontFamily: Fonts.medium
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        backgroundColor: Colors.white,
        elevation: 2
    },
    searchInput: {
        flex: 1,
        height: 50,
    },
    clearText: {
        color: Colors.primary,
        marginLeft: 10,
    },
});
