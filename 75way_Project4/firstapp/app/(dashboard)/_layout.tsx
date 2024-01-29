import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign name={props.name} size={24} color={props.color} />
}

export default function DashboardLayout() {
  const colorScheme = useColorScheme();


    return (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            // Disable the static render of the header on web
            // to prevent a hydration error in React Navigation v6.
            headerShown: useClientOnlyValue(false, true),
          }}>
          <Tabs.Screen
            name="login"
            options={{
              title: 'Login',
              tabBarIcon: ({ color }) => <TabBarIcon name="login" color={color} />,
            }}
          />
          <Tabs.Screen
            name="register"
            options={{
              title: 'Register',
              tabBarIcon: ({ color }) => <TabBarIcon name="enter" color={color} />,
            }}
          />
        </Tabs>
      );
  
}
