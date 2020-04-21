import React, { useEffect, useState } from 'react';
import { Card, Column, Button } from 'rbx';
import Sidebar from "react-sidebar";
import "rbx/index.css";
import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyAyFTsJYPUIc3tcerqB8fDeJ5LA_7fSxrY",
  authDomain: "shopping-cart-b9a00.firebaseapp.com",
  databaseURL: "https://shopping-cart-b9a00.firebaseio.com",
  projectId: "shopping-cart-b9a00",
  storageBucket: "shopping-cart-b9a00.appspot.com",
  messagingSenderId: "765408944194",
  appId: "1:765408944194:web:4506e7f0d211a3f3764ddb",
  measurementId: "G-2J1MFXD1L2"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState("");
  const [items, setItems] = useState([]);

  const [inventory, setInventory] = useState(null);

  

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("hello");
    const handleData = snap => {
      if (snap.val()) setInventory(snap.val());
      // console.log(snap.val())
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

    var total_price = 0;

  return (

    (inventory === null) ? null : 
    <Column.Group>
      <Column size={1}>
        <Sidebar
          sidebar={
            <div>
              <button onClick={() => { setIsOpen(false); setSize("") }}>Close Cart</button>
              <ul>
                {items.map(item => {
                  var item_split = item.split(" ");
                  var item_sku = item_split[0];
                  var item_size = item_split[1];

                  var item_obj = products.find(element => element.sku == item_sku)

                  total_price += item_obj.price;

                  return (
                    <li>
                      <h1>{item_obj.title}</h1>
                      <p>size: {item_size}</p>
                      <p>price: {item_obj.price.toFixed(2)}</p>

                      <button onClick={() => {
                        var i = items.indexOf(item);
                        items.splice(i, 1);
                        setSize("");
                        setItems(items);
                        setIsOpen(false);
                        inventory[item_sku][item_size] = inventory[item_sku][item_size] + 1;
                        setInventory(inventory);
                      }}>
                        remove
                      </button>
                    </li>
                  )
                })}
              </ul>
              <h1>Total: {total_price.toFixed(2)} </h1>
            </div>
          }
          open={isOpen}
          // onSetOpen={() => {setIsOpen(true)}}
          styles={{ sidebar: { background: "white", width: "200px" } }}>
          <button onClick={() => setIsOpen(true)}>
            Open Cart
          </button>
        </Sidebar>
      </Column>
      <Column>
        <Column.Group multiline={true}>
          {
            products.map(product =>
              <Column size="one-quarter">
                <Card>
                  <Card.Image>
                    <img src={"data/products/" + product.sku + "_2.jpg"} alt="product"></img>
                  </Card.Image>
                  <Card.Footer>
                    <h1>
                      Title: {product.title}
                    </h1>
                  </Card.Footer>
                  <Card.Footer>
                    <h1>
                      Description: {product.description !== '' ? product.description : "N/A"}
                    </h1>
                  </Card.Footer>
                  <Card.Footer>
                    <h1>
                      $ {product.price.toFixed(2)}
                    </h1>
                  </Card.Footer>
                  <Card.Footer>
                    <Button.Group>

                      {(inventory[product.sku]["S"] > 0) ?
                        <Button id={product.sku + " S"} onClick={() => setSize("S")}>
                          S
                    </Button>
                        :
                        null}

                      {(inventory[product.sku]["M"] > 0) ?
                        <Button id={product.sku + " M"} onClick={() => setSize("M")}>
                          M
                    </Button>
                        :
                        null}

                      {(inventory[product.sku]["L"] > 0) ?
                        <Button id={product.sku + " L"} onClick={() => setSize("L")}>
                          L
                    </Button>
                        :
                        null}
                      {(inventory[product.sku]["XL"] > 0) ?
                        <Button id={product.sku + " XL"} onClick={() => setSize("XL")}>
                          XL
                    </Button>
                        :
                        null}
                      {(inventory[product.sku]["S"] + inventory[product.sku]["M"] + inventory[product.sku]["L"] + inventory[product.sku]["XL"] === 0) ?
                        <Button disabled>Out of Stock</Button>
                        :
                        null}

                    </Button.Group>
                  </Card.Footer>
                  <Card.Footer>
                    <Button onClick={() => {
                      if (size !== "") {
                        setItems(items.concat(product.sku + ' ' + size));
                        setIsOpen(true);
                        inventory[product.sku][size] = inventory[product.sku][size] - 1
                        setInventory(inventory)
                      }
                    }}>
                      Buy
                  </Button>
                  </Card.Footer>
                </Card>
              </Column>
            )
          }
        </Column.Group>
      </Column>
    </Column.Group>
    // <h1>hello</h1>

  );
};

export default App;
