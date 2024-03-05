import './index.css'

import React, { useEffect, useState } from 'react';
import { Input, Button, message } from 'antd';
import { User, Furniture, Comment } from '../../type'
import coverImg from '../../assets/cover.png'
import axios from 'axios'
import { host, typeMap } from '../../utils';
import moment from 'moment';

const FurnitureInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as User)
  const [furnitureData, setFurnitureData] = useState({} as Furniture)
  const [comments, setComments] = useState([] as Comment[])
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setUserInfo(uInfo)

      // hash
      const arr = window.location.hash.split('?id=')
      fetchFurniture(arr[1])
      fetchComment(arr[1])
    } else {
      window.location.href = '/#/login'
    }
  }, [])

  const fetchFurniture = async (id: string) => {
    const { data }: any = await axios.get(`${host}/furniture/${id}`)
    if (data.code === 200) {
      setFurnitureData(data.data)
    }
  }

  const fetchComment = async (f_id: string) => {
    const { data }: any = await axios.get(`${host}/comment/${f_id}`)
    if (data.code === 200) {
      setComments(data.data)
    }
  }

  const renderDescription = () => {
    if (furnitureData.description) {
      const arr = furnitureData.description.split('\n')
      return arr.map((item: string) => <p key={item}>{item}</p>)
    } else {
      return <></>
    }
  }

  const handleSubmit = async () => {
    if (commentText) {
      const { data }: any = await axios.post(`${host}/comment`, {
        user_id: userInfo.id,
        furniture_id: furnitureData.id,
        content: commentText,
        create_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      })
      if (data.code === 200) {
        fetchComment(furnitureData.id.toString())
      }
    }
  }

  const handleContact = async () => {
    if (userInfo.id !== furnitureData.user_id) {
      await axios.post(`${host}/message`, {
        content: 'hello',
        send_id: userInfo.id,
        receive_id: furnitureData.user_id,
        create_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      })
      window.location.href = '/#/message'
    } else {
      message.warning('Unable to send messages to oneself')
    }
  }

  return (
    <div>
      <div className="furniture-info">
        <div className="info">
          {/* <img src={furnitureData.image} alt="" /> */}
          <img src={coverImg} alt="" />
          <div>
            <h1>
              <span>{furnitureData.name}</span>
            </h1>
            <p style={{ margin: '8px 0' }}>{typeMap[furnitureData.type]}</p>
            <p className="desc">{furnitureData.create_time}</p>
            <Button onClick={handleContact} style={{ marginTop: 12 }}>Contact</Button>
          </div>
        </div>
        <div className="descript">
          <div className="c-title" style={{ margin: '16px 0' }}>Descript</div>
          {renderDescription()}
          {/* <img src={furnitureData.image} alt="" /> */}
          <img width={600} src={coverImg} alt="" />
        </div>
        <div className="comment-list">
          <div className="c-title" style={{ marginBottom: 16 }}>Comment</div>
          <div className="comment-input">
            <Input value={commentText} style={{ width: 200 }} onInput={({ target }: any) => { setCommentText(target.value) }}></Input>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
          {
            comments.map((c: Comment) => <div className="comment-item" key={c.content}>
              <div className="name">
                <img src={coverImg} alt="" />
                <span>{c.username}</span>
              </div>
              <div className="content">{c.content}</div>
              <div className="time">{c.create_time}</div>
            </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default FurnitureInfo;
