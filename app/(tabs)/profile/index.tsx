import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Stack } from 'expo-router';

const GET_USER = gql`
  query {
    user @client {
      firstName
      lastName
    }
  }
`;

export default function Page() {
  const [activeTab, setActiveTab] = useState('Posts');
  const { loading, error, data } = useQuery(GET_USER);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Posts':
        return <Text>Posts content goes here</Text>;
      case 'Products':
        return <Text>Products content goes here</Text>;
      case 'Connections':
        return <Text>Connections content goes here</Text>;
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
              source={require('../../../assets/images/icon.png')}
            />
          <Text style={styles.username}>{data.user.firstName} {data.user.lastName}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Posts' && styles.activeTab]}
          onPress={() => setActiveTab('Posts')}
        >
          <Text style={[styles.tabText, activeTab === 'Posts' && styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Products' && styles.activeTab]}
          onPress={() => setActiveTab('Products')}
        >
          <Text style={[styles.tabText, activeTab === 'Products' && styles.activeTabText]}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Connections' && styles.activeTab]}
          onPress={() => setActiveTab('Connections')}
        >
          <Text style={[styles.tabText, activeTab === 'Connections' && styles.activeTabText]}>Connections</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{renderTabContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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
  separator: {
    marginVertical: 10,
    height: 1,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#ccc',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 10,
  },
  tabText: {
    color: 'black',
  },
  activeTab: {
    backgroundColor: 'black',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    margin: 10,
  },
});