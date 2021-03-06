import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { client } from "../utils/shopify";
import { Popup, Segment, Image, Header, Card, Grid } from 'semantic-ui-react'


const ShopPage = (props) => {
  return (
    <>
      <Segment vertical style={{ padding: "2em" }}>
        <Grid   stackable verticalAlign="top">
            <Grid.Column width={16}>
              <Card.Group style={{marginBottom: "1em"}} itemsPerRow={props.isMobile ? 1 : 6}>
            {props.products?.map((product) => {
                return (
                    
                            <Link key={product.id} href={`product/${product.id}`}>
                              <Card raised>
                                <Image src={product.images[0].src} wrapped ui={false} />
                                <Card.Content>
                                  <Header size="huge" sub>
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
                    
                );})}
                </Card.Group>
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