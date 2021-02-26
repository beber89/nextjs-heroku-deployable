import React, {useEffect, useState} from 'react'
import { Button, Container, Image, Table, Icon, Header, Input } from 'semantic-ui-react'
import { getCart, removeProductFromCart, updateProductsQuantity } from "../utils/Cart";
import Router from 'next/router';




const cartPage =  (props) => {
    const [cart, setCart] = useState({lineItems: []});
    // Updated productsQuantity
    const [productsQuantity, setProductsQuantity] = useState({});
    console.log(cart.lineItems);
    console.log(productsQuantity)

    useEffect(async () => {
        let cart = await getCart();
        console.log(cart);
        setCart( (cart === null)? []: cart);
        
    },[]);
    return (
        <Container style={{margin: '2em'}}>
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
            {cart.lineItems.length == 0? <h2>No elements</h2>:
                                
            cart.lineItems.map( (item) => {
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
              } )
            }
              </Table.Body>
            </Table>
            <Button onClick={async () => setCart(await updateProductsQuantity(productsQuantity)) } >UPDATE CART</Button>
            <Button as='a' color="teal" onClick={async () => {
              setCart(await updateProductsQuantity(productsQuantity));
              Router.push(cart.webUrl);
            }}>CHECKOUT</Button>
        </Container>
    );
};

export default cartPage;