import React, { useState, useEffect } from 'react';
import { Layout, Input, Typography, message } from 'antd';
import css from '../common/css';
import Users from './users';

const { Title } = Typography;

const Edit = ({ editData, setIsEditModalOpen }) => {

  const initialState = {
    name: editData.Name,
    email: editData.Email,
    phone: editData.Phone
  };

  const [formValue, setFormValue] = useState(initialState);
  const [messageApi, contextHolder] = message.useMessage();

  var index = Users.map(function (e) {
    return e.id
  }).indexOf(editData.id);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Users Updated Succesfully',
    });
  };

  const { name, email, phone } = formValue;
  const submitHandle = (e) => {
    e.preventDefault();
    let a = Users[index];
    if (name && email && phone) {
      a.name = name;
      a.email = email;
      a.phone = phone;
      success();
      setTimeout(() => {
        setIsEditModalOpen(false);
      }, 2000)
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

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
            value={name || ''}
            onChange={onInputChange}
            placeholder="username"
            required
          />
          <Title style={css.inputTitle} level={5}>Email</Title>
          <Input
            style={css.userInput}
            type='email'
            name='email'
            value={email || ''}
            onChange={onInputChange}
            placeholder="useremail"
            required
          />
          <Title style={css.inputTitle} level={5}>Mobile</Title>
          <Input
            style={css.userInput}
            type='number'
            name='phone'
            value={phone || ''}
            onChange={onInputChange}
            placeholder="Mobile"
            required
          />
          <button style={css.submitBtn} type="submit">Update</button>
        </form>
      </Layout>
    </div>
  )
}

export default Edit;