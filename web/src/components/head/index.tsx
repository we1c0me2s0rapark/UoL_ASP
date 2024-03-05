import React, { useState, useEffect } from 'react'
import './index.css';
import { User } from '../../type/index'
import { Button } from 'antd';

const Head: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as User);

  useEffect(() => {
    const uinfo = window.localStorage.getItem('userInfo')
    if (uinfo) {
      setUserInfo(JSON.parse(uinfo))
    }
  }, [])

  const toHome = () => {
    window.location.href = '/#/'
  }

  const logout = () => {
    window.localStorage.removeItem('userInfo')
    window.location.reload()
  }

  return (
    <div className="header">
      <div className="content">
        <div className="logo" onClick={() => { toHome() }} >Furniture Recycling market</div>
        {
          !userInfo.id ? (
            <Button type="link" href='/#/login'>Login</Button>
          ) : (
            <div className='action'>
              <Button type="link" href='/#/article'>Article</Button>
              <Button type="link" href='/#/my-furniture'>My Furniture</Button>
              <Button type="link" href='/#/message'>Message</Button>
              <Button type="link" href='/#/self'>{userInfo.username}</Button>
              <span onClick={() => { logout() }}>Logout</span>
            </div>
          )
        }
      </div>
    </div>
  )
}
export default Head