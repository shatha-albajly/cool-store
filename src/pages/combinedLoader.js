// src/loaders/combinedLoader.js

import { loader as productsLoader, categoriesLoader } from './Products';

export const combinedLoader = (queryClient) => async ({ request }) => {
    const [productsResult, categoriesResult] = await Promise.all([
        productsLoader(queryClient)({ request }),
        categoriesLoader(queryClient)({ request }),
    ]);

    return {
        products: productsResult.products,
        meta: productsResult.meta,
        params: productsResult.params,
        categories: categoriesResult.categories,
    };
};
