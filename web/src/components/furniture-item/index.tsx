import './index.css'

import React from 'react';
import { Furniture } from '../../type'
import { Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

interface Props {
  furniture: Furniture,
  manage?: boolean,
  onEdit?: any
  onDelete?: any
  onClick?: any
}

const statusMap = ['', 'Purchased', 'Used', 'Given Away']
const FurnitureItem: React.FC<Props> = ({ furniture, manage, onEdit = () => { }, onDelete = () => { }, onClick = () => { } }) => {
  return (
    <div className="c-furniture-item" onClick={onClick}>
      <div className="cover" style={{ backgroundImage: `url(http://localhost:3001/${furniture.image})` }}></div>
      <div className='info'>
        <div className='title ellipsis'>{furniture.name}</div>
        <div className="desc ellipsis">{furniture.description}</div>
        {/* <Tag className='status' color="#f50">{statusMap[Number(furniture.status)]}</Tag> */}
        <Tag className='date' color="#ffc107">2024-02-29</Tag>
      </div>

      {
        manage ? <div className='icon-wrap' onClick={(e) => {
          e.stopPropagation()
        }}>
          <EditOutlined style={{ marginRight: 12, cursor: 'pointer' }} onClick={() => {
            onEdit(furniture)
          }} />
          <Popconfirm
            title="Delete the furniture"
            description="Are you sure to delete this furniture?"
            onConfirm={() => {
              onDelete(furniture)
            }}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ cursor: 'pointer' }} />
          </Popconfirm>
        </div> : <></>
      }


    </div>
  );
};

export default FurnitureItem;
