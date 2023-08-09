import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base-query";

const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Data"],
});

export default apiSlice;
