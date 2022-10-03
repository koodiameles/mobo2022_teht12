import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, FlatList} from 'react-native';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';

export default function App() {

  //  https://mobo2022-teht12-default-rtdb.firebaseio.com/

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA2gTFm-DFO_xn1MiO-7-XKCLmBs59q3Tk",
    authDomain: "mobo2022-teht12.firebaseapp.com",
    projectId: "mobo2022-teht12",
    storageBucket: "mobo2022-teht12.appspot.com",
    messagingSenderId: "810096012613",
    appId: "1:810096012613:web:a4ec2d46cf97460e10222c"
  };
  const app = initializeApp(firebaseConfig); // Initialize Firebase
  const database = getDatabase(app);

  const [product, setProduct ] = useState("");
  const [amount, setAmount ] = useState("");
  const [shoppingList, setShoppingList] = useState([]);


  //DATABASE STUFF



  //delete item
  const deleteItem = (item) => {
    console.log("trying to delete", item)

    // let key = database().ref("product").orderByChild("product").equalTo("item.product")
    // console.log(key)

    remove(ref(database, "/products/"+item.product))
    // database.ref(item).remove()
  }

  //add item
  const addItemToShoppingList = () => {
    let newItem = product;
    let newAmount = amount;
    push(ref(database, 'products/'),{ 'product': newItem, 'amount': newAmount });
    setProduct("")
    setAmount("")
  }

  //update view
  useEffect(() => {
    const productsRef = ref(database, 'products/');  
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      setShoppingList(Object.values(data));
    })
  }, []);


  console.log(shoppingList)

  return (
    <>
      <View style={styles.containerHeader}>
        <Text style={styles.assignmentHeaderText}>TEHT 12 OSTOSLISTA FIREBASE</Text>
      </View>
      <View style={styles.container}>
        <Text style={{color:"white"}}>PRODUCT</Text>
        <TextInput style={styles.input} onChangeText={setProduct} value={product}/>
        <Text style={{color:"white"}}>AMOUNT</Text>
        <TextInput style={styles.input} onChangeText={setAmount} value={amount}/>
        <View style={{display: 'flex', flexDirection: 'row', margin: 10}}>
          <View style={{flex: 1, marginHorizontal: 20}}>
            <Button color="green" onPress={() => addItemToShoppingList()} title="Add" />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
      <View style={styles.container2}>
        <Text style={{color:"#6495ED", fontSize:24}}>SHOPPING LIST</Text>
        <FlatList 
          style={styles.list}
          data={shoppingList}
          // keyExtractor={item => item.id.toString()} 
          renderItem={({ item }) =>
            <View style={styles.shoppingList}>
              <Text style={{color:"white", marginHorizontal: 20}}>{item.product} {item.amount}</Text>
              <Button color="brown" title="Bought" onPress={() => deleteItem(item)}></Button>
            </View>}  
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'black',
  },
  containerHeader: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  container2: {
    flex: 2,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  shoppingList: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    margin: 10
  },
  input : {
    width:"80%", 
    borderColor: 'gray', 
    borderWidth: 1,
    margin: 5,
    color:"white",
  },
  assignmentHeaderText: {
    fontSize: 40,
    color:"#6495ED",
  }
});
 
