import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
const RegisterForm = () => {
    return (
        <>
            <Form className='my-4'>
                <Form.Group className='my-2'>
                    <Form.Control type='text' placeholder='Username' name='username' required />
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control type='password' placeholder='Password' name='password' required />
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control type='password' placeholder='Confirm Password' name='confirmPassword' required />
                </Form.Group>
                <Button variant='success' type='submit' className='my-2'>
                    Login
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to='/login'>
                    <Button
                        onClick={() => {
                            Redirect('/login');
                        }}
                        variant='info'
                        size='sm'
                        className='ml-2'>
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
