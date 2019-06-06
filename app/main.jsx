import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/index';
import RouteMap from './routers/routeMap';

// 引入全局的样式
import "./style.less";

// 引入iconfont的样式
import "../static/css/iconfont.css";

// 引入ant design mobile样式
import 'antd-mobile/dist/antd-mobile.less';

// 引入weui的样式
import 'weui';
import 'react-weui/build/packages/react-weui.css';


const root = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <RouteMap />
  </Provider>,
  root
);
