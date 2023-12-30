import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Text, View } from '../../components/Themed';
import { useLocalSearchParams } from 'expo-router';
import Spinner from '../../components/CoreComponents';
import { gql, useQuery } from '@apollo/client';
import { appendEndpoint } from '../../auth/Client';
import { GET_CONNECTION_PRODUCTS, GET_CONNECTION_POSTS } from '../../auth/Queries';
import theme from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Id() {
  const [activeTab, setActiveTab] = useState('Posts');
  
  const user = useLocalSearchParams();

  const productsEndpoint = appendEndpoint('current-user');

  const postsEndpoint = appendEndpoint('current-user-products');

  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_CONNECTION_POSTS, {
    context: { uri: postsEndpoint, fetchPolicy: 'network-only' },
    variables: { id: user.id },
  });

  const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_CONNECTION_PRODUCTS, {
    context: { uri: productsEndpoint, fetchPolicy: 'network-only' },
    variables: { id: user.id },
  });

  if (productsLoading || postsLoading) return <Spinner />

  if (productsError || postsError) {
    <Text>Failed to load user.</Text>
  }

  const products = productsData.user.products.edges.map((edge: { node: any; }) => edge.node);

  const renderPost = ({ item }: { item: any }) => {
    if (item.node.type === 'PRODUCT') {
      const {
        message,
        product,
        reactionCounts,
        comments,
        id,
      } = item.node;
  
      return (
        <View style={styles.userSaysContainer} darkColor={'rgba(192,192,192,0.1)'}>
          <View style={styles.userSaysHeader} darkColor={'rgba(192,192,192,0)'}>
            <View lightColor={'#121212'} style={{ borderRadius: 8 }}>
            </View>
            <Text lightColor='#000' darkColor='#E0E0E0'>{(user.name as string)?.split(' ')[0].toUpperCase()}</Text>
            <Text lightColor={theme.light.accentColor} darkColor={theme.dark.accentColor} style={{ fontWeight: '500' }}>
              {' '}
              SAYS
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }} darkColor={'rgba(192,192,192,0)'}>
            <Image
              style={{ width: '100%', height: 250, borderRadius: 8, marginVertical: 10 }}
              source={{ uri: product?.defaultImage }}
            />
          <Text style={{ fontWeight: '600' }}>
            {product.name?.toUpperCase()}
          </Text>
          </View>
          <Text style={styles.userSaysText}>
            {message}
          </Text>
          <View darkColor={'rgba(192,192,192,0)'} style={styles.buttonsContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} darkColor={'rgba(192,192,192,0)'}>
              <TouchableOpacity style={styles.button}>
                <FontAwesome name="thumbs-o-up" size={16} color='black' style={{ paddingRight: 3 }} />
              </TouchableOpacity>
              <Text style={{ paddingRight: 3 }}>+{reactionCounts.count || 0}</Text>
              <TouchableOpacity style={styles.button}>
                <FontAwesome name="thumbs-o-down" size={16} color='black' style={{ paddingRight: 3 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} darkColor={'rgba(192,192,192,0)'}>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="share-outline" size={17} color="black" />
                <Text darkColor={theme.light.text} style={{ fontWeight: '500', paddingLeft: 1 }}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <FontAwesome name="comment-o" size={16} color="black" />
                <Text darkColor={theme.light.text} style={{ fontWeight: '500', paddingLeft: 1 }}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    if (item.node.type === 'RECOMMENDATION_REQUEST') {
      const { message } = item.node;
  
      return (
        <View style={styles.userSaysContainer} darkColor={'rgba(192,192,192,0.1)'}>
          <View style={styles.userSaysHeader} darkColor={'rgba(192,192,192,0)'}>
            <View lightColor={'#121212'} style={{ borderRadius: 8 }}>
            </View>
            <Text lightColor='#000' darkColor='#E0E0E0'>{(user.name as string)?.split(' ')[0].toUpperCase()}</Text>
            <Text lightColor={theme.light.accentColor} darkColor={theme.dark.accentColor} style={{ fontWeight: '500' }}>
              {' '}
              ASKS
            </Text>
          </View>
          <Text style={styles.userSaysText}>
            {message}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }} darkColor={'rgba(192,192,192,0)'}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="share-outline" size={17} color="black" />
              <Text darkColor={theme.light.text} style={{ fontWeight: '500', paddingLeft: 1 }}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <FontAwesome name="comment-o" size={16} color="black" />
              <Text darkColor={theme.light.text} style={{ fontWeight: '500', paddingLeft: 1 }}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return null;
  };  

  const renderProduct = ({ item }: { item: any }) => {
  
    const product = item.product;
  
    return (
      <View style={styles.productContainer}>
        <Image
          style={styles.productImage}
          source={{ uri: product.defaultImage }}
        />
        <View style={styles.productName} lightColor='#fff' darkColor='#121212'>
          <Text style={{ fontWeight: '600', paddingBottom: 2 }}>{product.name?.toUpperCase()}</Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text lightColor='#000' darkColor='#E0E0E0'>{(user.name as string)?.split(' ')[0].toUpperCase()}</Text>
            <Text lightColor={theme.light.accentColor} darkColor={theme.dark.accentColor} style={{ fontWeight: '500' }}>{item.ownershipStatus + 'S'}</Text>
          </View>
        </View>
      </View>
    );
  };  

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
                <View style={styles.buttonContainer}>
                  <View style={{ backgroundColor: '#121212', borderRadius: 50, padding: 8, top: 4, left: 2, position: 'absolute' }}></View>
                  <Ionicons size={24} name="add-circle" color="#E1EC41" />
                </View>
                <Text>to start.</Text>
              </View>
            );
          } else {
            return (
              <FlatList
                data={postsData.user.posts.edges}
                renderItem={renderPost}
                keyExtractor={(item) => item.node.id}
                numColumns={1}
              />
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
          if (products.length === 0) {
            return (
              <View style={styles.emptyPostContainer}>
                <Text>No products yet. Tap the</Text>
                <View style={styles.buttonContainer}>
                  <View style={{ backgroundColor: '#121212', borderRadius: 50, padding: 8, top: 4, left: 2, position: 'absolute' }}></View>
                  <Ionicons size={24} name="add-circle" color="#E1EC41" />
                </View>
                <Text>to start.</Text>
              </View>
            );
          } else {
            return (
              <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={1}
              />
            );
          }
        }
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
    <Stack.Screen options={{ headerShown: false, title: 'User' }} />
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <View style={styles.profileContainer}>
            <View>
              <Image
                style={styles.avatar}
                source={{ uri: user.image as string }}
              />
              <Text lightColor='black' darkColor='#E0E0E0' style={styles.username}>{user.name}</Text>
              {user.bio && <Text lightColor='black' darkColor='white' style={{ paddingVertical: 8 }}>{user.bio}</Text>}
            </View>
          </View>
          <View lightColor='#E0E0E0' darkColor='#333333' style={styles.separator} />
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
        </>
      }
      data={[{ key: 'content', content: renderTabContent() }]}
      renderItem={({ item }) => item.content}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    marginBottom: 20,
  },
  emptyPostContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
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
    backgroundColor: '#333333'
  },
  activeTabText: {
    color: 'white'
  },
  content: {
    margin: 10,
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    overflow: 'hidden',
    marginBottom: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    margin: 10,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
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
    color: 'white',
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    padding: 10,
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
  },
  userSaysContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    margin: 10,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
  },
  userSaysHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userSaysText: {
    paddingVertical: 6,
    fontSize: 16,
  },
  darkIcon: {
    width: 16,
    height: 16,
    backgroundColor: 'rgba(192,192,192,0.1)',
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 10,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    gap: 4,
  },
});
