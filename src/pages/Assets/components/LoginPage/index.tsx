import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import { pick } from 'lodash';
import { useState } from 'react';
import { request } from 'umi';
import styles from './index.less';

const LoginPage = ({ setToken, setIsLoggedIn }) => {
  const onFinish = (values: any) => {
    request('/api/v1/server/login', {
      method: 'post',
      data: pick(values, ['username', 'password']),
    })
      .then((response) => {
        setToken(response.data.token);
        // TODO: when to and not to remember?
        if (values.remember) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        setIsLoggedIn(true);
      })
      .catch((error) => message.error(error.message));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h1>Assets</h1>
      <Card className={styles.container}>
        <Form
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
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

          <Form.Item name="remember" valuePropName="checked" className={styles.remember}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item className={styles.btn}>
            <Button type="primary" htmlType="submit" className={styles.btn}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default LoginPage;
