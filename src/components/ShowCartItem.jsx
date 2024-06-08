import { formatPrice } from '../utils';

const ShowCartItem = ({ cartItem }) => {


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
                {/* AMOUNT */}
                <p className='font-medium sm:ml-auto my-3'>
                    <span>Amount : {amount}</span>
                </p>

                <div className=' '>
                    {/* PRICE */}
                    <p className='font-medium sm:ml-auto mb-4'>
                        <span>Item Price : </span>{formatPrice(price)}</p>

                    {/* SUBTOTAL */}
                    <p className='font-medium sm:ml-auto'>
                        <span>Subtotal : </span>
                        {formatPrice(price * amount)}</p>
                </div>


            </div>




        </article>
    );
};
export default ShowCartItem;
