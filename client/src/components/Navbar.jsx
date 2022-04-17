import { Badge } from '@material-ui/core';
import { AccountCircleOutlined, FavoriteBorder, ListOutlined, Search, ShoppingBasketOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components'
import {mobile} from "../responsive"
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
     height: 50px;
     ${mobile({height:"50px"})}
`;

const Wrapper = styled.div`
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    ${mobile({padding:"10px 0px"})}
`;

const Left = styled.div`
flex:1;
display: flex;
align-items: center;
`;
const Center = styled.div`
flex:1;
text-align: center;
`;
const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({flex:2,justifyContent:"center"})}
`;

const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({display:"none"})}
`;

const SearchContainer = styled.div`
border: 1px solid lightgray;
border-radius: 5px;
display: flex;
align-items: center;
margin-left: 25px;
`;

const Input = styled.input`
border: none;
height: 20px;
${mobile({width:"50px"})}
`;

const Logo = styled.h1`
font-weight: bold;
${mobile({fontSize:"24px"})}
`;

const MenuItem = styled.div`
font-size: 14px;
cursor: pointer; 
margin-left: 12px;
${mobile({fontSize:"12px", marginLeft:"10px"})}
`;

const Dropdown = styled.div`
    position: absolute;
    top: 80px;
    width: 80px;
    height: 100px;
    background-color: white;
    border: 3px;
    border-radius: 3px;
    padding: 1rem;
    overflow: hidden;
    z-index : 1;
    `
    

    const DropdownItem = styled.div`

    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 0.05rem;
    cursor: pointer; 
    `
    const DropdownWelcome = styled.div`

    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 0.05rem;
    cursor: pointer;
    color:teal;
    `
    
    const handleFilter = (event) =>{
        var searchWord = event.target.value;
        global = searchWord;
        console.log(searchWord);
        console.log(global)
        }

        
        var global;
        
        const Navbar = () => {
            const loggedUser = useSelector((state)=>state.user);

            const dispatch = useDispatch();
            
            const handleClick = (e)=>{
                e.preventDefault()
                logout(dispatch)
              }
        const quantity = useSelector(state=>state.cart.quantity)
        const [open,setOpen] = useState(false);
        const text =
        <Dropdown>
    <DropdownWelcome>Welcome, {loggedUser.currentUser.username}</DropdownWelcome>
    <Link to="/login" style={{ textDecoration: 'none', color:'black' }}><DropdownItem>SIGN IN</DropdownItem></Link>
    <DropdownItem>REGISTER</DropdownItem>
    <DropdownItem onClick={handleClick} >LOGOUT</DropdownItem>
    </Dropdown>

return (
    <Container>
           <Wrapper>
    
               <Left>
                   <Language>EN</Language>
                   <SearchContainer>
                       <Input type= 'text'  placeholder = "Search" onChange={handleFilter}/>
                   </SearchContainer>
                        <NavLink to={`/products/${global}`} ><Search style={{color:"gray", fontSize:16, marginLeft:2}}/></NavLink>
               </Left>
               <Link to="/" style={{ textDecoration: 'none', color:'black' }}><Center><Logo>enet.</Logo></Center></Link>
               <Right>
                   {/*<Link to ="/register" style={{ textDecoration: 'none', color:'black' }}><MenuItem>REGISTER</MenuItem></Link>
                   <Link to ="/login" style={{ textDecoration: 'none', color:'black' }}><MenuItem>SIGN IN</MenuItem></Link>*/}
                   
                   <MenuItem><ListOutlined/></MenuItem>
                   <MenuItem><FavoriteBorder/></MenuItem>
                   <MenuItem><AccountCircleOutlined onClick={()=> setOpen(!open)}/></MenuItem>
                   {open && text}
                   <Link to="/cart" style={{ textDecoration: 'none', color:'black' }}>
                   <MenuItem>
                   <Badge badgeContent={quantity} color="primary">
                       <ShoppingBasketOutlined/>
                   </Badge>
                   </MenuItem>
                   </Link>
               </Right>
           </Wrapper>
        </Container>
    )
}

export default Navbar
