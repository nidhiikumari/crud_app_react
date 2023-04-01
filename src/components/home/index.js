import React, { useState } from 'react';
import {
  Layout,
  Modal,
  Typography,
  Space,
  Table,
  Tooltip,
  Button,
  message
} from 'antd';
import { DeleteTwoTone, EyeTwoTone, EditTwoTone, UserAddOutlined } from '@ant-design/icons';
import css from '../common/css';
import Appbar from '../common/header';
import Edit from './edit';
import Add from './add';
import Users from './users';

const { Content } = Layout;
const { Title } = Typography;

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [initialState, setInitialState] = useState({});
  const [id, setId] = useState('');


  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Users Deleted Succesfully',
    });
  };

  // delete popup
  const handleOk = () => {
    var index = Users.map(function (e) {
      return e.id
    }).indexOf(id);
    Users.splice(index, 1);
    success();
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (deleteId) => {
    setIsModalOpen(true);
    setId(deleteId);
  };

  console.log(Users, 'Users');
  // details popup
  const showModalView = (data) => {
    setIsModalViewOpen(true);
    setUserDetails([data]);
  };
  const handleViewOk = () => {
    setIsModalViewOpen(false);
  };
  const handleViewCancel = () => {
    setIsModalViewOpen(false);
  };

  // edit popup
  const handleEdit = (data) => {
    setEditData(data);
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  // add pupup
  const handleAdd = () => {
    setIsAddModalOpen(true);
    setInitialState({
      name: '',
      email: '',
      phone: ''
    });
  }

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "Email",
      width: 150,
    },
    {
      title: 'Phone',
      dataIndex: "Phone",
      width: 200,
    },
    {
      title: 'Actions',
      width: 200,
      render: (text, row) => (
        <Space size="middle">
          <Tooltip title="Details">
            <Button style={css.icons} onClick={() => showModalView(row)}><EyeTwoTone /></Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button style={css.icons} onClick={() => showModal(row.id)}><DeleteTwoTone /></Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button style={css.icons} onClick={() => handleEdit(row)}><EditTwoTone /></Button>
          </Tooltip>
          {/* <Tooltip title="Add">
            <Button style={css.icons} onClick={() => handleAdd()}><UserAddOutlined /></Button>
          </Tooltip> */}
        </Space>
      ),
    }
  ];

  return (
    <div style={css.root}>
      {contextHolder}
      <Layout>
        <Appbar />
      </Layout>
      <Title style={css.crudStyle}>Welcome to Crud App</Title>
      <Content
        style={{ padding: '0 210px' }}
      >
        <Table
          columns={columns}
          dataSource={Users.map((row) => ({
            Name: row.name,
            Email: row.email,
            id: row.id,
            Phone: row.phone
          }))}
          bordered
          style={css.tableStyle}
          pagination={{ pageSize: 12 }}
        />
      </Content>
      <Button style={css.addBtn} onClick={() => handleAdd()}>Add User<UserAddOutlined /></Button>
      <Modal
        title="Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure want to delete ?</p>
      </Modal>

      <Modal
        title="User Details"
        open={isModalViewOpen}
        onOk={handleViewOk}
        footer={null}
        onCancel={handleViewCancel}
      >
        {
          userDetails && userDetails.length > 0 && userDetails.map((list) => (
            <>
              <p><span style={css.textPara}>Id -</span> {list.id}</p>
              <p><span style={css.textPara}>Name -</span> {list.Name}</p>
              <p><span style={css.textPara}>Email -</span> {list.Email}</p>
              <p><span style={css.textPara}>Mobile -</span> {list.Phone}</p>
            </>
          ))
        }
      </Modal>

      <Modal
        title="Update User"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Edit editData={editData} setIsEditModalOpen={setIsEditModalOpen} />
      </Modal>

      <Modal
        title="Add User"
        open={isAddModalOpen}
        onCancel={handleAddCancel}
        footer={null}
      >
        <Add
          setIsAddModalOpen={setIsAddModalOpen}
          isAddModalOpen={isAddModalOpen}
          initialState={initialState}
        />
      </Modal>
    </div>
  )
}

export default Index;