import './index.css'

import React, { useEffect, useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  message
} from 'antd';
import { User } from '../../type'
import { host } from '../../utils';
import axios from 'axios';

const Self: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as User)
  const [editInfo, setEditInfo] = useState({} as User)

  useEffect(() => {
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setEditInfo({ ...uInfo })
      setUserInfo(uInfo)
    } else {
      window.location.href = '/#/login'
    }
  }, [])

  const handleSubmit = async () => {
    if (editInfo.username) {
      const u: User = {
        id: editInfo.id,
        email: editInfo.email,
        username: editInfo.username,
        password: editInfo.password || userInfo.password
      }
      const { data } = await axios.put(`${host}/user`, u)
      if (data.code === 200) {
        message.success('success')
        window.localStorage.setItem('userInfo', JSON.stringify(u))
        window.location.reload()
      } else {
        message.warning('error')
      }
    }
  }

  return (
    <div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="email">
          <Input value={editInfo.email} disabled />
        </Form.Item>
        <Form.Item label="username">
          <Input value={editInfo.username} onInput={({ target }: any) => {
            setEditInfo({
              ...editInfo,
              username: target.value
            })
          }} />
        </Form.Item>
        <Form.Item label="password">
          <Input type='password' value={editInfo.password} onInput={({ target }: any) => {
            setEditInfo({
              ...editInfo,
              password: target.value
            })
          }} />
        </Form.Item>
        <Form.Item label="password confirm">
          <Input type='password' />
        </Form.Item>
        <Form.Item label="Submit">
          <Button onClick={handleSubmit}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Self;
