import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userRequest } from "../requestMethods";
import styled from "styled-components"
import { removeAllProducts } from "../redux/cartRedux";

const Emoji = styled.div`
font-size:50px;
`
const Button11 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  margin-top: 10px;
  border-radius: 6px;
  color: #3D3D3D;
  background: #fff;
  border: none;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`



const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  const handleClick = ()=>{
    dispatch(removeAllProducts());
  }

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((value) => ({
            productId: value._id,
            quantity: value.quantity,
          })),
          amount: cart.total,
          address: {
             country: data.billing_details.address.country,
              city: data.billing_details.address.city,
              line1: data.billing_details.address.line1,
              postalCode: data.billing_details.address.postal_code,}
        });
        setOrderId(res.data.id);
      } catch {console.error("erro");}
    };
    data && createOrder();
  }, [cart, data, currentUser]);
  
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    ><Emoji>🥳</Emoji>
       <p>Payment accept</p>
       {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
        {location.state.products.products._id}
     <Link to="/" style={{ textDecoration: 'none' }}> <Button11 onClick={handleClick}>Go to Homepage </Button11></Link>
    </div>
  );
};

export default Success;