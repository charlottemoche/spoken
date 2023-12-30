import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import * as Contacts from 'expo-contacts';
import { Contact } from 'expo-contacts';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync();

          if (data.length > 0) {
            const sortedContacts = data.sort((a, b) => a.name.localeCompare(b.name));
            setContacts(sortedContacts);
          }
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.spinner} />
      ) : contacts.length > 0 ? (
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.contactContainer}>
              {item.imageAvailable ? (
                <Image
                  source={{ uri: item.image?.uri }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.placeholder}>
                  <Ionicons name="person" size={24} color="#ccc" style={styles.personIcon} />
                </View>
              )}
              <Text style={styles.contactName}>{item.name}</Text>
              <Ionicons name="paper-plane-outline" size={24} color="#808080" style={styles.sendIcon} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id?.toString() ?? ''}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text>No contacts found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personIcon: {
    position: 'absolute',
  },
  contactName: {
    flex: 1,
  },
  sendIcon: {
    marginLeft: 'auto',
  },
  spinner: {
    alignSelf: 'center',
  },
});
