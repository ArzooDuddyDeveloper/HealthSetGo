import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../libraries/Redux/authSlice'; // Redux action to update login state
import { commonStyles } from '../../constants/commonStyle'; // Common reusable styles
import Wrapper from '../../components/Wrapper'; // Wrapper component with optional scroll support
import CustomButton from '../../components/CustomButton'; // Custom button component
import CustomTextInput from '../../components/CustomTextInput'; // Custom text input component with label and error support

export default function Login({ navigation }) {
    // State to manage input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); // State to manage validation errors
    const dispatch = useDispatch(); // Redux dispatch function

    // Form validation logic
    const validate = () => {
        let valid = true;
        let tempErrors = {};

        // Username validation
        if (!username.trim()) {
            tempErrors.username = 'Username is required';
            valid = false;
        } else if (username.trim().length < 3) {
            tempErrors.username = 'Username must be at least 3 characters';
            valid = false;
        }

        // Password validation
        if (!password.trim()) {
            tempErrors.password = 'Password is required';
            valid = false;
        } else if (password.trim().length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        // Update error state
        setErrors(tempErrors);
        return valid;
    };

    // Login button handler
    const handleLogin = () => {
        if (validate()) {
            // Show success alert and navigate to Dashboard
            Alert.alert('Success', 'Logged in successfully', [
                { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
            ]);
            // Dispatch Redux login action to update authentication state
            dispatch(login());
        }
    };

    return (
        <Wrapper scrollable> {/* Scrollable wrapper to avoid keyboard overlapping */}
            <View style={[styles.innerContainer, commonStyles.containerPadding]}>
                <Text style={commonStyles.title}>Login to HealthSetGo</Text>

                {/* Username input field */}
                <CustomTextInput
                    label='Please Enter Name*'
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    error={errors.username} // Show validation error if any
                />

                {/* Password input field */}
                <CustomTextInput
                    label='Please Enter Password*'
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry // Hide password text
                    error={errors.password} // Show validation error if any
                />

                {/* Login button */}
                <CustomButton title="Login" onPress={handleLogin} />
            </View>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: '100%', // Ensure full screen height for scroll
    },
});
