import React from 'react'
import { Announcement } from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'
import styled from 'styled-components'
import { useEffect } from 'react'
import { userRequest } from '../requestMethods'
import { useSelector } from 'react-redux'

const Text = styled.div`
margin-left:30px;
margin-top:30px;
font-weight:bold;
font-size:26px;
  display: flex;
`;

const Text2= styled.div`
margin-left:30px;
font-weight:normal;
font-size:13px;
  display: flex;
`;

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

useEffect(()=>{
  if (currentUser !=null) {
  const createFavList= async ()=>{
    await userRequest.post("/favourites",{
      userId: currentUser._id,
      products: []
    })
  }
  createFavList()
  }
})
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Text>NEWEST PRODUCTS</Text>
            <Text2>ADDED ON THE SHOP</Text2>
            <Products/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home
