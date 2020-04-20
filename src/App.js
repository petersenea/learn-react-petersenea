import React, { useEffect, useState } from 'react';
import { Card, Column, Button } from 'rbx';
import Sidebar from "react-sidebar";
import "rbx/index.css";


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState("");
  const [items, setItems] = useState([]);

  const [inventory, setInventory] = useState({
    "12064273040195392": {
      "S": 0,
      "M": 3,
      "L": 1,
      "XL": 2
    },
    "51498472915966370": {
      "S": 0,
      "M": 2,
      "L": 3,
      "XL": 2
    },
    "10686354557628304": {
      "S": 1,
      "M": 2,
      "L": 2,
      "XL": 1
    },
    "11033926921508488": {
      "S": 3,
      "M": 2,
      "L": 0,
      "XL": 1
    },
    "39876704341265610": {
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0
    },
    "10412368723880252": {
      "S": 3,
      "M": 2,
      "L": 2,
      "XL": 2
    },
    "8552515751438644": {
      "S": 2,
      "M": 0,
      "L": 0,
      "XL": 2
    },
    "18644119330491310": {
      "S": 3,
      "M": 3,
      "L": 2,
      "XL": 0
    },
    "11854078013954528": {
      "S": 1,
      "M": 1,
      "L": 1,
      "XL": 0
    },
    "876661122392077": {
      "S": 3,
      "M": 1,
      "L": 0,
      "XL": 1
    },
    "9197907543445676": {
      "S": 3,
      "M": 3,
      "L": 1,
      "XL": 2
    },
    "10547961582846888": {
      "S": 2,
      "M": 2,
      "L": 0,
      "XL": 0
    },
    "6090484789343891": {
      "S": 2,
      "M": 0,
      "L": 2,
      "XL": 3
    },
    "18532669286405344": {
      "S": 2,
      "M": 3,
      "L": 0,
      "XL": 2
    },
    "5619496040738316": {
      "S": 1,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "11600983276356164": {
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "27250082398145996": {
      "S": 1,
      "M": 0,
      "L": 0,
      "XL": 2
    }
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  var total_price = 0;

  return (
    <Column.Group>
      <Column size={1}>
        <Sidebar
          sidebar={
            <div>
              <button onClick={() => {setIsOpen(false); setSize("")}}>Close Cart</button>
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
                      if (size !== ""){
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

  );
};

export default App;
