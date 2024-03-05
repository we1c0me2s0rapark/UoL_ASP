import './index.css'

import React, { useEffect, useState } from 'react';
import { Button, Input, Empty, Tag } from 'antd';
import { User, Furniture } from '../../type'
import FurnitureItem from '../../components/furniture-item';
import axios from 'axios';
import bannerImg from '../../assets/banner.png'
import coverImg from '../../assets/cover.png'
import { host } from '../../utils';


const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as User)
  const [furnitures, setFurnitures] = useState([] as Furniture[])
  const [searchList, setSearchList] = useState([] as Furniture[])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setUserInfo(uInfo)
    } else {
      window.location.href = '/#/login'
    }
    getFurniture(1)
  }, [])

  const getFurniture = async (type: number) => {
    const { data }: any = await axios.get(`${host}/furniture`)
    if (data.code === 200) {
      const list = data.data.filter((item: Furniture) => item.type === type && item.status === 1)
      setFurnitures(list)
      setSearchList(list)
    }
  }

  const showInfo = (id: number) => {
    window.location.href = '/#/furniture-info?id=' + id
  }

  const handleSwitchType = (type: number) => {
    getFurniture(type)
  }

  const handleSearch = (value: string) => {
    if (value) {
      setSearchList(furnitures.filter((item: Furniture) => item.name.includes(value)))
    } else {
      setSearchList([...furnitures])
    }
  }

  return (
    <div>
      <img src={bannerImg} width='100%' alt="" />
      <div className='type-list'>
        <div className='type-item' onClick={() => handleSwitchType(1)}>Buy</div>
        <div className='type-item' onClick={() => handleSwitchType(2)}>Rent</div>
        <div className='type-item' onClick={() => handleSwitchType(3)}>Recycle</div>
        <div className='type-item' onClick={() => handleSwitchType(4)}>Sale</div>
      </div>
      <div className="c-title" style={{ marginTop: 16 }}>Furniture</div>
      <div className='filter'>
        <label htmlFor="">Search:&nbsp;</label>
        <Input onInput={({ target }: any) => handleSearch(target.value)} style={{ width: 400 }} ></Input>
      </div>
      <div className='furniture-list'>
        {
          searchList.length ?
            <>{searchList.map(item => <FurnitureItem key={item.id} furniture={item} onClick={() => showInfo(item.id)} />)}</>
            : <Empty style={{ marginTop: 16 }} />
        }
      </div>
    </div>
  );
};

export default Home;
