import { useRouter } from "next/router";
import React, { useState } from "react";
import { client } from "../../utils/shopify";
import _ from "lodash";
import { addProductToCart } from "../../utils/Cart";

import {
  List,
  Grid,
  Image,
  Header,
  Segment,
  Dropdown,
  Input,
  Popup,
  Dimmer,
  Loader,
  Button,
} from "semantic-ui-react";

const getIdFromData = (variants, selectedVar) => {
  const variant = variants.find(({ title }) => Object.keys(selectedVar).map((k)=> title.includes(selectedVar[k])).reduce((a, c)=> a&&c) );
  const varId =  variant!= null? variant.id:null;
  return varId;
}
const ProductPage = (props) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [addedToCartResult, setAddedToCartResult] = useState('');
  const [allOpts, setAllOpts] = useState([]);
  const [validOpts, setValidOpts] = useState([]);

  React.useEffect(() => {
    const {product: {  variants, options }, } = props
    // init all opts
    const ks = options.map((o)=>o.name);
    const vars = variants.map((v)=> v.title.split("/"));
    const aOpts = vars.map( (x) => _.range(ks.length).map((i)=>  {
      return {[ks[i]]: x[i]}
      // [ [{Size: "36"}, {Color: "M"}], [{Size: "40"}, {Color: "L"}], ... ]
    })).map( a => Object.assign({}, ...a)); 
    // [ [{Size: "36", Color: "M"}], [{Size: "40", Color: "L"}], ... ]

    setAllOpts(aOpts); 
    setSelectedVariant(aOpts[0]);

    const variantEssentialValue = aOpts[0][ks[0]] // value of the essential variant (size)
    setValidOpts(
      allOpts.filter( (opt) => opt[ks[0]] == variantEssentialValue )
    );// setValidOpts
  }, []); 


  const {
    product: { images, title, descriptionHtml, id, variants, options },
  } = props;
  console.log(allOpts);
  const addToCart = async () => {
    try {
      if (productQuantity < 1) return;
      // const {
      //   product: { variants },
      // } = props;
      // const variantId = selectedVariant
      //   ? variants.find(({ title }) => Object.keys(selectedVariant).map((k)=> title.includes(selectedVariant[k])).reduce((a, c)=> a&&c) ).id
      //   : variants[0].id;
      await addProductToCart([
        {
          selectedVariantId: getIdFromData(allOpts, selectedVariant),
          quantity: Number(productQuantity),
        },
      ]);
      setAddedToCartResult('success');
      setTimeout(() => setAddedToCartResult(''), 1000);
    } catch (e) {
      console.log(e);
      setAddedToCartResult('failure');
      setTimeout(() => setAddedToCartResult(''), 1000);
    }
  };

  const popOptionMenu = (optionType) => {
    const listItemer = (val, disabled) => {
      return {key: val, value: val, text: val, disabled};
    }
    const validOpsInOptionType = _.uniq(validOpts.map( op => op[optionType] ));
    return _.uniq(allOpts.map((op) => op[optionType])).map( (v) => listItemer(v, !validOpsInOptionType.includes(v)) ) ;
  };

  const styles ={
    addToCart: {
      borderRadius: 0,
      opacity: 0.7,
      padding: '2em',
    }
  };
  const addToCartWidget = () =>
  <Grid centered container>
    <Grid.Row stackable padded centered>
      <Grid.Column stretched style={{padding:"0", margin:"0"}} width={2}>
        <Button style={{margin:"0"}} icon='remove' onClick={()=>{
          if (productQuantity == 0)
            return
          setProductQuantity(productQuantity-1)
        }}/>
      </Grid.Column>
      <Grid.Column style={{padding:"0", margin:"0"}} width={8}>
        <Input
          fluid
          disabled
          placeholder="0"
          value={productQuantity}
          defaultValue={productQuantity}
        />
      </Grid.Column>
      <Grid.Column stretched style={{padding:"0", margin:"0"}} width={2}>
        <Button style={{margin:"0"}} icon='add' onClick={()=>setProductQuantity(productQuantity+1)} />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row stretched stackable padded centered>
      <Button  style={{color:"#dcddde", backgroundColor:"#1b1c1d", width:"100%"}} onClick={addToCart} icon="cart">ADD TO CART</Button>
    </Grid.Row>
  </Grid>;



  return (
    <>
      <Dimmer active={addedToCartResult != ''?true:false}>
        <Loader indeterminate>
          {addedToCartResult == "success"? "Item added to cart":"Item could not be added"}
        </Loader>
      </Dimmer>
      <Grid centered container>
        <Grid.Row stackable padded centered>
          <Grid.Column mobile={16} tablet={10} computer={10}>
            <Grid.Row>
              <Image size="large" src={images[selectedImage].src} />
            </Grid.Row>
            <Grid.Row>
              <List horizontal animated divided>
                {images.map((image, index) => {
                  return (
                    <List.Item
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image size="small" src={image.src} />
                    </List.Item>
                  );
                })}
                {/* <Divider vertical>Or</Divider> */}
              </List>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={6}
            computer={6}
            style={{ marginTop: 50 }}
          >
            <Segment>
              <Header>{title}</Header>
              {
                options.map((option) => {
                  return (
                    <>
                    <Header as="h3">{option.name} </Header>
                    <Dropdown
                      fluid
                      selection
                      onChange={(e, { value }) => {
                        const selectedVar = {...selectedVariant, [option.name]: value};
                        setSelectedVariant(selectedVar);
                      }}
                      // options={popOptionMenu(option.name)}
                      // options={option.values != null? option.values:[]}
                    >
                      <Dropdown.Menu>
                        {popOptionMenu(option.name).map( item => <Dropdown.Item style={item.disabled?{color:  "grey"}:{}}  text={item.text} ></Dropdown.Item>  ) }
                      </Dropdown.Menu> 
                    </Dropdown>
                    </>
                  );
                })
              }
              <Header as="h3">ADD to Cart </Header>
              {addToCartWidget()}
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid text style={{ marginTop: 50 }}>
          <Header as="h3" textAlign="left">
            Product Description:
          </Header>
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </Grid>
      </Grid>
    </>

  );
};

export async function getServerSideProps({ query }) {
  // console.log(query.productId[0]);
  const product = await client.product.fetch(query.productId[0]);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }, // will be passed to the page component as props
  };
}
export default ProductPage;
