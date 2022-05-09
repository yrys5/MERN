import { Add, Favorite, FavoriteBorder, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { addProductFav, removeProductFav } from "../redux/favouriteRedux";

const Container = styled.div``;


const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({padding:"10px", flexDirection:"column"})}
`;

const ImgContainer = styled.div`
flex: 1;
`;

const Image = styled.img`
width: 100%;
height: 90vh;
object-fit: cover;
${mobile({height:"40vh"})}
`;

const InfoContainer = styled.div`
flex: 1;
padding: 0px 50px;
${mobile({padding:"10px"})}
`;

const Title = styled.h1`
font-weight: 200;
`;

const Desc = styled.p`
margin: 20px 0px;
`;

const Price = styled.span`
font-weight: 100;
font-size: 40px;
`;

const FilterContainer = styled.div`
width: 50%;
margin: 30px 0px;
display: flex;
justify-content: space-between;
${mobile({width:"100%"})}
`;

const Filter = styled.div`
display: flex;
align-items: center;
`;

const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`;

const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${(props) => props.color};
margin: 0px 5px;
cursor: pointer;
`;

const FilterSize = styled.select`
margin-left: 10px;
padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;
${mobile({width:"100%"})}
`;

const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;
`;

const Amount = styled.span`
width: 30px;
height: 30px;
border-radius: 10px;
border: 1.5px solid lightgray;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
`;

const ButtonFavourite = styled.div``;

const Button = styled.button`
padding: 16px;
background-color: teal;
  border:none;
  color:white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #4CA6A6;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  const [product,setProduct] = useState({})
  const [quantity,setQuantity] = useState(1)
  const [color,setColor] = useState("");
  const [size,setSize] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isItOnFavList,setIsItOnFavList] = useState(null);
  const [clickedFav,setClickedFav] = useState({})
  const dispatch = useDispatch();

  useEffect(()=>{
   const getProduct = async ()=>{
      try{

        const res = await publicRequest.get("/products/find/" + id)
        setProduct(res.data)

        if (currentUser != null) {
          const req = await userRequest.get("/favourites/find/" + currentUser._id + "/" + id )
          console.log(req.data);
          setIsItOnFavList(req.data)
          if (req.data != null) {
            setClickedFav(false)
          }else{
            setClickedFav(true)
          }}

      }catch{}
   }
   getProduct()
  },[id,currentUser])

  window.scroll(0, 0);

  const handleQuantity = (type) =>{
    if(type === "dec"){
     quantity >1 && setQuantity(quantity-1)
  }else{
    setQuantity(quantity+1)
  }};

  const handleClick = ()=>{
    dispatch(addProduct({ ...product,quantity,color,size }));
  }
  const handleFavourite = ()=>{
      const addFav = async () => {
        try{   
          //console.log("Favorite list doesn't exist, creating new one..")
          const res = await userRequest.put("/favourites/"+ currentUser._id,
          {
                 userId: currentUser._id,
                 products:{
                   productId: product._id,
                   img: product.img,
                   title: product.title,
                   price: product.price,
                 }}   
         )
        }catch{
          console.log("Error in adding to the favorite list")
      }
      dispatch(addProductFav({ ...product}));
    }
 addFav()
  }

  const handleFavouriteRemove = ()=>{
    const removeFav = async () => {
      try{

    const res = await userRequest.put("/favourites/remove/"+ currentUser._id,
{
      userId: currentUser._id,
      products:{
        productId: product._id,
        img: product.img,
        title: product.title,
        price: product.price,
      }}   
)
    }catch{console.log("Error in removing from the favorite list")}
    dispatch(removeProductFav({ ...product}));
  }
removeFav()
}


const favouriteIcon = 
<ButtonFavourite>
   {clickedFav === false ? (
            <Favorite onClick={handleFavouriteRemove}></Favorite>    
        ) : (
            <FavoriteBorder onClick={handleFavourite}></FavoriteBorder>
        )}
        </ButtonFavourite>
        console.log(isItOnFavList)
  
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                      {product.desc}
                    </Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c)=>(
                            <FilterColor color={c} key={c} onClick={()=>setColor(c)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e)=>setSize(e.target.value)}>
                              {product.size?.map((s) =>(
                                <FilterSizeOption key={s}>{s}</FilterSizeOption>
                              ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=>handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=>handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                        <ButtonFavourite onClick={()=> setClickedFav(!clickedFav)}>
                          {console.log(clickedFav)}
                          { currentUser != null ?
                            favouriteIcon :
                          null
                          } 
                        </ButtonFavourite>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;