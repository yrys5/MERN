import {createSlice} from "@reduxjs/toolkit"

const favouriteSlice = createSlice({
    name:"favourite",
    initialState:{
        products: [],
        quantity: 0,
    },
    reducers:{
        addProductFav:(state,action) => {
            state.quantity += 1;
            state.products.push(action.payload);
        },
        removeProductFav:(state,action) => {
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
    }
})

export const { addProductFav, removeProductFav } = favouriteSlice.actions;
export default favouriteSlice.reducer;