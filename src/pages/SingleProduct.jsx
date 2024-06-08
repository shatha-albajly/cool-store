import { useLoaderData } from 'react-router-dom';
import { formatPrice, customFetch, generateAmountOptions } from '../utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { Rating } from "../components";

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
    async ({ params }) => {
      const response = await queryClient.ensureQueryData(
        singleProductQuery(params.id)
      );
      console.log(response.data);

      return { product: response.data };
    };

const SingleProduct = () => {
  const { product } = useLoaderData();

  function calculatePriceBeforeDiscount(originalPrice, discountPercentage) {
    return formatPrice(originalPrice * (100 / (100 - discountPercentage)));
  }
  const { id, title, description, category, price, discountPercentage, rating, stock, tags, brand, thumbnail, images } =
    product;
  console.log("stop");
  console.log(product);

  const dollarsAmount = formatPrice(price);
  const [amount, setAmount] = useState(1);
  const [mainImage, setMainImage] = useState(thumbnail);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: id,
    productID: id,
    title,
    price,
    discountPercentage,
    stock,
    brand,
    thumbnail,
    amount
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <section>
      <div className='text-md breadcrumbs'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE */}
        <div>
          <img
            src={mainImage}
            alt={title}
            className='w-96 h-96 object-cover rounded-lg lg:w-full'
          />

          <div className='flex flex-wrap w-96 mt-2 '>
            {
              images.map((image) => {
                return (
                  <img
                    key={image}
                    src={image}
                    alt={title}
                    className='w-20 h-20 object-cover border-2 mb-2 rounded-lg mr-2 cursor-pointer'
                    onClick={() => handleImageClick(image)}
                  />
                );
              })
            }
          </div>
        </div>
        {/* PRODUCT */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl  font-bold mt-2'>
            <span className='text-neutral-content'>Category : </span>
            {category}
          </h4>          <h4 className='text-xl  font-bold mt-2'>
            <span className='text-neutral-content'>Brand : </span>
            {brand}
          </h4>

          {/* RATING */}
          <div className='mt-4'> <Rating rating={rating} /></div>

          <div className=' mt-2 flex gap-x-2'>
            <span className='text-gray-500 line-through '>{calculatePriceBeforeDiscount(price, discountPercentage)}</span>
            <span className='text-black font-bold'>{dollarsAmount}</span>

          </div>
          {/* <p className='mt-3 text-xl'>{dollarsAmount}</p> */}
          <p className='mt-2 leading-8'>{description}</p>

          {/* tags */}
          {tags.map((tag) => (
            <span
              key={tag}
              className='badge badge-secondary badge-outline mt-4 mb-2 mr-2'
            >
              {tag}
            </span>
          ))}

          {/* AMOUNT */}
          <div className='form-control w-full max-w-xs'>
            <label className='label' htmlFor='amount'>
              <h4 className='text-md font-medium -tracking-wider capitalize'>
                amount
              </h4>
            </label>

            {/* AMOUNT INPUT */}
            {stock ?
              <select
                className='select select-secondary select-bordered select-md'
                id='amount'
                value={amount}
                onChange={handleAmount}
              >
                {generateAmountOptions(stock)}
              </select> : <p>Out of Stock</p>}
          </div>
          {/* CART BTN */}
          {stock &&
            <div className='mt-10'>
              <button className='btn btn-secondary btn-md' onClick={addToCart}>
                Add to cart
              </button>
            </div>
          }
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
