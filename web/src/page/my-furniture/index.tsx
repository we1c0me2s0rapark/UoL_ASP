import './index.css'

import React, { useEffect, useState } from 'react';
import { Button, Empty } from 'antd';
import { User, Furniture } from '../../type'
import FurnitureItem from '../../components/furniture-item';
import FurnitureFormModal from '../../components/furniture-form-modal';
import axios from 'axios';
import { host } from '../../utils';
import moment from 'moment';

const MyFurniture: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as User)
  const [furnitures, setFurniture] = useState([] as Furniture[])

  useEffect(() => {
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setUserInfo(uInfo)
      getFurniture(uInfo)
    } else {
      window.location.href = '/#/login'
    }
  }, [])

  const getFurniture = async (uInfo: User) => {
    const { data }: any = await axios.get(`${host}/furniture`)
    if (data.code === 200) {
      setFurniture(data.data.filter((item: Furniture) => item.user_id === uInfo.id))
    }
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFurniture, setCurrentFurniture] = useState({} as Furniture | undefined);

  const handleOpenNewFurnitureModal = () => {
    setCurrentFurniture(undefined);
    setIsModalVisible(true);
  };

  const handleEditFurniture = (furniture: Furniture) => {
    setCurrentFurniture(furniture);
    setIsModalVisible(true);
  };

  const handleDelete = async (furniture: Furniture) => {
    await axios.delete(`${host}/furniture/${furniture.id}`)
    getFurniture(userInfo)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmitFurniture = async (furniture: Furniture) => {
    if (furniture.id) { // 编辑
      await axios.put(`${host}/furniture`, furniture)
    } else { // 新增
      await axios.post(`${host}/furniture`, {
        ...furniture,
        user_id: userInfo.id,
        create_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        status: 1
      })
    }
    getFurniture(userInfo)
    setIsModalVisible(false);
  };

  const showInfo = () => {
  }

  return (
    <div>
      <Button onClick={handleOpenNewFurnitureModal}>Create New Furniture</Button>
      <div className='furniture-list'>
        {
          furnitures.length ?
            <>{furnitures.map((item: Furniture) => <FurnitureItem key={item.id} manage furniture={item} onEdit={handleEditFurniture} onDelete={handleDelete} onClick={showInfo} />)}</>
            : <Empty style={{ marginTop: 16 }} />
        }
      </div>
      <FurnitureFormModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitFurniture}
        furniture={currentFurniture}
      />
    </div>
  );
};

export default MyFurniture;
