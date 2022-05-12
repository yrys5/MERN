import { DeleteOutlineOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Announcement }  from '../components/Announcement'
import Navbar from '../components/Navbar'
import { removeProductFav, updateAllFav } from '../redux/favouriteRedux';
import styled from "styled-components";
import { mobile } from "../responsive";
import { userRequest } from '../requestMethods';

const Container = styled.div`
`;

const Title = styled.h1`
margin-left:30px;
margin-top:30px;
font-weight:bold;
font-size:26px;
  display: flex;
  `;
  
  
  const Info = styled.div`
  flex: 3;
  margin-top:20px;
  `;
  
  const Product = styled.div`
  display: flex;
  margin-left:30px;
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
  
  const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  
  const Favourite = () => {
  const favourite = useSelector((state)=>state.favourite);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [favouriteProduct,setFavouriteProduct] = useState({})

  const handleClick = (product)=>{
    dispatch(removeProductFav(product));
  }

    useEffect(()=>{
      if (currentUser != null) {
        
        const getFavouriteProduct = async ()=>{
          try{
            const res = await userRequest.get("/favourites/find/" + currentUser._id)
            let newState = res.data;
            console.log(res.data.products)
            dispatch(updateAllFav(res.data))
            
            setFavouriteProduct(newState)
          }catch{console.log("list doesn't exist")}
        }
        getFavouriteProduct()
      }
      },[currentUser,dispatch])

  return (
    <Container>
    <Announcement/>
      <Navbar />
      <Title>My wishlist:</Title>
<Info>
  {console.log(favouriteProduct)}
{favourite.products.map((product)=>(
      <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product.productId}
                  </ProductId>
              <DeleteOutlineOutlined style={{ cursor:'pointer' }} onClick={()=>handleClick(product)}></DeleteOutlineOutlined>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductPrice>$ {product.price}</ProductPrice>
              </PriceDetail>
            </Product>
            ))}

            <Hr />
          </Info>
        </Container>
  )
}

export default Favourite