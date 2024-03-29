import React from "react";
import { Carousel, WingBlank, Button, Modal } from 'antd-mobile';
import { LoadMore } from 'react-weui';
const alert = Modal.alert;
import "./style.less";


const Content = props => {
  let displayData;
  if (props.page === 1) {
    // 广告详情页
    displayData = props.adDetail;
  } else if (props.page === 2) {
    // 需求详情页
    displayData = props.demandDetail;
  }
  return(
    <div className="detail-content">
      {
        // 轮播图
        props.page === 1 ?
          displayData.images.length === 0 ?
            <div className="empty">
              <LoadMore showLine>无图片数据</LoadMore>
            </div>
            :
            <div className="carousel">
              <Carousel
                autoplay
                infinite
                dots={false}
                afterChange={index => props.onCurrentImageChange(index)}
                autoplayInterval={4000}
              >
                {displayData.images.map((item, index) => (
                  <a
                    key={index}
                    onClick={() => {
                      window.open(`http://images.adchina.club/${item.image}`)
                    }}
                  >
                    <img
                      src={`http://images.adchina.club/${item.image}`}
                      alt=""
                      style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
                    />
                  </a>
                ))}
              </Carousel>
              <div className="carousel-info">
                <h2>
                  {displayData.name}
                </h2>
                <p>
                  {displayData.content}
                </p>
              </div>
              <div className="swipe-page-ctrl">
                {`${props.currentImagePage}/${displayData.images.length}`}
              </div>
            </div>
          :
          // 需求没有轮播图 换成标题
          <div className="detail-title">
            <WingBlank>
              <h1>
                {displayData.name}
              </h1>
              <h3>
                {displayData.content}
              </h3>
            </WingBlank>
          </div>
      }
        <div className="buy-content">
          <WingBlank>
            <div className="price">
              <span className="icon">￥</span>
              <span className="sum">{displayData.price}</span>
            </div>
            <div>
              {
                props.userInfo.id === displayData.user_id ?
                <Button 
                  type="warning" 
                  style={ props.page === 1 ? {} : {display: "none"} }
                  onClick={() => props.turnToEditorPage(displayData, 1)}
                 >立即修改</Button>
                :
                <Button type="warning" 
                onClick={props.showModal("modal1")}
                style={ props.page === 1 ? {} : {display: "none"}
               } >立即购买</Button>
              }
              
            </div>
          </WingBlank>
        </div>
      <ul className="advantage">
        <WingBlank>
          <li>
            <span className="iconfont icon-anquan">
            </span>
            安全可靠
          </li>
          <li>
            <span className="iconfont icon-xiaofeiweiquan1 bigger">
            </span>
            消费维权
          </li>
        </WingBlank>
      </ul>
      <ul className="more-info">
        <WingBlank>
          <li className="firstLi">
            <div className="more-title">
              更多信息
              <span className="iconfont icon-detail">
              </span>
            </div>
          </li>
          <li>
            <div className="title">
              发布人
            </div>
            <div className="content">
              {displayData.user_name}
            </div>
          </li>
          <li>
            <div className="title">
              { props.page === 1 ? "广告id" : "需求id" }
            </div>
            <div className="content">
              {displayData.info_id}
            </div>
          </li>
          <li>
            <div className="title">
              联系电话
            </div>
            <div className="content">
              {displayData.tel}
            </div>
          </li>
          <li>
            <div className="title">
              类型
            </div>
            <div className="content">
              {displayData.type}
            </div>
          </li>
          <li>
            <div className="title">
              大小
            </div>
            <div className="content">
              {
                props.page === 1 ?
                  displayData.maxArea
                  :
                  displayData.minArea
              }
            </div>
          </li>
          <li>
            <div className="title">
              人流量
            </div>
            <div className="content">
              {displayData.traffic}人/天
            </div>
          </li>
          {
            props.page === 1 ?
              <li>
                <div className="title">
                  地址
                </div>
                <div className="content">
                  {displayData.address}
                </div>
              </li>
              :
              ""
          }
          <li className="lastLi">
            <div className="title">
              工作时间
            </div>
            <div className="content">
              {displayData.exposureDay}天/周 {displayData.exposureHour}时/天
            </div>
          </li>
        </WingBlank>
      </ul>
      <div className="ad-control">
        <WingBlank>
          {
            props.userInfo.id === displayData.user_id ?
            <Button 
              type="warning" 
              style={ props.page === 1 ? {} : {display: "none"} }
              onClick={() => {
                alert('确定删除该广告么？', "", [
                  { text: '取消', onPress: () => {} },
                  { text: '确定', onPress: () => props.deleteAd(displayData.info_id)}
                ])
              }}
               >立即删除</Button>
            :
            <Button type="warning" 
            onClick={props.showModal("modal1")}
            style={ props.page === 1 ? {} : {display: "none"} }
             >立即购买</Button>
          }
          {
            props.userInfo.id === displayData.user_id ?
              props.page === 1 ?
              ""
              :
              <Button 
                type="warning"
                onClick={() => {
                  alert('确定删除改需求么？', "", [
                    { text: '取消', onPress: () => {} },
                    { text: '确定', onPress: () => props.deleteDemand(displayData.info_id)}
                  ])
                }}
              >立即删除</Button>
            :
            <Button 
            onClick={() => {props.onSubmitMessageBtnClick(displayData.user_id)}}
            type={ props.page === 1 ? "" : "warning" } >发送私信</Button>
          }
        </WingBlank>
      </div>
    </div>
  )
};
export default Content;
