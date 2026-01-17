import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cart/${userId}`, {
        withCredentials: true,
      });
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart/add", productData);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const increment = createAsyncThunk(
  "cart/increment",
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/increment/${cartId}`);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const decrement = createAsyncThunk(
  "cart/decrement",
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/decrement/${cartId}`);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const itemDelete = createAsyncThunk(
  "cart/delete",
  async (cartId, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/delete/${cartId}`);
      return cartId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const allDeleteCart = createAsyncThunk(
  "cart/all-delete",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/all-delete/${userId}`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/wishlist/${userId}`);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post("/wishlist/add", productData);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const wishlistDelete = createAsyncThunk(
  "wishlist/wishlistDelete",
  async (wishlistId, { rejectWithValue }) => {
    try {
      await api.delete(`/wishlist/delete/${wishlistId}`);
      return wishlistId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const allDeleteWishlist = createAsyncThunk(
  "wishlist/allDeleteWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/wishlist/all-delete/${userId}`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const moveToCart = createAsyncThunk(
  "wishlist/moveToCart",
  async (wishlistId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/wishlist/move-from-wishlist/${wishlistId}`);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    wishItems: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "faild";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const updatedCartItem = action.payload;
        const index = state.items.findIndex(
          (item) => item._id === updatedCartItem._id
        );
        if (index !== -1) {
          state.items[index] = updatedCartItem;
        } else {
          state.items.push(updatedCartItem);
        }
      })
      .addCase(increment.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item._id === updatedItem._id
        );
        if (index !== -1) {
          state.items[index] = updatedItem;
        }
      })
      .addCase(decrement.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item._id === updatedItem._id
        );
        if (index !== -1) {
          state.items[index] = updatedItem;
        }
      })
      .addCase(itemDelete.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.items = state.items.filter((item) => item._id !== deletedId);
      })
      .addCase(allDeleteCart.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishItems = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishItems.push(action.payload);
      })
      .addCase(wishlistDelete.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.wishItems = state.wishItems.filter(
          (item) => item._id !== deletedId
        );
      })
      .addCase(allDeleteWishlist.fulfilled, (state) => {
        state.wishItems = [];
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        const movedWishlistId = action.meta.arg;
        state.wishItems = state.wishItems.filter(
          (item) => item._id !== movedWishlistId
        );
        const updatedCartItem = action.payload;

        const index = state.items.findIndex(
          (item) => item._id === updatedCartItem._id
        );
        if (index !== -1) {
          state.items[index] = updatedCartItem;
        } else {
          state.items.push(updatedCartItem);
        }
      });
  },
});

export default productSlice.reducer;