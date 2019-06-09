import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {hashHistory} from "react-router";
import "./Header.less";

const Header = props => {
  return(
    <div className="header">
      <NavBar
        mode="light"
        icon={
          props.headerPage === 1 ?
            // 主页
            <span style={{fontSize: 22}} className="iconfont icon-caidan">
            </span>
            :
            props.headerPage === 2 ?
              // 详情页
              <span style={{fontSize: 22}} className="iconfont icon-fanhui1">
              </span>
              :
              // 其他
              <span style={{fontSize: 22}} className="iconfont icon-caidan">
              </span>
        }
        onLeftClick={() => {
          switch (props.headerPage) {
            case 1: {
              break;
            }
            case 2: {
              hashHistory.goBack();
              break;
            }
          }
        }}
        rightContent={
          props.isLogin ?
            [
              <Icon key="0" type="search" style={{ marginRight: '16px' }}/>,
              <span className="header-avatar" key="1">
                <img src={`http://${props.userInfo.avatar}`} alt=""/>
              </span>
            ]
            :
            [
              <Icon key="0" type="search" style={{ marginRight: '16px' }}/>,
              <span onClick={() => {hashHistory.push("/login")}} key="1" style={{fontSize: 24}} className="iconfont icon-yonghu1"></span>
            ]
        }
      >
        {props.title}
      </NavBar>
    </div>
  )
};
export default Header;
