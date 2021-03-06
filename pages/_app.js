import React, { Component } from "react";
import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import Router from "next/router";
import Link from "next/link";
import { getCart } from "../utils/Cart";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./styles.css"

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 50, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Link href={"/"}>
                  <Menu.Item>
                    <Header as='h3' inverted color='blue'>
                      Imagine-a-Company
                    </Header>
                  </Menu.Item>
                </Link>
                <Link href={"/"}>
                  <Menu.Item>
                    <Header as='h4' inverted color="grey">Home</Header>
                  </Menu.Item>
                </Link>
                <Link href={"/shop"}>
                  <Menu.Item>
                    <Header as='h4' inverted color="grey">Products</Header>
                  </Menu.Item>
                </Link>
                <Link href={"/shop"}>
                  <Menu.Item>
                    <Header as='h4' inverted color="grey">Sale</Header>
                  </Menu.Item>
                </Link>
                <Menu.Item position="right">
                  <Link href={`/contactus`}
                    >
                      <Icon style={{marginLeft: "1em", cursor: "pointer" }} name='phone'></Icon>
                    </Link>
                  <Link href={`/cart`}
                  >
                    <Icon style={{marginLeft: "1em", cursor: "pointer" }} name='cart'></Icon>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {React.cloneElement(this.props.children, { isMobile: false })}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};
class MobileContainer extends Component {
  state = {sidebarOpened: false};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = async () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
              <Link href={"/"}>
                <Menu.Item style={{marginTop:"3em"}}>
                  <Header as='h3' inverted color='blue'>
                    Imagine-a-Company
                  </Header>
                </Menu.Item>
              </Link>
              <Link href={"/shop"}>
                <Menu.Item as="a">Shop</Menu.Item>
              </Link>

          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 50, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                    <Menu.Item position="right">
                    <Link href={`/contactus`}
                      >
                        <Icon style={{marginLeft: "1em", cursor: "pointer" }} name='phone'></Icon>
                      </Link>
                    <Link href={`/cart`}
                    >
                      <Icon style={{marginLeft: "1em", cursor: "pointer" }} name='cart'></Icon>
                    </Link>
                    </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            {React.cloneElement(this.props.children, { isMobile: true })}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

function MyApp({ Component, pageProps }) {
  console.log("object");
  return (
    <>
      <ResponsiveContainer>
        <Component {...pageProps} />
      </ResponsiveContainer>
      <Segment inverted vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">Sitemap</List.Item>
                  <List.Item as="a">Contact Us</List.Item>
                  <List.Item as="a">Religious Ceremonies</List.Item>
                  <List.Item as="a">Gazebo Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Services" />
                <List link inverted>
                  <List.Item as="a">Banana Pre-Order</List.Item>
                  <List.Item as="a">DNA FAQ</List.Item>
                  <List.Item as="a">How To Access</List.Item>
                  <List.Item as="a">Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Footer Header
                </Header>
                <p>
                  Extra space for a call to action inside the footer that could
                  help re-engage users.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
