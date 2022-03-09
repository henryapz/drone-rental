import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  data: [],
  selectedFilters: [],
};

export const getAllCategories = createAsyncThunk('categories/getAll', async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/categories');
    return response.data.map(element => ({ ...element, checked: false }));
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
    addFilter(state, action) {
      const name = action.payload;
      state.selectedFilters.push(name);
    },
    removeFilter(state, action) {
      const name = action.payload;
      const index = state.selectedFilters.indexOf(name);
      state.selectedFilters.splice(index, 1);
    },
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
  addFilter,
  removeFilter,
  extraReducers,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
