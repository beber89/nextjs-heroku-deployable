import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { client } from "../utils/shopify";
import { Button, Container, Popup, Segment, Image, Header, Card, Grid } from 'semantic-ui-react'

import { createMedia } from "@artsy/fresnel";

import styles  from './styles.js';

const ShopPage = (props) => {
  console.log(props);
  console.log(props.collections);
  return (
    <>
      <Segment vertical style={{ padding: "2em" }}>
        <Grid   stackable verticalAlign="top">
            <Grid.Column width={2} style={{paddingTop: "3em", marginRight: "6em"}}>
            {props.collections?.map((collection) => 
                    <Grid.Row>
                        <a  href={`#pageref_${collection.title}`}>
                            <Header
                            style={{...styles.fontSerif, textAlign: "center"}}
                            as="h4"
                            content={collection.title}
                            />
                        </a>
                        <hr></hr>
                    </Grid.Row>
            )}
            </Grid.Column>
            <Grid.Column width={12}>
            {props.collections?.map((collection) => {
                return (
                    <Grid.Row>
                    <Header
                      id={`pageref_${collection.title}`}
                      content={collection.title}
                      as="h2"
                      size="large"
                      style={{
                        fontSize: props.isMobile ? "1.5em" : "1.7em",
                        fontWeight: "normal",
                        marginBottom: "1.5em",
                        textAlign: "center"
                      }}
                    />
                    <Card.Group style={{marginBottom: "1em"}} itemsPerRow={props.isMobile ? 1 : 4}>
                      {collection.products?.map(
                        (product) =>
                          console.log(product) || (
                            <Link key={product.id} href={`product/${product.id}`}>
                              <Card raised>
                                <Image src={product.images[0].src} wrapped ui={false} />
                                <Card.Content>
                                  <Header sub>
                                    <Popup
                                      trigger={<div>{product.title}</div>}
                                      content={product.title}
                                      position="top left"
                                    />
                                  </Header>
                                  <Card.Meta><s>{product.variants[0].compareAtPrice!=""? `${product.variants[0].priceV2.currencyCode} ${product.variants[0].compareAtPrice}`:"&nbsp"}</s></Card.Meta>
                                  <Card.Description>
                                    {product.variants[0].priceV2.currencyCode} {product.variants[0].price}
                                  </Card.Description>
                                </Card.Content>
                              </Card>
                             </Link>
                          )
                      )}
                    </Card.Group>
                  </Grid.Row>
                );
            })}
            </Grid.Column>

        </Grid>
      </Segment>
    </>
  );
}
export default ShopPage;

export const getServerSideProps = async (context) => {
  const products = await client.product.fetchAll();
  const infos = await client.shop.fetchInfo();
  const policies = await client.shop.fetchPolicies();
  const collections = await client.collection.fetchAllWithProducts();

  return {
    props: {
      infos: JSON.parse(JSON.stringify(infos)),
      policies: JSON.parse(JSON.stringify(policies)),
      products: JSON.parse(JSON.stringify(products)),
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
};