import React from "react";
import "./style.less";
import { WingBlank } from 'antd-mobile';

const Avatar = props => {
  return(
    <div>
      <div className="my-header">
        <p>
          个人中心
        </p>
      </div>
      <div className="my-avatar">
        <WingBlank>
          <div className="avatar-img">
            <img src={`http://${props.userInfo.avatar}`} alt=""/>
          </div>
          <div className="title">
            <h3>{props.userInfo.name}</h3>
            <p>{props.userInfo.address ?props.userInfo.address : "请尽快完善个人信息" }</p>
          </div>
        </WingBlank>
      </div>
    </div>
  )
};
export default Avatar;
