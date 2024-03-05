import './index.css'

import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { User, Message } from '../../type'
import { UserOutlined } from '@ant-design/icons';
import { host } from '../../utils';
import axios from 'axios';
import moment from 'moment';

const { TextArea } = Input;

interface Group {
  targetId: number
  name: string
  time: string
  msgs: Message[]
}

let timerId: any;

const MessagePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as User)
  const [groups, setGroups] = useState([] as Group[])
  const [current, setCurrent] = useState(0)
  const [msgText, setMsgText] = useState('')

  useEffect(() => {
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setUserInfo(uInfo)
      fetchMessage(uInfo)
      timerId = setInterval(() => {
        fetchMessage(uInfo)
      }, 1000)
    } else {
      window.location.href = '/#/login'
    }

    return () => {
      timerId && clearInterval(timerId)
    }
  }, [])

  const fetchMessage = async (uInfo: User) => {
    const { data } = await axios.get(`${host}/message`)
    if (data.code === 200) {

      let list: Message[] = data.data.filter((item: Message) => item.send_id === uInfo.id || item.receive_id === uInfo.id)
      const gs = []
      for (let i = 0; i < list.length; i++) {
        const msg: Message = list[i]
        const targetId = msg.send_id === uInfo.id ? msg.receive_id : msg.send_id
        const index = gs.findIndex(item => item.targetId === targetId)
        if (index !== -1) {
          gs[index].msgs.push(msg)
          gs[index].time = msg.create_time
        } else {
          gs.push({
            targetId,
            name: msg.username,
            time: msg.create_time,
            msgs: [msg]
          })
        }
      }
      setGroups(gs)
    }
  }

  const handleSend = async () => {
    if (msgText) {
      await axios.post(`${host}/message`, {
        content: msgText,
        send_id: userInfo.id,
        receive_id: groups[current].targetId,
        create_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      })
      setMsgText('')
    }
  }

  return (
    <div className="p-message">
      <div className="left">
        <div className="message-header">
          <div className="c-title" style={{ marginBottom: 16 }}>Message</div>
          <div className="channel-list">
            {
              groups.map((g, index) => (
                <div className="channel-item" key={g.targetId}>
                  <UserOutlined style={{ marginRight: 12 }} />
                  <div>
                    <div>message window {index + 1}</div>
                    <div style={{ color: '#888', fontSize: 12 }}>{g.time}</div>
                  </div>
                </div>
              ))
            }
          </div >
        </div >
      </div >
      <div className="right">
        <div style={{ height: 560 }}>
          {
            groups.length && groups[current].msgs.map((msg, index) => (
              <div className={msg.send_id === userInfo.id ? 'mr' : 'ml'} key={msg.content}>
                <div className="message-item">{msg.content}</div>
              </div>
            ))
          }
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextArea value={msgText} onInput={({ target }: any) => setMsgText(target.value)} rows={4} placeholder="input message" />
          <Button style={{ marginLeft: 12 }} onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div >
  );
};

export default MessagePage;
