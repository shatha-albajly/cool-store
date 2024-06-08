import axios from 'axios';

const productionUrl = 'https://dummyjson.com';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(100 * (price / 100).toFixed(2));
  return dollarsAmount;
};

export const generateAmountOptions = (number) => {
  console.log(number)
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
