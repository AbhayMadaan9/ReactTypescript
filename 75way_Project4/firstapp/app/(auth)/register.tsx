// screens/RegisterScreen.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { router } from 'expo-router';




const schema = yup.object().shape({
  username: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type FormData = {
  username: string;
  email: string;
  password: string;
};


const RegisterScreen: React.FC = () => {
  const { control, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Implement user registration logic here
    // For simplicity, just console log the user data
    console.log('Registered:', data);
    
    // Navigate to the login screen after registration
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              placeholder="Username"
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
        name="username"
        defaultValue=""
      />
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

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
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
    color: "#fff"
  },
  errorText: {
    color: 'red',
  },
});

export default RegisterScreen;
