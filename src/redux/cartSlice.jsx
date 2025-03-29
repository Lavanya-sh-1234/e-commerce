import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

const updateLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const productData = {
        ...action.payload,
        id: crypto.randomUUID(), // Generate a unique ID
      };

      const newCart = [...state, productData];
      updateLocalStorage(newCart);
      return newCart;
    },

    deleteFromCart(state, action) {
      const newCart = state.filter((item) => item.id !== action.payload.id);
      updateLocalStorage(newCart);
      return newCart;
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
