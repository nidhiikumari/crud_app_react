import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Layout, Input, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import css from '../common/css';
import Appbar from '../common/header';

const { Title } = Typography;

const Add = () => {
  const initialState = {
    name: '',
    email: '',
    phone: ''
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const [messageApi, contextHolder] = message.useMessage();

  const user  = useSelector((state) => state);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Added Successfully',
    });
  };

  const { name, email, phone } = formValue;

  const Data = {
    id: user[user.length - 1].id + 1,
    name,
    email,
    phone
  }

  const submitHandle = (e) => {
    e.preventDefault();
    if (name && email && phone) {
      dispatch({ type: "ADD_USER", payload: Data });
      success();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  return (
    <div>
      <Appbar />
      <Layout style={css.addUserBox}>
        <Title>Add User</Title>
        <form onSubmit={submitHandle}>
          <Title style={css.inputTitle} level={5}>Username</Title>
          <Input
            style={css.userInput}
            type='text'
            name='name'
            value={name}
            onChange={onInputChange}
            placeholder="username"
            required
          />
          <Title style={css.inputTitle} level={5}>Email</Title>
          <Input
            style={css.userInput}
            type='email'
            name='email'
            value={email}
            onChange={onInputChange}
            placeholder="useremail"
            required
          />
          <Title style={css.inputTitle} level={5}>Mobile</Title>
          <Input
            style={css.userInput}
            type='number'
            name='phone'
            value={phone}
            onChange={onInputChange}
            placeholder="Mobile"
            required
          />
          <button style={css.submitBtn} type="submit">Save</button>
        </form>
      </Layout>
    </div>
  )
};

export default Add;