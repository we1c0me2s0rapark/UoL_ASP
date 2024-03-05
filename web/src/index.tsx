import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  HashRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from './page/login';
import Register from './page/register';
import Home from './page/home';
import Layout from './components/layout';
import FurnitureInfo from './page/furniture-info';
import Message from './page/message';
import MyFurniture from './page/my-furniture';
import Self from './page/self';
import Post from './page/post';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className='page'>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/furniture-info" element={<Layout><FurnitureInfo /></Layout>} />
          <Route path="/self" element={<Layout><Self /></Layout>} />
          <Route path="/message" element={<Layout><Message /></Layout>} />
          <Route path="/my-furniture" element={<Layout><MyFurniture /></Layout>} />
          <Route path="/article" element={<Layout><Post /></Layout>} />
        </Routes>
      </Router>
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
