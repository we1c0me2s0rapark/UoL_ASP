import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, message, Upload, DatePicker } from 'antd';
import moment from 'moment';
import { Furniture, User } from '../../type'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import axios from 'axios'
import { host, typeMap } from '../../utils';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface FurnitureFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (furniture: Furniture) => void;
  furniture?: Furniture; // 当前编辑的任务, 如果没有，则表示是创建新任务
}

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const FurnitureFormModal: React.FC<FurnitureFormModalProps> = ({ visible, onClose, onSubmit, furniture }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [userInfo, setUserInfo] = useState({} as User)

  useEffect(() => {
    if (furniture) {
      form.setFieldsValue({
        ...furniture,
      });
    } else {
      form.resetFields();
    }
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setUserInfo(uInfo)
    }
  }, [furniture, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        id: furniture?.id,
      });
      onClose();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      form.setFieldsValue({
        ...furniture,
        image: info.file.response
      });
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Modal title={furniture ? 'Edit Furniture' : 'Create Furniture'} visible={visible} onOk={handleOk} onCancel={onClose} footer={[
      <Button key="back" onClick={onClose}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={handleOk}>
        Submit
      </Button>,
    ]}>
      <Form form={form} layout="vertical" initialValues={{ classify_id: '', status: '1' }}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please input the image!' }]}>
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:3001/furniture/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the type!' }]}>
          <Select>
            {typeMap.map((item, index) => {
              if (item) {
                return <Select.Option key={item} value={index}>{item}</Select.Option>
              } else {
                return <></>
              }
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FurnitureFormModal;
