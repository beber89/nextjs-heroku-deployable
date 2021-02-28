import React, {useEffect, useState} from 'react'
import { Button, Container, Image, Table, Icon, Header, Input, Card, Grid } from 'semantic-ui-react'
import { getCart, removeProductFromCart, updateProductsQuantity } from "../utils/Cart";
import Router from 'next/router';
import { createMedia } from "@artsy/fresnel";
import Link from "next/link";




const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const CartPage =  (props) => {
    const [cart, setCart] = useState({lineItems: []});
    // Updated productsQuantity
    const [productsQuantity, setProductsQuantity] = useState({});

    useEffect(async () => {
        let cart = await getCart();
        console.log(cart);
        setCart( (cart === null)? []: cart);
        
    },[]);
    return (
      <Media greaterThan="mobile">
        <Container style={{margin: '2em'}}>
        {cart.lineItems.length == 0? <h2>No elements</h2>:
            <Table basic='very' style={{width:"100%"}}  collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
            {cart.lineItems.map( (item) => {
                  return (
                        <Table.Row>
                          <Table.Cell>
                            <Header as='h4' image>
                                <Image src={item.variant.image.src} rounded size='tiny' />
                                <Header.Content>
                                {item.title}
                                <Header.Subheader>{item.variant.title}</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>{item.variant.price}</Table.Cell>
                          <Table.Cell>            
                            <Input
                              fluid
                              type="number"
                              onChange={(e, data) => {
                                let k = item.id;
                                setProductsQuantity({...productsQuantity, [k]: data.value});
                              }}
                              defaultValue={item.quantity}
                            /></Table.Cell>
                          <Table.Cell>
                              {item.variant.price * item.quantity}
                          </Table.Cell>
                          <Table.Cell>
                              <Icon name='remove' style={{cursor:"pointer", marginLeft: '2em'}} 
                              onClick={async ()=>{
                                let cart = await removeProductFromCart(item.id);
                                setCart(cart);
                              }}/>
                          </Table.Cell>
                        </Table.Row>
                    )
                 })}
                 <Table.Row>
                   <Table.Cell></Table.Cell>
                   <Table.Cell></Table.Cell>
                   <Table.Cell></Table.Cell>
                   <Table.Cell>{`${cart.currencyCode} ${cart.totalPrice}`}</Table.Cell>
                   <Table.Cell></Table.Cell>
                 </Table.Row>
              </Table.Body>
            </Table>}
            <Button onClick={async () => setCart(await updateProductsQuantity(productsQuantity)) } >UPDATE CART</Button>
            <Button as='a' color="teal" onClick={async () => {
              setCart(await updateProductsQuantity(productsQuantity));
              Router.push(cart.webUrl);
            }}>CHECKOUT</Button>
        </Container>
      </Media>
    );
};

const CartMobilePage =  (props) => {
  const [cart, setCart] = useState({lineItems: []});
  // Updated productsQuantity
  const [productsQuantity, setProductsQuantity] = useState({});

  useEffect(async () => {
      let cart = await getCart();
      console.log(cart);
      setCart( (cart === null)? []: cart);
      
  },[]);
  return (
    <Media at="mobile">
      <Container style={{margin: '2em'}}>

          {cart.lineItems.length == 0? <h2>No elements</h2>:
          (<Card.Group>
          {cart.lineItems.map( (item) => {
              return (
                <Card>
                <Card.Content>
                  <Image
                    floated='right'
                    size='tiny'
                    src= {item.variant.image.src}
                  />
                  <Card.Header>{item.title}</Card.Header>
                  <Card.Meta>{item.variant.title}</Card.Meta>
                  <Card.Description>
                  Price: {item.variant.price}
                  </Card.Description>
                  <Card.Meta>Total: {item.variant.price * item.quantity}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <Input
                          fluid
                          type="number"
                          onChange={(e, data) => {
                            let k = item.id;
                            setProductsQuantity({...productsQuantity, [k]: data.value});
                          }}
                          defaultValue={item.quantity}
                        />
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Button style={{cursor:"pointer", width: '100%'}} 
                                    onClick={async ()=>{
                                      let cart = await removeProductFromCart(item.id);
                                      setCart(cart);
                          }}>Remove</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </Card>
              )
            } )}
            </Card.Group>)
          }
          <br></br>
          <Button onClick={async () => setCart(await updateProductsQuantity(productsQuantity)) } >UPDATE CART</Button>
          <Button as='a' color="teal" onClick={async () => {
            setCart(await updateProductsQuantity(productsQuantity));
            Router.push(cart.webUrl);
          }}>CHECKOUT</Button>
      </Container>
    </Media>
  );
};

const ResponsiveCartPage = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <CartPage>{children}</CartPage>
    <CartMobilePage>{children}</CartMobilePage>
  </MediaContextProvider>
);

export default ResponsiveCartPage;