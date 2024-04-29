import React from 'react'
import { Form } from "antd";
import Button from '../../components/Button';
import { Link } from 'react-router-dom'

function Register() {
  const onFinish = (values) => {
    console.log("Success: ", values);
  }
  return (
    <div className='flex justify-center h-screen items-center bg-primary '>
      <div className='card p-3 w-400 '>
        <h1 className="text-xl mb-1 ">
          STALKER -  REGISTER
        </h1>
        <Form layout='vertical' className='mt-1' onFinish={onFinish}>
          <Form.Item label='Name' name='name' rules={[{ required: true, message: "Please input your name" }]}>
            <input type='text' /></Form.Item>
          <Form.Item label='Email' name='email' rules={[{ required: true, message: "Please input your email" }]}>
            <input type='email' /></Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: "Please input your password" }]}>
            <input type='password' /></Form.Item>
          <div className='flex flex-column mt-2 gap-1'>
            <Button fullWidth title='REGISTER' type='submit' /></div>
          <Link to="/login" className='text-primary'>Έχετε ήδη λογιαριασμό? Login</Link>


        </Form>
      </div>

    </div>
  )
}

export default Register