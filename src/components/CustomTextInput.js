import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { commonStyles } from '../constants/commonStyle';

export default function CustomTextInput({
    label,
    placeholder,
    value,
    onChangeText,
    error,
    keyboardType,
    secureTextEntry,
}) {
    return (
        <View style={styles.inputContainer}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
                style={[styles.input,commonStyles.shadow, error && { borderColor: Colors.rejected }]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: Colors.black,
        fontFamily: Fonts.medium
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: Colors.white,
    },
    errorText: {
        color: Colors.rejected,
        fontSize: 12,
        marginTop: 5,
    },
});
