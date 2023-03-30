import axios from "axios";

const BASE_URL = "http://localhost:5001/api/"
//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGNkYjA2OWYwNWVmZWI4NmE3NDA0NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzE3OTA0MCwiZXhwIjoxNjM3NDM4MjQwfQ.YGay7XDpHamlp8_qZDc5AIhC3sZa3VTK_4hDr4JkMLA"

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzQ2NDcyYjE5NTZkMWZkNzFiZDIyZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDc2MDA5MDUsImV4cCI6MTY0Nzg2MDEwNX0.pMjKlmQ1Psihzis5-mYqqgpbEkD17LqpVv_kXhfN9Qo"
//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGNkYjA2OWYwNWVmZWI4NmE3NDA0NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NzY5MDUyNCwiZXhwIjoxNjQ3OTQ5NzI0fQ.nbwXXld5TyqCi2QcEzLJllwRpSvLb1LUDGo1qFc2JD0"


export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})