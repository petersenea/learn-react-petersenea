import React, { useEffect, useState } from 'react';
import { Card, Column, Button } from 'rbx';
import "rbx/index.css";


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Column.Group multiline={true}>
      {products.map(product =>
        <Column size="one-quarter">
          <Card>
            {/* <Card.Header>
              {product.title}
            </Card.Header> */}
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
                <Button>
                  S
                </Button>
                <Button>
                  M
                </Button>
                <Button>
                  L
                </Button>
                <Button>
                  XL
                </Button>
              </Button.Group>
            </Card.Footer>
          </Card>
        </Column>
      )}
    </Column.Group>


  );
};

export default App;
