import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../libraries/Redux/authSlice';
import { commonStyles } from '../../constants/commonStyle';
import Wrapper from '../../components/Wrapper';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const validate = () => {
        let valid = true;
        let tempErrors = {};

        if (!username.trim()) {
            tempErrors.username = 'Username is required';
            valid = false;
        } else if (username.trim().length < 3) {
            tempErrors.username = 'Username must be at least 3 characters';
            valid = false;
        }

        if (!password.trim()) {
            tempErrors.password = 'Password is required';
            valid = false;
        } else if (password.trim().length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(tempErrors);
        return valid;
    };

    const handleLogin = () => {
        if (validate()) {
            Alert.alert('Success', 'Logged in successfully', [
                { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
            ]);
            dispatch(login());
        }
    };

    return (
        <Wrapper scrollable>
            <View style={[styles.innerContainer, commonStyles.containerPadding]}>
                <Text style={commonStyles.title}>Login to HealthSetGo</Text>
                <CustomTextInput
                    label='Please Enter Name*'
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    error={errors.username}
                />
                <CustomTextInput
                    label='Please Enter Password*'
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    error={errors.password}
                />

                <CustomButton title="Login" onPress={handleLogin} />
            </View>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: '100%',
    },
});
