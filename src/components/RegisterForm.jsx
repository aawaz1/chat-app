import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const RegisterForm = () => {
  const router = useRouter();
  return (
    <div className='bg-white w-full md:w-[400px] border-[3px] border-blue-600 rounded-xl p-2 md:p-6  shadow-lg md:max-w-sm md:mx-auto md:mt-20'>
      
      <h1 className='text-2xl font-bold text-blue-600 mb-6'>Chat Verse</h1>
      <h1 className='text-lg font-bold text-blue-600 mb-3'>Register</h1>
      <Formik
        initialValues={{ fullName: '', phoneNumber: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          toast.success("Logged In Successfully")
          setTimeout(() => {
            router.push('/auth/login');
            
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form className='space-y-4'>
            <div>
              <label htmlFor='fullName' className='block text-sm font-medium text-gray-700'>Full Name</label>
              <Field
                type='text'
                id='fullName'
                name='fullName'
                placeholder='Enter your full name'
                className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <ErrorMessage name='fullName' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700'>Phone Number</label>
              <Field
                type='text'
                id='phoneNumber'
                name='phoneNumber'
                placeholder='Enter your phone number'
                className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <ErrorMessage name='phoneNumber' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <ErrorMessage name='email' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
              <Field
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
                className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <ErrorMessage name='password' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300'
              disabled={isSubmitting}
            >
              {isSubmitting ? (<div className='flex justify-center items-center'> <ClipLoader
                      color='#ffffff'
                      loading={true}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    /></div>) : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
      <p className='text-sm text-center text-gray-600 mt-4'>Already have an account? <Link href='/auth/login' className='text-blue-600 hover:underline'>Log In</Link></p>
    </div>
  );
};

export default RegisterForm;
