import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Colors from '../constants/colors';

export default function Wrapper({ children, scrollable = false, style, contentContainerStyle }) {
    if (scrollable) {
        return (
            <KeyboardAvoidingView
                style={styles.flexContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={[styles.scrollWrapper, contentContainerStyle]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    return (
        <View style={[styles.viewWrapper, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    scrollWrapper: {
        flex:1,
        backgroundColor: Colors.borGray,
    },
    viewWrapper: {
        flex: 1,
        backgroundColor: Colors.borGray,
    },
});
