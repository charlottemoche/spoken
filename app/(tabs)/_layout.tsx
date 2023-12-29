import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size: number;
}) {
  return <Ionicons style={{ marginBottom: -3, marginTop: 5 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
          tabBarStyle: {
            backgroundColor: '#121212',
            height: 90,
          },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          href: null,
          tabBarIcon: ({ color }) => <TabBarIcon size={22} name="enter-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon size={22} name="home-outline" color={color} />,
          headerLeft: () => (
            <Image
              source={
                colorScheme === 'dark'
                  ? require('../../assets/images/logo-white.png')
                  : require('../../assets/images/logo.png')
              }
              style={{ width: 100, height: 40, resizeMode: 'contain', marginLeft: 15 }}
            />
          ),
          headerRight: () => (
            <Link href="/connections" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="person-add"
                    size={22}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon size={22} name="search" color={color} />,
          headerLeft: () => (
            <Image
              source={
                colorScheme === 'dark'
                  ? require('../../assets/images/logo-white.png')
                  : require('../../assets/images/logo.png')
              }
              style={{ width: 100, height: 40, resizeMode: 'contain', marginLeft: 15 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon size={42} name="add-circle" color="#E1EC41" />,
          headerLeft: () => (
            <Image
              source={
                colorScheme === 'dark'
                  ? require('../../assets/images/logo-white.png')
                  : require('../../assets/images/logo.png')
              }
              style={{ width: 100, height: 40, resizeMode: 'contain', marginLeft: 15 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon size={24} name="at-sharp" color={color} />,
          headerLeft: () => (
            <Image
              source={
                colorScheme === 'dark'
                  ? require('../../assets/images/logo-white.png')
                  : require('../../assets/images/logo.png')
              }
              style={{ width: 100, height: 40, resizeMode: 'contain', marginLeft: 15 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon size={20} name="person-outline" color={color} />,
          headerLeft: () => (
            <Image
              source={
                colorScheme === 'dark'
                  ? require('../../assets/images/logo-white.png')
                  : require('../../assets/images/logo.png')
              }
              style={{ width: 100, height: 40, resizeMode: 'contain', marginLeft: 15 }}
            />
          ),
          headerRight: () => (
            <Link href="/profile/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="settings"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
