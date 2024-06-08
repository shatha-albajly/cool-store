import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';
import { useForm } from 'react-hook-form';

const Filters = () => {
  const { categories, meta, params } = useLoaderData();
  console.log("meta, params");
  console.log(meta, params);
  const { search, order, id, title, category, price, discountPercentage, rating, stock, brand } = params;
  console.log(categories)
  const { register, formState: { errors } } = useForm({
    defaultValues: {
      category,
      order
    }
  });


  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      {/* SEARCH */}
      {/* <FormInput
        type='search'
        label='search product'
        name='search'
        size='input-sm'
        defaultValue={search}
        register={register}
        validation={{
          required: 'Search is required',
          minLength: {
            value: 3,
            message: 'Search must be at least 3 characters long'
          }
        }}
        error={errors.search}
      /> */}
      {/* CATEGORIES */}
      <FormSelect
        label='select category'
        name='category'
        list={categories}
        size='select-sm'
        defaultValue={category}
        validation={{
          required: 'Category is required'
        }}
        error={errors.category}
      />

      {/* ORDER */}
      <FormSelect
        label='sort by'
        name='order'
        list={['asc', 'desc']}
        size='select-sm'
        defaultValue={order}
        validation={{
          required: 'Order is required'
        }}
        error={errors.order}
      />

      {/* BUTTONS */}
      <button type='submit' className='btn btn-primary btn-sm'>
        search
      </button>
      <Link to='/products' className='btn btn-accent btn-sm'>
        reset
      </Link>
    </Form>
  );
};
export default Filters;
