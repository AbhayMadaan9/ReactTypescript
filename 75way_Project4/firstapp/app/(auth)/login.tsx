// screens/RegisterScreen.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { router } from 'expo-router';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type FormData = {
  email: string;
  password: string;
};

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { control, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Implement user registration logic here
    // For simplicity, just console log the user data
    console.log('Login:', data);

    // Navigate to the login screen after registration
    router.push('/(dashboard)/settings');
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

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: "#fff"
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    color: "#fff"
  },
  errorText: {
    color: 'red',
  },
});

export default LoginScreen;
