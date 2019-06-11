import React from "react";
import { WingBlank } from 'antd-mobile';
import {hashHistory} from "react-router";
// 功能图片
import adImg from "../../../static/image/png/ad.png";
import demandImg from "../../../static/image/png/xuqiugujia.png";
import dingdanImg from "../../../static/image/png/dingdan.png";
import sixinImg from "../../../static/image/png/wodesixin.png";
import noLoginImg from "../../../static/image/png/no_login.png";

const NoLogin = props => {
  return(

<div className="myheader-box">
      <WingBlank>
        <div className="myheader-content">
          <div className="avatar">
            <img onClick={() => hashHistory.push("/login")} src={noLoginImg} alt="无法显示图片"/>
          </div>
          <div className="name">
            未登录
          </div>
          <div className="info">
            <div>个人信息</div>
            <span></span>
            <div>系统信息</div>
          </div>

          <div className="all-fun">
            <div className="item">
              <img src={adImg} alt="获取图片失败"/>
              <span>我的广告</span>
            </div>
            <div className="item">
              <img src={demandImg} alt="获取图片失败"/>
              <span>我的需求</span>
            </div>
            <div className="item">
              <img src={dingdanImg} alt="获取图片失败"/>
              <span>我的订单</span>
            </div>
            <div className="item">
              <img src={sixinImg} alt="获取图片失败"/>
              <span>我的私信</span>
            </div>
          </div>
        </div>
        
      </WingBlank>
    </div>
  )
};
export default NoLogin;
