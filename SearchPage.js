import React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

const SearchPage = () => {

  const [keyword, setKeyword] = useState('');
  const [books, setBooks] = useState([]);

  const getBooks = () => {
    fetch(`https://openlibrary.org/search.json?title=${keyword}&limit=20`)
      .then(response => response.json())
      .then(responseJson => {
        setBooks(responseJson.docs);
      })
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "1%"
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.input}>
          <TextInput
            style={{ fontSize: 18, width: 300 }}
            placeholder='Search for title'
            value={keyword}
            onChangeText={text => setKeyword(text)}
          /></View>
        <View style={styles.buttonContainer}>
          <Button title="Find" onPress={getBooks} color="#fff" />
        </View>
      </View>
      <View style={{ flex: 4 }}>
        <FlatList
          style={{ marginLeft: 5, width: "100%" }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View style={{ margin: 5, width: "100%" }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 16 }}>{item.author_name}</Text>
                <Text style={{ fontSize: 16 }}>{item.first_publish_year}</Text>
              </View>
            </View>}
          data={books}
          ItemSeparatorComponent={listSeparator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#CED0CE',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    backgroundColor: "#efb963",
    width: 100,
    alignSelf: "center",
    borderRadius: 20
  }
});

export default SearchPage;