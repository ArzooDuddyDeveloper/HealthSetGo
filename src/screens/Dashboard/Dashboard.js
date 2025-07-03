import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../libraries/Redux/productActions';
import { commonStyles } from '../../constants/commonStyle';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import CustomHeader from '../../components/CustomHeader';
import Wrapper from '../../components/Wrapper';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import CustomTextInput from '../../components/CustomTextInput';
const ITEMS_PER_PAGE = 10;
export default function Dashboard({ navigation }) {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            setVisibleProducts(products.slice(0, ITEMS_PER_PAGE));
        }
    }, [products]);

    const handleLoadMore = () => {
        if (isFetchingMore) return;

        if (visibleProducts.length < filteredProducts.length) {
            setIsFetchingMore(true);
            setTimeout(() => {
                const nextPage = page + 1;
                const newItems = filteredProducts.slice(0, nextPage * ITEMS_PER_PAGE);
                setVisibleProducts(newItems);
                setPage(nextPage);
                setIsFetchingMore(false);
            }, 1000);
        }
    };

    const filteredProducts = useMemo(() => {
        if (searchQuery.trim() === '') return products;
        return products.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, products]);

    const handleSearchToggle = useCallback(() => {
        setSearchVisible(prev => !prev);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);

    const handleProductPress = useCallback((product) => {
        navigation.navigate('ProductDetail', { product });
    }, [navigation]);

    const renderProduct = useCallback(({ item }) => (
        <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
        />
    ), [handleProductPress]);

    if (loading) return <Loader />;

    if (error) return <Text style={styles.error}>Error: {error}</Text>;

    return (
        <Wrapper>
            <FlatList
                data={visibleProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingMore && <ActivityIndicator size="large" color={Colors.primary} />}
                ListHeaderComponent={
                    <>
                        <CustomHeader title="Dashboard" onSearch={handleSearchToggle} />
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
