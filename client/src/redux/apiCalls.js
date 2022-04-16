import { loginFailure, loginStart, loginSucess, logoutSuccess } from "./userRedux"
import { publicRequest } from "../requestMethods"

export const login = async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login",user)
        dispatch(loginSucess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
    
}

export const logout = async (dispatch)=>{
    try{
    dispatch(logoutSuccess())
    }catch(err){
        
    }
}