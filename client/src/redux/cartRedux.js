import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products: [],
        quantity: 0,
    },
    reducers:{
        addProduct:(state,action) => {
            state.quantity += 1;
            state.products.push(action.payload)
        },
        removeProduct:(state,action) => {
            state.quantity -= 1;
            state.products.map((product)=> {
                if (product._id === action.payload._id) {
                    const nextProducts = state.products.filter(
                      (item) => item._id !== product._id
                    );
                    state.products = nextProducts;
                  }
                  //localStorage.setItem("cart", JSON.stringify(state.products));
                  return state;
            });
        },
        removeAllProducts:(state) => {
            state.quantity = 0;
            state.products = [];
        }
    }
})

export const { addProduct, removeProduct, removeAllProducts } = cartSlice.actions;
export default cartSlice.reducer;