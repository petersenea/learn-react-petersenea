import React, { useEffect, useState } from 'react';
import { Card, Column, Button } from 'rbx';
import Sidebar from "react-sidebar";
import "rbx/index.css";


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState("S");
  const [items, setItems] = useState([]);

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
      <Column size={4}>
        <Sidebar
          sidebar={
            // <div>
            //   <button onClick={() => setIsOpen(false)}>Close Cart</button>
            //   <ul>
            //     {items.map(item => {
            //       var item_split = item.split(" ");
            //       var item_sku = item_split[0];
            //       var item_size = item_split[1];

            //       var item_obj = products.find(element => element.sku == item_sku)

            //       total_price += item_obj.price;

            //       return (
            //         <li>
            //           <h1>{item_obj.title}</h1>
            //           <p>size: {item_size}</p>
            //           <p>price: {item_obj.price.toFixed(2)}</p>
            //           <button>remove</button>
            //         </li>
            //       )
            //     })}
            //   </ul>
            //   <h1>Total: {total_price.toFixed(2)} </h1>
            // </div>

            <button onClick={() => setIsOpen(false)}>Close Cart</button>
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
          {products.map(product =>
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
                    <Button onClick={() => setSize("S")}>
                      S
                    </Button>
                    <Button onClick={() => setSize("M")}>
                      M
                    </Button>
                    <Button onClick={() => setSize("L")}>
                      L
                    </Button>
                    <Button onClick={() => setSize("XL")}>
                      XL
                    </Button>
                  </Button.Group>
                </Card.Footer>
                <Card.Footer>
                  <Button onClick={() => {setItems(items.concat(product.sku + ' ' + size)); setIsOpen(true)}}>
                    Buy
                  </Button>
                </Card.Footer>
              </Card>
            </Column>
          )}
        </Column.Group>
      </Column>
    </Column.Group>

  );
};

export default App;
