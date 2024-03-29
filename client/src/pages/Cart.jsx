import { Add, DeleteOutlineOutlined, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import {userRequest} from "../requestMethods"
import {Link, useNavigate} from "react-router-dom"
import { removeProduct } from "../redux/cartRedux";


const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding:"10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
${mobile({display:"none"})}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin:"5px 15px"})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom:"20px"})}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state)=>state.cart);
  const [stripeToken,setStripeToken] =useState(null)
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [sum,setSum] = useState(0);
  const quantityFavourite = useSelector(state=>state.favourite.quantity)
  var summary = 0;

  const handleClick = (product)=>{
    dispatch(removeProduct(product));
  }
  //start section to correct - invalid try element - working with catch 
  //solved -- wrong stripe key - not reading correctly
  let history = useNavigate();

  const onToken = (token)=>{
    setStripeToken(token);
  };

  useEffect(()=>{
    cart.products.map((product)=>(
      summary += product.price*product.quantity,
      setSum(summary)
      ))
      
      if (cart.products.length <1) {
         setSum(0)
         console.log(`sum value: ${sum}`)
      }

  const makeRequest = async ()=>{
  try{
    const res = await userRequest.post("/checkout/payment",{
      tokenId: stripeToken.id,
      amount: sum*100,
    });
    history("/success",{state:{
      stripeData: res.data,
      products: cart,
    }});

    const res2 = await userRequest.post("/orders", {
      userId: currentUser._id,
      products: cart.products.map((value) => ({
        productId: value._id,
        quantity: value.quantity,
      })),
      amount: sum,
      address: {
         country: res.data.billing_details.address.country,
          city: res.data.billing_details.address.city,
          line1: res.data.billing_details.address.line1,
          postalCode: res.data.billing_details.address.postal_code,}
    });
  }catch{history("/")}
}
stripeToken && makeRequest()
}, [stripeToken, cart.total,cart, history,currentUser])
//end of section to correct
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.products.length})</TopText>
            <Link to="/favourite" style={{ textDecoration: 'none', color:'black' }}><TopText>Your Wishlist ({quantityFavourite})</TopText></Link>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product)=>(
            <Product>
              <ProductDetail>
                
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor><b>Color:</b>{product.color}</ProductColor>
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
              <DeleteOutlineOutlined style={{ cursor:'pointer' }} onClick={()=>handleClick(product)}></DeleteOutlineOutlined>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
              </PriceDetail>
            </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {sum}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {sum}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
            name="enet shop"
            image="https://media.istockphoto.com/vectors/online-payment-processing-with-credit-card-vector-id614448502?k=6&m=614448502&s=612x612&w=0&h=g4gbAzUeA0hyjcD6rVO808uHZSzbeB2l78HAUMk9Cpc="
            billingAddress
            shippingAddress
            description={`Your total is$${sum}`}
            amount={sum*100}
            token={onToken}
            stripeKey={KEY}
            >
            <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;