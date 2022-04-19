import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers:{
        addProduct:(state,action) => {
            state.quantity += 1;
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity;
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
            state.total -= action.payload.price * action.payload.quantity;
        },
        removeAllProducts:(state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        }
    }
})

export const { addProduct, removeProduct, removeAllProducts } = cartSlice.actions;
export default cartSlice.reducer;