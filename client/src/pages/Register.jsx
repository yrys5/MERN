import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import FormInput from "../components/FormInput";
import { ArrowBackIos } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 17.5rem;
  padding: 20px;
  background-color: white;
  ${mobile({width:"17.5rem"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;


const Agreement = styled.span`
  font-size: 11px;
  margin: 10px 0px;
`;

const Button = styled.button`
  margin-top:10px;
  margin-right: 10px;
  width: 40%;
  border: none;
  padding: 10px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:disabled{
    color:black;
    cursor: not-allowed;
  }

  &:hover{
    background-color: #00AEAE;
  }
`;

const BackButton = styled.button`
  width:cover;
  border: none;
  background-color: white;
  color: black;
  font-size:12px;
  padding: 10px 0px;
  cursor: pointer;
  
  &::after {
    content: "";
    display: block;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    height: 2px;
    width: 0px;
    background-color: teal;
}
&:hover::after {
  width: 100%;
  transition: all 0.4s;
}
`;

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character.",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address.",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character.",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match.",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  useEffect(()=>{
    const currentURL = window.location.href;
    if (currentURL != "http://localhost:3000/register") {
      window.location.assign('http://localhost:3000/register-success')
    }
  })
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.preventDefault())
  };
  
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const handleUser = ()=>{
    const makeRequest = async ()=>{
    try{
      await publicRequest.post("/auth/register",{
      username: values.username,
      email: values.email,
      password: values.password,
    }
    )}catch{console.log("Error in creating user")}
  }
  makeRequest()
}

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
         <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
         ))}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b><a href="https://policies.google.com/privacy?hl=en">PRIVACY POLICY</a></b>
          </Agreement>
          <Button onClick={handleUser}>CREATE</Button>
          <Link to="/login"><ArrowBackIos style={{height:"14px",marginBottom:"-2px",color:"black"}}/><BackButton>BACK TO LOGIN</BackButton></Link>
          </form>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;