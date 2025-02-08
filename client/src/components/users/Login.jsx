import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import '../../styles/Login.css';
import MediTrackerLogo from '../../images/MediTracker.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx'; // Add this line

const Login = () => {
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = (values) => {
        const payload = {
            email: values.email,
            password: values.password,
        };

        axios.post('http://localhost:8000/api/login', payload, { withCredentials: true })
            .then(res => {
                setErrors(null);
                login(res.data.user);

                if (res.data.user.role === 'administrator') {
                    navigate('/adminDashboard/home');
                } else {
                    navigate('/practDashboard');
                }
            })
            .catch(err => {
                console.error("Login error:", err.response ? err.response.data.message : err.message); // More detailed error logging
                setErrors(err.response ? err.response.data.message : "An error occurred during login."); // Set error message for the user.  Provide a user-friendly message, not necessarily the raw error.
            });
    };

    return (
        <div className="login-wrapper">
        <div className="login-container">
            <img src={MediTrackerLogo} alt="Logo" className="login-image" />
            
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="login-form"
            >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Login
                </Button>
            </Form.Item>
            </Form>
            {errors && <Alert description={errors} type="error" />}
        </div>

        </div>
    );
};

export default Login;
