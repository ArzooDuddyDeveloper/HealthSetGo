import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Wrapper from '../../components/Wrapper';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { commonStyles } from '../../constants/commonStyle';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let valid = true;
    let tempErrors = {};

    if (!name.trim()) {
      tempErrors.name = 'Full Name is required';
      valid = false;
    }

    if (!email.trim()) {
      tempErrors.email = 'Email is required';
      valid = false;
    }

    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSave = () => {
    if (validateFields()) {
      Alert.alert('Success', 'Profile updated successfully');
    } else {
      Alert.alert('Error', 'Please fill all fields correctly');
    }
  };

  return (
    <Wrapper scrollable>
      <CustomHeader title="Profile" />
      <View style={[styles.container, commonStyles.containerPadding]}>
        <CustomTextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />
        <CustomTextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          error={errors.phone}
        />
        <CustomButton title="Update Profile" onPress={handleSave} />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
