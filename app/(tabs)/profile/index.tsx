import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Stack } from 'expo-router';
import { Text, View } from '../../../components/Themed';
import { appendEndpoint } from '../../../auth/Client';
import { GET_USER, GET_CURR_USER_PRODUCTS, GET_CURR_USER_POSTS } from '../../../auth/Queries';
import Spinner from '../../../components/CoreComponents';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable, Button } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Page() {
  
  const userEndpoint = appendEndpoint('current-user');

  const productsEndpoint = appendEndpoint('current-user-products');

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {
    context: { uri: userEndpoint, fetchPolicy: 'network-only' },
  });

  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_CURR_USER_POSTS, {
    context: { uri: productsEndpoint, fetchPolicy: 'network-only' },
  });

  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_CURR_USER_PRODUCTS, {
    context: { uri: productsEndpoint, fetchPolicy: 'network-only' },
  });

  const [activeTab, setActiveTab] = useState('Posts');

  if (userLoading || productsLoading || postsLoading ) return <Spinner />

  if (userError) {
    return (
      <View>
        <Text>Unable to load profile.</Text>
      </View>
    );
  }

  const renderProduct = ({ item }: { item: any }) => {
    return (
      <View style={styles.productContainer}>
        <Image
          style={styles.productImage}
          source={{ uri: item.node.product.defaultImage }}
        />
        <Text style={styles.productName}>{item.node.product.name}</Text>
      </View>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Posts':
        if (postsError) {
          return (
            <View>
              <Text>Unable to load posts.</Text>
            </View>
          );
        } else {
          if (postsData.user.posts.edges.length === 0) {
            return (
              <View style={styles.emptyPostContainer}>
                <Text>No posts yet. Tap the</Text>
                <Ionicons size={24} name="add-circle" color="#E1EC41" />
                <Text>to create your first post.</Text>
              </View>
            );
          } else {
            return (
              <View>
                <FlatList
                  data={postsData.user.posts.edges}
                  renderItem={renderProduct}
                  keyExtractor={(item) => item.node.id}
                  numColumns={2}
                />
              </View>
            );
          }
        }
      case 'Products':
        if (productsError) {
          return (
            <View>
              <Text>Unable to load products.</Text>
            </View>
          );
        } else {
          return (
            <View>
              <FlatList
                data={productsData.user.products.edges}
                renderItem={renderProduct}
                keyExtractor={(item) => item.node.id}
                numColumns={2}
              />
            </View>
          );
        }
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'Profile' }} />
      <View style={styles.profileContainer}>
        <View>
          <Image
            style={styles.avatar}
            source={{ uri: userData.user.imageSmall }}
          />
          <Text lightColor='black' darkColor='#E0E0E0' style={styles.username}>{userData.user.fullName}</Text>
          <Text lightColor='black' darkColor='white' style={{ paddingVertical: 8 }}>{userData.user.bio}</Text>
        </View>
      </View>
      <View lightColor='gray' darkColor='gray' style={styles.separator} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Posts' && styles.activeTab]}
          onPress={() => setActiveTab('Posts')}
        >
          <Text lightColor='black' darkColor='white' style={[activeTab === 'Posts' && styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Products' && styles.activeTab]}
          onPress={() => setActiveTab('Products')}
        >
          <Text lightColor='black' darkColor='white' style={[activeTab === 'Products' && styles.activeTabText]}>Products</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{renderTabContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  emptyPostContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '95%',
    alignSelf: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 10,
    paddingVertical: 10,
    gap: 8,
  },
  tab: {
    padding: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#222222'
  },
  activeTabText: {
    color: 'white'
  },
  content: {
    margin: 10,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
