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
    <Form className='bg-base-200 rounded-md px-8 py-4  '>
      <div className='justify-between flex flex-wrap mb-4  '>
        {/*SEARCH */}
        <div className='min-w-[250px] md:w-[450px]'>
          <FormInput
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
          />
        </div>
        <span className='text-center text-lg font-bold mt-0 md:mt-9 mx-1'>or</span>

        {/* CATEGORIES */}
        <div className='min-w-[250px] md:w-[450px] '>
          <FormSelect
            label='select category'
            name='category'
            list={categories}
            size='select-sm'
            register={register}

            defaultValue={category}
            validation={{
              required: 'Category is required'
            }}
            error={errors.category}
          />

        </div>



      </div>
      <div className='mb-6 min-w-[250px] md:w-[450px]'>
        {/* ORDER */}
        <FormSelect
          label='sort by'
          name='order'
          list={['asc', 'desc']}
          size='select-sm'
          register={register}

          defaultValue={order}
          validation={{
            required: 'Order is required'
          }}
          error={errors.order}
        />
      </div>



      {/* BUTTONS */}
      <div className='justify-between block  md:flex w-full     '>


        <button type='submit' className='btn btn-primary min-w-[250px] md:w-[450px] mb-4  '>
          search
        </button>
        <Link to='/products' className='btn btn-accent min-w-[250px] md:w-[450px] mb-4 '>
          reset
        </Link>
      </div>

    </Form >
  );
};
export default Filters;
