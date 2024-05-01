import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const db = SQLite.openDatabase('listdb.db');

const ListPage = () => {

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists book (id integer primary key not null, author text, title text);');
    }, null, updateList); 
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into book (author, title) values (?, ?);', [author, title]);    
      }, null, () => {
        updateList();
        setTitle(''); 
        setAuthor(''); 
      });
    }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from book;', [], (_, { rows }) =>
        setBooks(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from book where id = ?;`, [id]);
      }, null, updateList
    )    
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
      <TextInput  placeholder='Title' style={styles.input}
        onChangeText={(title) => setTitle(title)}
        value={title}/>  
      <TextInput placeholder='Author' style={styles.input}
        onChangeText={(author) => setAuthor(author)}
        value={author}/>
      <View style={styles.buttonContainer}>   
      <Button onPress={saveItem} title="Save" color="#fff"/></View>   
      <Text style={{marginTop: 30, fontSize: 20}}>TO READ:</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.listcontainer}>
        <Text style={styles.title}>{item.title}, </Text>
        <Text style={styles.author}>{item.author}</Text>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <Ionicons name="checkmark-circle" size={30} color="#efb963" />
        </TouchableOpacity>
        </View>} 
        data={books} 
        ItemSeparatorComponent={listSeparator} 
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
   paddingTop: 50
  },
  listcontainer: {
   flexDirection: 'row',
   backgroundColor: '#fff',
   alignItems: 'center',
   marginTop: 10,
   marginBottom: 10
  },
  input: {
    margin: 1,
    borderWidth: 1,
    borderColor: '#CED0CE',
    borderRadius: 5,
    padding: 7,
    fontSize: 18,
    width: 300
  },
  buttonContainer: {
    backgroundColor: "#efb963",
    width: 100,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  author: {
    fontSize: 18,
    color: "#bcbcbc"
  }
 });

export default ListPage;