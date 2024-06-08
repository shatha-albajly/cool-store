import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { customFetch } from '../utils';

const allProductsQuery = (queryParams) => {
  const { search, skip, category, sortBy, order, price } = queryParams;
  console.log("queryParams", queryParams)



  const url = (category && category !== 'all') ? `/products/category/${category}` : '/products/search';


  return {
    queryKey: [
      search ?? '',
      category ?? 'all',
      sortBy ?? 'title',
      order ?? 'asc',
      skip ?? 0,
      price ?? 0,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};


const categoriesQuery = () => {
  return {
    queryKey: ['categories'],
    queryFn: () => customFetch(`/products/categories`),
  };
};
export const loader =
  (queryClient) =>
    async ({ request }) => {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      if (!params.order) {
        params.order = 'asc';
      }
      if (params.order) {
        params.sortBy = 'title';
      }
      if (!params.skip) {
        params.skip = 0;
      }
      // if (!params.price) {
      //   params.price = 0;
      // }

      console.log("params", params)


      const response = await queryClient.ensureQueryData(
        allProductsQuery(params)
      );





      const products = response.data.products;



      // const products = productsData.filter((product) => {
      //   return product && product.price >= params.price
      // })



      const meta = {
        "limit": response.data.limit,
        "skip": response.data.skip,
        "total": response.data.total,
      }

      return { products, meta, params };
    };

export const categoriesLoader =
  (queryClient) =>
    async ({ request }) => {

      const categoriesResponse = await queryClient.ensureQueryData(
        categoriesQuery()
      );
      const categoriesData = categoriesResponse.data.map((data) => data.slug)
      const allCategories = ['all', ...categoriesData]




      const categories = allCategories
      return { categories };
    };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
