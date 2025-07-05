import React from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { RegisterUser } from '../../api/users';
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    values.isAdmin = values.isAdmin === 'Admin' ? true : false;
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success("user Created Successfully");
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  const goToLogin = () => {
    navigate("/login");
  }

  return (
  <header className="App-header">
    <main className="main-area mw-500">
      <section className="header-section">
        <h1>
          Create an account with BookMyShow
        </h1>
      </section>
      <section className="form-section">
        <Form
            layout='vertical'
            onFinish={onFinish}
        >
          <Form.Item
            label="name"
            htmlFor="name"
            name="name"
            className="d-block"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input
              id="name"
              type="text"
              placeholder="Enter your Name"
            ></Input>
          </Form.Item>
          <Form.Item
            label="Email"
            htmlFor="email"
            name="email"
            className="d-block"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input
              id="email"
              type="text"
              placeholder="Enter your Email"
            ></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            htmlFor="password"
            name="password"
            className="d-block"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input
              id="password"
              type="password"
              placeholder="Enter your Password"

            ></Input>
          </Form.Item>
          <Form.Item 
            label="Admin User"
            name="isAdmin"
            rules={[{ required: true, message: "Select the user type"}]}
          >
            <Radio.Group>
              <Radio value="Admin"> Yes </Radio>
              <Radio value="User"> No </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item className="d-block">
            <Button
              type="primary"
              block
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </section>
      <section className='register-section'>
          <Button type="primary" onClick={goToLogin}>
            Back To Login
          </Button>
      </section>
    </main>
  </header>
  )
}

export default Register;