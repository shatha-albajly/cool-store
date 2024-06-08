import { FormInput, SubmitBtn } from '../components';
import { Form, redirect, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

export const action =
  (store) =>
    async ({ request }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);

      try {
        const response = await customFetch.post('/auth/login', data);
        store.dispatch(loginUser(response.data));
        toast.success('logged in successfully');
        return redirect('/');
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error?.message ||
          'please double check your credentials';
        toast.error(errorMessage);
        return null;
      }
    };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/login', {
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 6000
      });
      dispatch(loginUser(response.data));
      toast.success('welcome guest user');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('guest user login error. please try again');
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await customFetch.post('/auth/login', data);
      dispatch(loginUser(response.data));
      toast.success('logged in successfully');
      navigate('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials';
      toast.error(errorMessage);
    }
  };

  return (
    <section className='h-screen grid place-items-center'>
      <Form method='post'
        onSubmit={handleSubmit(onSubmit)}
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput
          type='text'
          label='username'
          name='username'
          register={register}
          validation={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters long',
            },
          }}
          error={errors.username}
        />
        <FormInput
          type='password'
          label='password'
          name='password'
          register={register}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }}
          error={errors.password}
        />
        <div className='mt-4'>
          <SubmitBtn text='login' />
        </div>
        <button
          type='button'
          className='btn btn-secondary btn-block'
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
      </Form>
    </section>
  );
};
export default Login;
