import React from "react";
import { WingBlank, Pagination } from 'antd-mobile';
import {hashHistory} from "react-router";

const AdItem = props => {
  return (
    <div style={{marginTop: 0}} className="main-ad-detail">
      <WingBlank>
        <div className="title adPage">
          {props.isAllAd ? "所有广告位" : "搜索到的广告位" }
          <div onClick={() => hashHistory.push("/my/1")} className="title-more">
            查看我的广告 >
          </div>
        </div>
        <div className="content">
          {props.adList.map((item, index) => {
            return (
              <div key={index} className="item">
                <li className="clearfix">
                  <a
                    onClick={() => {
                      props.turnToDetailPage(item.info_id);
                    }}
                  >
                    <img
                      src={`http://images.adchina.club/${item.images[0].image}`}
                      alt=""
                    />
                    <h3>{item.name}</h3>
                    <p>{item.content}</p>
                    <div style={{transform: "translateY(-0.65rem)"}} className="item_price">
                      <ins className="right_price">￥{item.price}</ins>
                      <span className="item-address">
                        <span className="iconfont icon-icon-" />
                        {item.address}
                      </span>
                    </div>
                  </a>
                </li>
              </div>
            );
          })}
          {/* 分页器 */}
          <Pagination 
          total={Math.ceil(props.allSearchAd.length/12)}
          current={1}
          onChange={(page) => props.onPageChange(page) }
          locale={{
            prevText: '上一页',
            nextText: '下一页',
          }} />
        </div>
      </WingBlank>
    </div>
  );
};

export default AdItem;
