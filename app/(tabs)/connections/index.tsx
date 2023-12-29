import { Image } from 'expo-image';
import { useQuery, gql } from '@apollo/client';
import { Text, View } from '../../../components/Themed';
import { StyleSheet } from 'react-native';
import { Stack, Link } from 'expo-router';
import { appendEndpoint } from '../../../components/auth/Client';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';

const GET_CONNECTION = gql`
  query {
    user {
      bio
      email
      fullName
      imageSmall
      phone
      connections {
        edges {
          node {
            email
            fullName
            id
            imageSmall
          }
        }
      }
    }
  }
`;

export default function Page() {
  // Append the endpoint dynamically
  const endpoint = appendEndpoint('user-connections');

  // Use Apollo Client with the dynamic endpoint
  const { loading, error, data } = useQuery(GET_CONNECTION, {
    context: { uri: endpoint },
  });

  if (loading) return <Loading />
  if (error) {
    console.error('GraphQL error:', error);
    return <Text>Error :(</Text>;
  }

  const connections = data.user.connections.edges;

  const renderItem = ({ item }: { item: any }) => {
    console.log('Rendering item:', item);
    console.log('item.node.fullName:', item.node.fullName);
  
    return (
      <Pressable>
        {({ pressed }) => (
          <Link href={{
            pathname: `/user/[id]`,
            params: { id: item.node.id, name: item.node.fullName, image: item.node.imageSmall, bio: item.node.bio }
          }} style={{ opacity: pressed ? 0.5 : 1 }}>
            <View style={styles.connectionItem}>
              <Image
                style={styles.avatar}
                source={{ uri: item.node.imageSmall }}
              />
              <Text style={styles.connectionName}>{item.node.fullName}</Text>
            </View>
        </Link>
      )}
      </Pressable>
    );
  };  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'Connections' }} />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={connections}
          renderItem={renderItem}
          keyExtractor={(item) => item.node.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  connectionInfo: {
    flex: 1,
  },
  connectionName: {
    fontWeight: '600',
    fontSize: 18,
  },
  connectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },
});

function Loading() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'Connections' }} />
      <Text>Loading...</Text>
    </View>
  );
}
