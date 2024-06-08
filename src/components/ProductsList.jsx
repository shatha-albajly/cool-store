import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';
import Rating from './Rating';

const ProductsList = () => {
  const { products } = useLoaderData();
  function calculatePriceBeforeDiscount(originalPrice, discountPercentage) {
    return formatPrice(originalPrice * (100 / (100 - discountPercentage)));
  }
  console.log(products);

  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product) => {
        const { title, price, thumbnail, description, category, rating, discountPercentage } = product;
        const dollarsAmount = formatPrice(price);
        return (
          <div
            key={product.id}
            className=' p-8 rounded-lg flex flex-col md:flex-row gap-y-4 	  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'
          >
            <img
              src={thumbnail}
              alt={title}
              className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300'
            />
            <div className='ml-0 md:ml-16 flex w-full justify-between gap-2 relative'>
              <div>
                <h3 className='capitalize font-medium text-lg'>{title}</h3>
                <div ><span className='text-sm'>Category : </span>
                  <span className='font-semibold'>{category}</span></div>
                <div className=' flex gap-x-2'>
                  <span className='text-gray-500 line-through '>{calculatePriceBeforeDiscount(price, discountPercentage)}</span>
                  <span className='text-black font-bold'>{dollarsAmount}</span>

                </div>
                <Rating rating={rating} />
                <div className='mb-20'></div>
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className='absolute bottom-5    mx-auto btn btn-primary'
                >Details</Link>

              </div>
              <p className='max-w-md  hidden md:block' >{description}</p>





            </div>




          </div>
        );
      })}
    </div>
  );
};
export default ProductsList;
