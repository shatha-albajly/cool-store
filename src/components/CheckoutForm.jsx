import { useForm } from 'react-hook-form';
import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import ShowCartItem from './ShowCartItem';
import CartTotals from './CartTotals';
import { isValid, parse } from 'date-fns';

export const action =
  (store, queryClient) =>
    async ({ request }) => {
      const formData = await request.formData();
      const { name, address, cardNumber, expiryDate, cvv } = Object.fromEntries(formData);
      const user = store.getState().userState.user;
      const { cartItems, orderTotal, numItemsInCart } =
        store.getState().cartState;

      const info = {
        name,
        address,
        chargeTotal: orderTotal,
        orderTotal: formatPrice(orderTotal),
        cartItems,
        numItemsInCart,
        payment: {
          cardNumber,
          expiryDate,
          cvv,
        },
      };

      try {
        // queryClient.removeQueries(['orders']);
        // store.dispatch(clearCart());
        return toast.success('order placed successfully');
        // return redirect('/');
      } catch (error) {
        console.log(error);
        toast.error('There was an error placing your order');
        if (error?.response?.status === 401 || 403) return redirect('/login');
        return null;
      }
    };

const CheckoutForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const cartItems = useSelector((state) => state.cartState.cartItems);

  const onSubmit = async (data) => {
    console.log(data);
    // Handle form submission, you can call your action here
  };


  const validateExpiryDate = (value) => {
    const parsedDate = parse(value, 'MM/yy', new Date());
    return isValid(parsedDate) || 'Invalid expiry date';
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} method='post' className='flex flex-col gap-y-4'>
        <h4 className='font-medium text-xl capitalize'>shipping information</h4>
        <FormInput
          label='full name'
          name='name'
          type='text'
          register={register}
          validation={{ required: 'Full name is required' }}
          error={errors.name}
        />
        <FormInput
          label='address'
          name='address'
          type='text'
          register={register}
          validation={{ required: 'Address is required' }}
          error={errors.address}
        />

        <h4 className='font-medium text-xl capitalize'>payment information</h4>
        <FormInput
          label='credit card number'
          name='cardNumber'
          type='text'
          register={register}
          validation={{
            required: 'Card number is required',
            pattern: {
              value: /^[0-9]{16}$/,
              message: 'Invalid card number',
            },
          }}
          error={errors.cardNumber}
        />
        <FormInput
          label='expiry date (MM/YY)'
          name='expiryDate'
          type='text'
          register={register}
          validation={{
            required: 'Expiry date is required',
            validate: validateExpiryDate,
          }}
          error={errors.expiryDate}
        />
        <FormInput
          label='cvv'
          name='cvv'
          type='text'
          register={register}
          validation={{
            required: 'CVV is required',
            pattern: {
              value: /^[0-9]{3,4}$/,
              message: 'Invalid CVV',
            },
          }}
          error={errors.cvv}
        />

        <div className='mt-4'>
          <SubmitBtn text='place your order' />
        </div>
      </Form>
      <div>
        <div className='mb-7'> <CartTotals /></div>
        {cartItems.map((item) => (
          <ShowCartItem key={item.cartID} cartItem={item} />
        ))}
      </div>
    </>
  );
};
export default CheckoutForm;
