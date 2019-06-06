import React from "react";
import { WingBlank } from 'antd-mobile';

const NoLogin = props => {
  return(
    <div>
      <div className="my-header">
        <p>
          个人中心
        </p>
      </div>
      <div onClick={() => props.turnToLoginPage()} className="my-avatar">
        <WingBlank>
          <div className="avatar-img no-login">
            <span className="iconfont icon-yonghu1"></span>
          </div>
          <div className="title">
            <h3 style={{color: '#f40'}}>未登录</h3>
            <p style={{color: '#f40'}}>点击头像进行登录</p>
          </div>
        </WingBlank>
      </div>
    </div>
  )
};
export default NoLogin;
