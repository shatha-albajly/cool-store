import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';
import Rating from './Rating';

const ProductsGrid = () => {
  function calculatePriceBeforeDiscount(originalPrice, discountPercentage) {
    return formatPrice(originalPrice * (100 / (100 - discountPercentage)));
  }
  const { products } = useLoaderData();

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        const { title, price, thumbnail, category, rating, discountPercentage } = product;
        const dollarsAmount = formatPrice(price);
        return (
          <p
            key={product.id}
            className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
          >
            <figure className='px-4 pt-4'>
              <img
                src={thumbnail}
                alt={title}
                className='rounded-xl h-64 md:h-48 w-full object-cover'
              />
            </figure>
            <div className='flex relative card-body items-center text-center '>
              <h2 className='card-title capitalize tracking-wider'>{title}</h2>
              <div ><span className='text-sm'>Category : </span>
                <span className='font-semibold'>{category}</span></div>

              <div className=' flex gap-x-2'>
                <span className='text-gray-500 line-through '>{calculatePriceBeforeDiscount(price, discountPercentage)}</span>
                <span className='text-black font-bold'>{dollarsAmount}</span>

              </div>
              <Rating rating={rating} />
              <div className='mb-10'></div>



              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className='absolute bottom-5   w-[80%] mx-auto btn btn-primary'
              >Details</Link>




            </div>
          </p>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
