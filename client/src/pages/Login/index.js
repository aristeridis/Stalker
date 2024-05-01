import React from 'react';
import { Form, message } from "antd";
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';

function Register() {
  const navigate=useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token",response.data);
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  return (
    <div className='flex justify-center h-screen items-center bg-primary '>
      <div className='card p-3 w-400 '>
        <h1 className="text-xl mb-1 ">
          STALKER -  LOGIN
        </h1>
        <Form layout='vertical' className='mt-1' onFinish={onFinish}>
          <Form.Item label='Email' name='email' rules={[{ required: true, message: "Please input your email" }]}>
            <input type='email' /></Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: "Please input your password" }]}>
            <input type='password' /></Form.Item>
          <div className='flex flex-column mt-2 gap-1'>
            <Button fullWidth title='LOGIN' type='submit' /></div>
          <Link to="/register" className='text-primary'>Αν δεν έχετε ήδη λογιαριασμό? Register</Link>


        </Form>
      </div>

    </div>
  )
}

export default Register