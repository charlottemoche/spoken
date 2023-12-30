import { Image } from 'expo-image';
import { useQuery } from '@apollo/client';
import { Text, View } from '../../../components/Themed';
import { StyleSheet } from 'react-native';
import { Stack, Link } from 'expo-router';
import { appendEndpoint } from '../../../auth/Client';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';
import Spinner from '../../../components/CoreComponents';
import { GET_CONNECTIONS } from '../../../auth/Queries';

export default function Page() {
  const endpoint = appendEndpoint('user-connections');

  const { loading, error, data } = useQuery(GET_CONNECTIONS, {
    context: { uri: endpoint },
  });

  if (loading) return <Spinner />

  if (error) {
    console.error('GraphQL error:', error);
  }

  const connections = data.user.connections.edges;

  const renderItem = ({ item }: { item: any }) => {
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
              <View style={styles.connectionInfo}>
                <Text style={styles.connectionName}>{item.node.fullName}</Text>
                <Text style={styles.connectionInfo}>{item.node.bio}</Text>
              </View>
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
        <Spinner />
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
    flexDirection: 'column',
  },
  connectionName: {
    fontWeight: '600',
    fontSize: 16,
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