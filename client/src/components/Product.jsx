import { FavoriteBorder, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Info = styled.div`
opacity:0;
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color:rgba(0,0,0,0.2);
z-index:3;
display:flex;
align-items:center;
justify-content:center;
transition: 0.5s ease;
cursor:pointer;
`;

const Container = styled.div`
flex:1;
margin:5px;
min-width:258px;
height:380px;
display:flex;
align-items:center;
justify-content:center;
background-color:white;
position:relative;

&:hover ${Info}{
opacity:1;
}
`;

const Image = styled.img`
height:100%;
z-index:2;
`;

const Icon = styled.div`
width:40px;
height:40px;
border-radius:50%;
background-color:white;
display:flex;
align-items:center;
justify-content:center;
margin:10px;
transition:all 0.5s ease;
 &:hover{
    background-color: #e9f5f5;
    transform: scale(1.15);
}
`;

const Product = ({ item }) => {
    return (
        <Container>
            
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color:'black' }}>
                    <SearchOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorder />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product
