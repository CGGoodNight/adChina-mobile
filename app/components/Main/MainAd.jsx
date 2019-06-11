import React from "react";
import { Carousel, WingBlank, Button } from 'antd-mobile';
import {hashHistory} from "react-router";
import "./style.less";

const MainAd = props => {
  return(
      <div className="main-ad-box">
        <Carousel
          autoplay
          infinite
          autoplayInterval={4000}
        >
          {props.adList.map((item, index) => (
            <a
              key={index}
              onClick={() => {props.turnToDetailPage(true, item.info_id)}}
              style={{ display: 'inline-block', width: '100%', height: "9rem" }}
            >
              <img
                src={`http://images.adchina.club/${item.images[0].image}`}
                alt=""
                style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
              />
            </a>
          ))}
        </Carousel>
        <div className="main-ad-detail">
          <WingBlank>
            <div className="title">
              热门广告位
              <span className="iconfont icon-remen"></span>
              <div onClick={ () => hashHistory.push("/ad") } className="title-more">
                更多广告 >
              </div>
            </div>
            <div className="content">
              {
                props.adList.map((item, index) => {
                  return (
                    <div key={index} className="item">
                      <li className='clearfix'>
                        <a onClick={() => {props.turnToDetailPage(true, item.info_id)}}>
                          <img src={`http://images.adchina.club/${item.images[0].image}`} alt="" />
                          <h3>{item.name}</h3>
                          <p>{item.content}</p>
                          <div className='item_price'>
                            <ins className='right_price'>￥{item.price}</ins>
                            <span className="item-address">
                              <span className="iconfont icon-icon-"></span>
                              {item.address}
                            </span>
                          </div>
                        </a>
                      </li>
                    </div>
                  )
                })
              }
            </div>
          </WingBlank>
        </div>
        <Button onClick={() => hashHistory.push("/ad")} className="ad-bottom-look-more">点击查看更多</Button>
      </div>
  )
};
export default MainAd;
