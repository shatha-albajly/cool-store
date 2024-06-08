import { formatPrice, generateAmountOptions } from '../utils';
import { removeItem, editItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }));
  };


  const handleAmount = (e) => {
    dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  };

  const { cartID, title, price, thumbnail, amount, brand } =
    cartItem;

  return (
    <article
      key={cartID}
      className='mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0'
    >
      {/* IMAGE */}
      <img
        src={thumbnail}
        alt={title}
        className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover'
      />
      {/* INFO */}
      <div className='sm:ml-16 sm:w-48'>
        {/* TITLE */}
        <h3 className='capitalize font-medium'>{title}</h3>

        {/* brand */}
        {brand &&
          <p className='mt-4 text-sm capitalize flex items-center gap-x-2'>
            brand :{brand}

          </p>
        }
      </div>
      <div className='sm:ml-12'>
        {/* AMOUNT */}
        <div className='form-control max-w-xs'>
          <label htmlFor='amount' className='label p-0'>
            <span className='label-text'>Amount</span>
          </label>
          <select
            name='amount'
            id='amount'
            className='mt-2 select select-base select-bordered select-xs'
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(amount + 5)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className='mt-2 link link-primary link-hover text-sm'
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>

      <div className='md:ml-6 '>
        {/* PRICE */}
        <p className='font-medium sm:ml-auto mb-4'>
          <span>Item Price : </span>{formatPrice(price)}</p>

        {/* SUBTOTAL */}
        <p className='font-medium sm:ml-auto'>
          <span>Subtotal : </span>
          {formatPrice(price * amount)}</p>

      </div>




    </article>
  );
};
export default CartItem;
