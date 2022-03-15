import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  data: [],
  info: { perPage: 8, totalCount: 1 },
  pages: 1,
  filteredData: [],
  selectedFilters: [],
};

export const getAllDrones = createAsyncThunk('drones/getAll', async () => {
  try {
    const drones = await axios.get(`http://localhost:8080/api/drones/`);
    return drones.data;
  } catch (error) {
    throw new Error(error);
  }
});

// export const getDronesByPage = createAsyncThunk('drones/getAll', async (page) => {
//   try {
//     const drones = await axios.get(`http://localhost:8080/api/drones/${page}`);
//     return drones.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const dronesSlice = createSlice({
  name: 'drones',
  initialState,
  reducers: {
    filterData(state) {
      state.filteredData = state.data.filter(element =>
        state.selectedFilters.includes(element.category_id.name),
      );
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
    addAllToFilter(state, action) {
      const allCategories = action.payload;
      state.selectedFilters = allCategories;
    },
    sortDrones(state, action) {
      const { value } = action.payload;
      let field;
      let isAscending;
      switch (value) {
        case 1:
          field = 'model';
          isAscending = true;
          break;
        case 2:
          field = 'model';
          isAscending = false;
          break;
        case 3:
          field = 'pricePerDay';
          isAscending = false;
          break;
        case 4:
          field = 'pricePerDay';
          isAscending = true;
          break;

        default:
          break;
      }
      function customSort(a, b) {
        const nameA = a[field];
        const nameB = b[field];
        if (field === 'pricePerDay' && isAscending) {
          return a.pricePerDay - b.pricePerDay;
        }
        if (field === 'pricePerDay' && !isAscending) {
          return b.pricePerDay - a.pricePerDay;
        }

        if (field === 'model') {
          if (nameA < nameB) {
            return isAscending ? -1 : 1;
          }
          if (nameA > nameB) {
            return isAscending ? 1 : -1;
          }
        }
        return 0;
      }
      state.data = state.data.sort(customSort);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getAllDrones.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllDrones.rejected, state => {
        state.status = 'rejected';
      })
      .addCase(getAllDrones.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = [...action.payload];
        state.info = { ...state.info, totalCount: action.payload.length };
        state.pages = Math.ceil(action.payload.length / state.info.perPage);
      });
  },
});

export const {
  filterData,
  addFilter,
  removeFilter,
  addAllToFilter,
  sortDrones,
  extraReducers,
} = dronesSlice.actions;
export default dronesSlice.reducer;
