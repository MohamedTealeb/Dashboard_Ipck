export const getAllCategories = createAsyncThunk(
  "category/getallcategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);