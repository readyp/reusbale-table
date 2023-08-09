import TableResponseInterface from "../../types/table-response.interface";
import apiSlice from "../utils/create-api";

// @ts-ignore
const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<TableResponseInterface, string>({
      query: (url) => ({
        url,
        method: "GET",
      }),
      providesTags: ["Data"],
    }),
  }),
});

export default postApiSlice;
export const { useGetPostsQuery, useLazyGetPostsQuery } = postApiSlice;
