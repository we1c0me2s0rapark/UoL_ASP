import './index.css'

import React, { useEffect, useState } from 'react';
import { User, Post } from '../../type'
import axios from 'axios';

const host = 'http://localhost:3001'

const PostPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as User)
  const [posts, setPosts] = useState([] as Post[])

  useEffect(() => {
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setUserInfo(uInfo)
    } else {
      window.location.href = '/#/login'
    }

    fetchPost();
  }, [])

  const fetchPost = async () => {
    const { data }: any = await axios.get(`${host}/post`)
    if (data.code === 200) {
      setPosts(data.data)
    }
  }

  const renderContent = (content: string) => {
    if (content) {
      const arr = content.split('\n')
      return arr.map((item: string) => <p key={item}>{item}</p>)
    } else {
      return <></>
    }
  }

  return (
    <div className="p-post">
      {posts.map((p: Post) => <div className='post-item' key={p.id}>
        <p className='title'>{p.title}</p>
        <div>
          {renderContent(p.content)}
        </div>
      </div>)}
    </div >
  );
};

export default PostPage;
