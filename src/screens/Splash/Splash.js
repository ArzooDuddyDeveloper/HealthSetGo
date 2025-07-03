import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const Splash = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome !</Text>
            <Text style={styles.title}>HealthSetGo</Text>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        color: Colors.white,
        fontFamily: Fonts.extraBold,
    },
});
