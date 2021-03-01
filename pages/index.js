import Head from "next/head";
import Link from 'next/link'
import PropTypes from "prop-types";
import React, { Component } from "react";
import { client } from "../utils/shopify";
import { createMedia } from "@artsy/fresnel";
import {
  Button,
  Popup,
  Container,
  Divider,
  Grid,
  Card,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

import styles from './styles.js'

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Imagine-a-Company"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="Do whatever you want when you want to."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button primary size="huge">
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

const Home = (props) =>
  console.log(props) || (
    <>
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: props.isMobile ? 300 : 700 }}
        vertical
      >
        <HomepageHeading mobile={props.isMobile} />
      </Segment>
      <Segment vertical style={{ }}>
        <Grid>
          <Grid.Row columns={props.isMobile?1:2}>
            <Grid.Column width={props.isMobile?16:3} style={{textAlign: "center", paddingLeft: "3em", paddingRight: "3em"}}>
              <Image avatar src='/pics/portrait-of-handsome-man.jpg' size="tiny" />
              <Header as="h3" style={{textAlign:"center", color: "rgb(221, 51, 51)"}}>Welcome! I'm happy that you're here.</Header>
              <Header as="h5" style={{ textAlign:"center"}}>I'm Janine Vangool, the publisher, editor, designer (and customer service, too!) of this one-woman operation. I appreciate you taking the time to read and understand the pertinent details below before proceeding with your purchase. It will make your ordering experience easier and my workload a little lighter—so that I can concentrate on creating all these lovely books and magazines!</Header>
            </Grid.Column>
            <Grid.Column width={props.isMobile?16:13} style={{paddingTop: "6em", paddingLeft: "6em", paddingRight: "12em"}}>
              <Header as="h2">UPPERCASE publishes beautiful and inspiring books and a quarterly magazine about craft, design and visual art.</Header>
              <span>Published since 2009, my quarterly magazine is for the creative and curious: UPPERCASE has an enthusiastic and loyal readership of designers, illustrators, craftspeople, creative entrepreneurs and paper lovers around the world. Ads-free, with high-quality production values and a unique design aesthetic, the content of each issue is eclectic and inspiring. </span> 
              <br></br><br></br><br></br>
              <span>The mission of UPPERCASE is to bring quality content and inspiration to my readers on a consistent basis in a way that is authentic, generous, community-minded and sustainable. UPPERCASE shares an inclusive and positive perspective and welcomes everyone: all colours, identities, ages, talents and abilities.</span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={props.isMobile?1:2} >
            <Grid.Column  style={styles.padding0}>
              <Image src="/pics/1140261.jpg"></Image>
              <div style={{position: "absolute", margin: "20px", left: "40px", top: "40px",  color: "lavender"}}>
                <h2>Cool Products</h2>
                <span>Buy our products, very cool products, you better believe it or regret it. Meh, do not say I did not tell you.</span>
                <br></br><br></br><br></br>
                <Button as="a" href="/shop" style={{marginTop: "10px"}} primary>Shop Now</Button>
              </div>
            </Grid.Column>
            <Grid.Column  style={styles.padding0}>
              <Image src="/pics/1140265.jpg"></Image>
              <div style={{position: "absolute", margin: "20px", left: "40px", top: "40px", color: "maroon"}}>
                <h2>Reliable</h2>
                <span>Look at this tank ! yes our products are as reliable as this tank but do not go on kill people with our products.</span>
                <br></br><br></br><br></br>
                <Button as="a" href="/shop" style={{marginTop: "10px"}} primary>Shop Now</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
export default Home;

export const getServerSideProps = async (context) => {
  const products = await client.product.fetchAll();
  const infos = await client.shop.fetchInfo();
  const policies = await client.shop.fetchPolicies();

  return {
    props: {
      infos: JSON.parse(JSON.stringify(infos)),
      policies: JSON.parse(JSON.stringify(policies)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
