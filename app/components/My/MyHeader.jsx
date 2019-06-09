import React from 'react';
import "./style.less";
import { WingBlank } from 'antd-mobile';
// 功能图片
import adImg from "../../../static/image/png/guanggao.png";
import demandImg from "../../../static/image/png/xuqiugujia.png";
import dingdanImg from "../../../static/image/png/dingdan.png";
import sixinImg from "../../../static/image/png/wodesixin.png";

const MyHeader = props => {
  return (
    <div className="myheader-box">
      <WingBlank>
        <div className="myheader-content">
          <div className="avatar">
            <img onClick={ () => props.onFunIconClick(5) } src={`http://${props.userInfo.avatar}`} alt="无法显示图片"/>
          </div>
          <div className="name">
            {props.userInfo.name}
          </div>
          <div className="info">
            <div onClick={ () => props.onFunIconClick(5) } >个人信息</div>
            <span></span>
            <div onClick={ () => props.onFunIconClick(6) }>系统信息</div>
          </div>

          <div className="all-fun">
            <div onClick={ () => props.onFunIconClick(1) } className="item">
              <img src={adImg} alt="获取图片失败"/>
              <span>我的广告</span>
            </div>
            <div onClick={ () => props.onFunIconClick(2) } className="item">
              <img src={demandImg} alt="获取图片失败"/>
              <span>我的需求</span>
            </div>
            <div onClick={ () => props.onFunIconClick(3) } className="item">
              <img src={dingdanImg} alt="获取图片失败"/>
              <span>我的订单</span>
            </div>
            <div onClick={ () => props.onFunIconClick(4) } className="item">
              <img src={sixinImg} alt="获取图片失败"/>
              <span>我的私信</span>
            </div>
          </div>
        </div>
      </WingBlank>
    </div>
  );
}

export default MyHeader;