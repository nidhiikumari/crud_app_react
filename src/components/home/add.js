import React, { useState, useEffect } from 'react';
import { Layout, Input, Typography, message } from 'antd';
import css from '../common/css';
import Users from './users'

const { Title } = Typography;

const Add = ({ setIsAddModalOpen, isAddModalOpen, initialState }) => {
  const [formValue, setFormValue] = useState(initialState);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Added Successfully',
    });
  };
  console.log(formValue);
  console.log(initialState, 'initialState')

  const { name, email, phone } = formValue;

  const submitHandle = (e) => {
    e.preventDefault();
    if (name && email && phone) {
      Users.push({ ...formValue, id: Users[Users.length - 1].id + 1 })
      success();
      setTimeout(() => {
        setIsAddModalOpen(false);
      }, 2000);
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  console.log(isAddModalOpen, 'isAddModalOpen');

  useEffect(() => {
    setFormValue(initialState);
  }, [initialState]);

  return (
    <div>
      {contextHolder}
      <Layout style={css.addUserBox}>
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