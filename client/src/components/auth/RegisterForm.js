import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';
const RegisterForm = () => {
    // Context
    const { registerUser } = useContext(AuthContext);

    // local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [alert, setAlert] = useState(null);

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = event =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });

    const register = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' });
            setTimeout(() => setAlert(null), 5000);
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            if (registerData.data.success) {
                // history.push('/dashboard');
            } else {
                setAlert({ type: 'danger', message: registerData.message });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form className='my-4' onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className='my-2'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={username}
                        onChange={onChangeRegisterForm}
                        required
                    />
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChangeRegisterForm}
                        required
                    />
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                        required
                    />
                </Form.Group>
                <Button variant='success' type='submit' className='my-2'>
                    Register
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
