import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  data: [],
};

export const getAllCategories = createAsyncThunk('categories/getAll', async () => {
  try {
    const response = await axios.get(
      'https://drone-rental-backend.herokuapp.com/api/categories',
    );
    return response.data.map(element => ({
      ...element,
      checked: false,
      disabled: false,
    }));
  } catch (error) {
    throw new Error(error);
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    checkField(state, action) {
      const name = action.payload;
      state.data = state.data.map(category => {
        if (category.name === name) {
          return { ...category, checked: !category.checked };
        }
        return category;
      });
    },
    checkAllFields(state) {
      state.data = state.data.map(category => ({ ...category, checked: true }));
    },
    unCheckAllFields(state) {
      state.data = state.data.map(category => ({ ...category, checked: false }));
    },
    // disableCheckbox(state, action){

    // },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = 'fullfiled';
        state.data = [...action.payload];
      })
      .addCase(getAllCategories.rejected, state => {
        state.status = 'rejected';
      });
  },
});

export const {
  checkField,
  checkAllFields,
  unCheckAllFields,

  extraReducers,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
