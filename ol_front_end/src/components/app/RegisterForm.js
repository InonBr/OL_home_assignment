import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { registerApi } from '../../lib/api';
import '../styles/forms.css';

const RegisterForm = (props) => {
  // const cookies = new Cookies();

  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef('');
  password.current = watch('password', '');

  const onSubmit = (data) => {
    console.log(data);
    registerApi(data)
      .then((response) => {
        console.log(response);
        // cookies.set('userToken', response.data.token);
        // props.closeModal();
      })
      .catch((error) => {
        console.log(data);
        // const errorMessage = error.response.data.message;
        // if (errorMessage.includes('duplicate')) {
        //   setShowError(true);
        // }
      });
  };

  const errMessageToShow = () => {
    return (
      <Form.Group>
        <Form.Label className='red-text center-text' column='lg'>
          User already exists!
        </Form.Label>
      </Form.Group>
    );
  };

  return (
    <Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='firstName'>First Name</Form.Label>
        <Form.Control
          id='firstName'
          aria-invalid={errors.firstName ? 'true' : 'false'}
          {...register('firstName', { required: true })}
          type='text'
          placeholder='First Name'
        />

        {errors.firstName && errors.firstName.type === 'required' && (
          <Form.Text className='red-text' role='alert'>
            First name is required
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
        <Form.Control
          id='lastName'
          aria-invalid={errors.lastName ? 'true' : 'false'}
          {...register('lastName', { required: true })}
          type='text'
          placeholder='Last Name'
        />

        {errors.lastName && errors.lastName.type === 'required' && (
          <Form.Text className='red-text' role='alert'>
            Last name is required
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='email'>Email address</Form.Label>
        <Form.Control
          id='email'
          type='text'
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
          placeholder='Enter email'
        />

        {errors.email && (
          <Form.Text className='red-text' role='alert'>
            {errors.email.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='password'>Password</Form.Label>

        <Form.Control
          id='password'
          name='password'
          type='password'
          {...register('password', {
            required: 'You must specify a password',
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters',
            },
          })}
          placeholder='password'
        />

        {errors.password && (
          <Form.Text className='red-text' role='alert'>
            {errors.password.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='password'>Confirm Password</Form.Label>
        <Form.Control
          id='passwordConfirm'
          name='passwordConfirm'
          type='password'
          {...register('passwordConfirm', {
            validate: (value) =>
              value === password.current || 'The passwords do not match',
          })}
          placeholder='Confirm Password'
        />

        {errors.passwordConfirm && (
          <Form.Text className='red-text' role='alert'>
            {errors.passwordConfirm.message}
          </Form.Text>
        )}
      </Form.Group>

      {showError && errMessageToShow()}

      <Button variant='primary' type='submit' className='mt-3'>
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
