import { EvilIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from '../../../components/Themed';
import theme from '../../../constants/Colors';
import { useState } from 'react';
import { GET_FEED } from '../../../auth/Queries';
import { useQuery, gql } from '@apollo/client';
import { appendEndpoint } from '../../../auth/Client';
import Spinner from '../../../components/CoreComponents';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Page() {
  const [spokenSaysContainerVisible, setSpokenSaysContainerVisible] = useState(true);

  const toggleSpokenSaysContainer = () => {
    setSpokenSaysContainerVisible(!spokenSaysContainerVisible);
  };

  const feedEndpoint = appendEndpoint('feed');

  const { loading: feedLoading, error: feedError, data: feedData } = useQuery(GET_FEED, {
    context: { uri: feedEndpoint, fetchPolicy: 'network-only' },
  });

  if (feedLoading) return <Spinner />

  if (feedError) {
    return (
      <View>
        <Text>Unable to load feed.</Text>
      </View>
    );
  }

  const feed = feedData.feed.edges;

  const renderPost = ({ item }: { item: any }) => {
    const { message } = item.node.content;
  
    return (
      <View style={styles.spokenAsksContainer} darkColor={'rgba(192,192,192,0.1)'}>
        <View style={styles.spokenAsksHeader} darkColor={'rgba(192,192,192,0)'}>
          <View lightColor={'#121212'} style={{ borderRadius: 8 }}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={ styles.darkIcon }
            />
          </View>
          <View darkColor={'rgba(192,192,192,0)'} style={{ padding: 3 }} />
          <Text>USER</Text>
          <Text lightColor={theme.light.accentColor} darkColor={theme.dark.accentColor} style={{ fontWeight: '500' }}>
            {' '}
            ASKS
          </Text>
        </View>
        <Text style={styles.spokenAsksText}>
          {message}
        </Text>
        <View darkColor={'rgba(192,192,192,0)'} style={styles.buttonsContainer}>
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
  };

  return (
    <FlatList
      style={styles.container}
      data={feed}
      renderItem={renderPost}
      keyExtractor={(item, index) => item.node.id || index.toString()}
      ListHeaderComponent={() => (
        spokenSaysContainerVisible && (
          <View lightColor={theme.dark.background} style={styles.spokenSaysContainer}>
            <View lightColor={theme.dark.background} style={styles.spokenSaysContainer}>
              <View lightColor={theme.dark.background} style={styles.spokenSaysContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} lightColor={theme.dark.background}>
                <View style={styles.spokenSaysHeader} lightColor={theme.dark.background}>
                  <Image
                      source={require('../../../assets/images/icon.png')}
                      style={{ width: 16, height: 16 }}
                    />
                    <View lightColor={theme.dark.background} style={{ padding: 3 }} />
                    <Text style={{ color: 'white' }}>SPOKEN</Text>
                    <Text style={{ color: theme.dark.accentColor }}> SAYS</Text>
                  </View>
                  <View style={styles.closeButtonContainer}>
                    <TouchableOpacity onPress={toggleSpokenSaysContainer}>
                      <Ionicons name="close" size={22} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.spokenSaysText}>
                  Spoken is a private place for you and your friends to share your good taste and find the
                  best stuff.
                </Text>
                <Text style={styles.spokenSaysText}>
                  Invite your friends to ask their advice, get feedback on potential purchases, show off
                  what you’ve bought, and share things you love.
                </Text>
                <View style={styles.textAddContainer}>
                  <Text lightColor={'#E0E0E0'} darkColor={'#E0E0E0'} style={{ fontSize: 15 }}>
                    To get started press the 
                  </Text>
                  <Ionicons size={18} name="add-circle" color="#E1EC41" style={{ paddingHorizontal: 3, marginBottom: -4 }} />
                  <Text lightColor={'#E0E0E0'} darkColor={'#E0E0E0'}  style={{ fontSize: 15 }}>
                    button or try 
                  </Text>
                  <Text lightColor={'#E0E0E0'} darkColor={'#E0E0E0'} style={{ fontSize: 15 }}>
                    replying to one of our example posts.
                  </Text>
                </View>
              </View>
            </View>
            <Stack.Screen options={{ headerShown: false, title: '' }} />
          </View>
        )
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -1,
  },
  closeButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#121212',
    marginTop: -8
  },
  spokenSaysContainer: {
    padding: 6
  },
  spokenSaysHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 6,
  },
  spokenSaysText: {
    color: '#E0E0E0',
    paddingVertical: 6,
    fontSize: 15,
  },
  textAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    flexWrap: 'wrap',
    backgroundColor: '#121212',
  },
  spokenAsksContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    margin: 10,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
  },
  spokenAsksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spokenAsksText: {
    paddingVertical: 6,
    fontSize: 20,
  },
  darkIcon: {
    width: 16,
    height: 16,
    backgroundColor: 'rgba(192,192,192,0.1)',
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
