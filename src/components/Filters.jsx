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
      <div className='grid  grid-cols-1 md:grid-cols-2 gap-4 mb-4 '>


        {/* CATEGORIES */}
        <div className=' '>
          <FormSelect
            label='select category'
            name='category'
            list={categories}
            size='select'
            register={register}

            defaultValue={category}
            validation={{
              required: 'Category is required'
            }}
            error={errors.category}
          />

        </div>
        <div className=' '>

          <FormSelect
            label='sort by'
            name='order'
            list={['asc', 'desc']}
            size='select'
            register={register}

            defaultValue={order}
            validation={{
              required: 'Order is required'
            }}
            error={errors.order}
          />
        </div>



      </div>




      {/* BUTTONS */}
      <div className='grid  grid-cols-1 md:grid-cols-2 gap-4      '>


        <button type='submit' className='btn btn-primary mb-4 '>
          search
        </button>
        <Link to='/products' className='btn btn-accent mb-4 '>
          reset
        </Link>
      </div>

    </Form >
  );
};
export default Filters;
