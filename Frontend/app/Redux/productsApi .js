// app/redux/productsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://127.0.0.1:8000/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Product', 'Category', 'Cart'],
  endpoints: (builder) => ({
    // ============= PRODUCT ENDPOINTS =============
    getProducts: builder.query({
      query: () => 'products/',
      providesTags: ['Product']
    }),
    
    getProductById: builder.query({
      query: (id) => `products/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Product', id }]
    }),
    
    createProduct: builder.mutation({
      query: (product) => ({
        url: 'products/',
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Product']
    }),
    
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `products/${id}/`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }]
    }),
    
    patchProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `products/${id}/`,
        method: 'PATCH',
        body: rest
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }]
    }),
    
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Product', id }]
    }),
    
    addProductReview: builder.mutation({
      query: ({ id, ...review }) => ({
        url: `products/${id}/add-review/`,
        method: 'POST',
        body: review
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }]
    }),
    
    uploadProductImages: builder.mutation({
      query: ({ id, formData }) => ({
        url: `products/${id}/upload-images/`,
        method: 'POST',
        body: formData
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }]
    }),
    
    // ============= CATEGORY ENDPOINTS =============
    getCategories: builder.query({
      query: () => 'products/categories/',
      providesTags: ['Category']
    }),
    
    createCategory: builder.mutation({
      query: (category) => ({
        url: 'products/categories/',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['Category']
    }),
    
    getCategoryById: builder.query({
      query: (id) => `products/categories/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Category', id }]
    }),
    
    updateCategory: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `products/categories/${id}/`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }]
    }),

    // ============= CART ENDPOINTS =============
    getMyCart: builder.query({
      query: () => 'cart/my_cart/',
      providesTags: ['Cart']
    }),
    
    addCartItem: builder.mutation({
      query: (itemData) => ({
        url: 'cart/add_item/',
        method: 'POST',
        body: itemData
      }),
      invalidatesTags: ['Cart']
    }),
    
    updateCartItem: builder.mutation({
      query: (itemData) => ({
        url: 'cart/update_item/',
        method: 'POST',
        body: itemData
      }),
      invalidatesTags: ['Cart']
    }),
    
    removeCartItem: builder.mutation({
      query: (itemData) => ({
        url: 'cart/remove_item/',
        method: 'POST',
        body: itemData
      }),
      invalidatesTags: ['Cart']
    }),
    
    clearCart: builder.mutation({
      query: () => ({
        url: 'cart/clear/',
        method: 'POST'
      }),
      invalidatesTags: ['Cart']
    })
  })
});

// Export hooks for usage in components
export const {
  // Product endpoints
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
  useAddProductReviewMutation,
  useUploadProductImagesMutation,
  
  // Category endpoints
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  
  // Cart endpoints
  useGetMyCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation
} = productsApi;