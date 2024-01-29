import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';




const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
}).required();

type FormData = {
  email: string;
  password: string;
};


const LoginScreen: React.FC = () => {
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver:  yupResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    // Implement user registration logic here
    // For simplicity, just console log the user data
    console.log('Login data:', data);
    
    // Navigate to the login screen after registration
    router.push('/(auth)/register');
  };
  const onerror = () => {
    // Implement user registration logic here
    // For simplicity, just console log the user data
    Alert.alert('Invalid Credentials', 'Please register first');
    console.log('Login err:');
  };

  return (

    <View style={styles.container}>
      <Text>Login</Text>
      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              placeholder="Email"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              style={styles.input}
            />
            {fieldState.error && (
              <Text style={styles.errorText}>{fieldState.error.message}</Text>
            )}
          </>
        )}
        name="email"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              placeholder="Password"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              secureTextEntry
              style={styles.input}
            />
            {fieldState.error && (
              <Text style={styles.errorText}>{fieldState.error.message}</Text>
            )}
          </>
        )}
        name="password"
        defaultValue=""
      />

      <Button title="Login" onPress={handleSubmit(onSubmit, onerror)} />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',

  },
  errorText: {
    color: 'red',
  },
});

export default LoginScreen;
