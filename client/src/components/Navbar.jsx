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
    height:fit-content;
    background-color: white;
    border: 3px;
    border-radius: 3px;
    padding: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
    
    const Navbar = () => {
        const loggedUser = useSelector((state)=>state.user);
        const [search,setSearch] = useState("")
        const cartQuantity = useSelector((state)=>state.cart);
        const quantityFavourite = useSelector(state=>state.favourite.quantity)
        const [open,setOpen] = useState(false);
        
        const handleFilter = (event) =>{
            setSearch(event.target.value);
            console.log(search)
            }

            const dispatch = useDispatch();
            
            const handleClick = (e)=>{
                e.preventDefault()
                logout(dispatch)
              }

        const text =
        <Dropdown>
    <DropdownWelcome> {loggedUser.currentUser != null ? (
        "Welcome, " + loggedUser.currentUser.username
        ) : (
    <Link to="/login" style={{ textDecoration: 'none', color:'black' }}><DropdownItem>SIGN IN</DropdownItem></Link>
        )}
        </DropdownWelcome>
    <DropdownItem onClick={handleClick} >
    {loggedUser.currentUser != null ? (
        "LOGOUT"
        ) : (
    <Link to="/register" style={{ textDecoration: 'none', color:'black' }}><DropdownItem>REGISTER</DropdownItem></Link>          
        )}
    </DropdownItem>
    </Dropdown>

return (
    <Container>
           <Wrapper>
    
               <Left>
                   <Language>EN</Language>
                   <SearchContainer>
                       <Input type= 'text'  placeholder = "Search" onChange={handleFilter}/>
                   </SearchContainer>
                        <NavLink to={`/products/${search}`} ><Search style={{color:"gray", fontSize:16, marginLeft:2}}/></NavLink>
               </Left>
               <Link to="/" style={{ textDecoration: 'none', color:'black' }}><Center><Logo>enet.</Logo></Center></Link>
               <Right>
                   {/*<Link to ="/register" style={{ textDecoration: 'none', color:'black' }}><MenuItem>REGISTER</MenuItem></Link>
                   <Link to ="/login" style={{ textDecoration: 'none', color:'black' }}><MenuItem>SIGN IN</MenuItem></Link>*/}
                   
                   <MenuItem><ListOutlined/></MenuItem>
                   <Link to="/favourite" style={{ textDecoration: 'none', color:'black' }}>
                   <Badge badgeContent={quantityFavourite} color="primary">
                   <MenuItem><FavoriteBorder/></MenuItem>
                   </Badge>
                   </Link>
                   <MenuItem><AccountCircleOutlined onClick={()=> setOpen(!open)}/></MenuItem>
                   {open && text}
                   <Link to="/cart" style={{ textDecoration: 'none', color:'black' }}>
                   <MenuItem>
                   <Badge badgeContent={cartQuantity.products.length} color="primary">
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
