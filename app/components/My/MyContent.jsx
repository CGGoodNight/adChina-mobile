import React from 'react';
import {WingBlank, List, Picker, Button, WhiteSpace, TextareaItem} from "antd-mobile";
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton, LoadMore } from 'react-weui';
import {getRemainderTime} from "./getRemainderTime";
import {hashHistory} from "react-router";
const Item = List.Item;

import nameImg from "../../../static/image/png/name.png";
import addressImg from "../../../static/image/png/didian.png";
import creImg from "../../../static/image/png/cre.png";
import moneyImg from "../../../static/image/png/money.png";
import qrImg from "../../../static/image/png/s_shoukuanerweima.png";

import {getButtonState} from "./getButtonState";

const isBuypage = [
  [
    {
      label: '购买页',
      value: true,
    },
    {
      label: '卖出页',
      value: false,
    },
  ]
];


function getContent(page, props) {
  if(page === 1) {
    return (
      <List renderHeader={() => `我的广告（${props.myAd.length}）`} className="my-list">
        {
          props.myAd.map((item, index) => (
            <Item 
              key={index}
              onClick={ () => {hashHistory.push(`/detail/1/${item.info_id}`)} }
              arrow="horizontal" 
              extra={item.status === "未审核" ? "未审核" : ""}
            >
              {item.name}
            </Item>
          ))
        }
      </List>
    )
  }
  if(page === 2) {
    return (
      <List renderHeader={() => `我的需求（${props.myDemand.length}）`} className="my-list">
        {
          props.myDemand.map((item, index) => (
            <Item 
              key={index} 
              arrow="horizontal" 
              onClick={ () => {hashHistory.push(`/detail/2/${item.info_id}`)} }
            >
              {item.name}
            </Item>
          ))
        }
      </List>
    )
  }
  if(page === 3) {
    return (
      <div>
        <List renderHeader={() => `我的订单`} className="my-list">
          <Picker
            data={isBuypage}
            title="选择类型"
            cascade={false}
            extra="购买页"
            value={[props.isBuyPage]}
            onChange={v => props.onOrderPageChange(v)}
            onOk={v => props.getMyOrder(v)}
          >
            <List.Item style={{marginBottom: -1}} arrow="horizontal">订单分类</List.Item>
          </Picker>
          {
            props.myOrder.length === 0 ?
            <LoadMore showLine>No Data</LoadMore>
            :
            ""
          }

          {
           props.myOrder.map((item, index) => {
             if(item.name === null) {
              return;
             }
             return (
              <div key={index} >
                <Preview>
                  <PreviewHeader>
                    <PreviewItem onClick={() => {hashHistory.push(`/detail/1/${item.sellerinfo_id}`)}} label="广告名称" value={item.name} />
                  </PreviewHeader>
                  <PreviewBody>
                    <PreviewItem label="下单时间" value={item.create_time} />
                    <PreviewItem label="订单编号" value={""+item.order_id} />
                    <PreviewItem label="卖家" value={item.seller} />
                    <PreviewItem label="买家" value={item.buyer} />
                    <PreviewItem label="价格" value={`￥${item.price}`} />
                  </PreviewBody>
                  <PreviewFooter>
                    <PreviewButton primary={false} onClick={() => {}}>
                      {
                        getButtonState(item.order_status, props.isBuyPage, props, item.order_id, props.closeBtn)
                      }
                      </PreviewButton>
                  </PreviewFooter>
                </Preview>
                <WhiteSpace></WhiteSpace>
              </div>
             )
           }) 
          }
          
        </List>
        
      </div>
    )
  }
  if(page === 4) {
    if(props.isMessageDetail) {
      // 没有内容是显示加载中
      if(props.detailMessage.length === 0) {
        return <List renderHeader={() => `回复私信`} className="my-list">
          <div>
            <TextareaItem
              title=""
              placeholder="输入回复内容"
              // value={props._this.state.addDetail}
              // onChange={ (value) => props._this.setState({
              //   addDetail: value
              // }) }
              rows={4}
              count={100}
            />
          </div>
          <div className="reply-btn clearfix">
            <Button type="warning">回复</Button>
            <Button onClick={() => {props.goBackMessageTotal()}}>返回</Button>
          </div>
          <LoadMore>加载中...</LoadMore>
        </List>
      }
      return (
        <div>
          <List renderHeader={() => `回复私信`} className="my-list">
            <div>
              <TextareaItem
                title=""
                placeholder="输入回复内容"
                value={props.replyContent}
                onChange={(value) => {props.onReplyContentChange(value)}}
                rows={4}
                count={100}
              />
            </div>
            <div className="reply-btn clearfix">
              <Button onClick={() => {
                let myId = props.userInfo.id;
                if(myId === props.detailMessage[0].apply_id) {
                  props.onReplyBtnClick(props.detailMessage[0].accept_id);
                } else {
                  props.onReplyBtnClick(props.detailMessage[0].apply_id);
                }
                
                }} type="warning">回复</Button>
              <Button onClick={() => {props.goBackMessageTotal()}}>返回</Button>
            </div>
            <List renderHeader={() => `全部私信（${props.detailMessage.length}）`} className="my-list">
              {
                props.detailMessage.map((item, index) => {
                  return (
                    <div key={index} className="message-detail">
                      <div className={ props.userInfo.id === item.apply_id ? "first" : "first second"}>
                        
                        {
                          props.userInfo.id === item.apply_id ?
                            <div className="avatar-name">
                              <div className="avatar">
                                <img src={`http://images.adchina.club/${item.avatar}`} alt=""/>
                              </div>
                              <div className="name">
                                {item.name} :
                              </div>
                            </div>
                            :
                            <div className="avatar-name">
                              <div className="name">
                                : {item.name}
                              </div>
                              <div className="avatar">
                                <img src={`http://images.adchina.club/${item.avatar}`} alt=""/>
                              </div>
                            </div>
                        }
                        <div className="content">
                          {item.content}
                        </div>
                        <div className="time">
                          {item.pubtime}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </List>
          </List>
        </div>
      )
    } else {
      return (
        <div>
          <List renderHeader={() => `我的私信（${props.totalMessage.length}）`} className="my-list">
            <div className="messages-box clearfix">
              {
                props.totalMessage.map((item, index) => {
  
                  let releaseStr = "";
                  let date = getRemainderTime(item.pubtime);
                  // 判断返回的字符串
                  if (date.year > 0) {
                    releaseStr = date.year + "年前";
                  } else if (date.month > 0) {
                    releaseStr = date.month + "月前";
                  } else if (date.day > 0) {
                    releaseStr = date.day + "天前";
                  } else if (date.hour > 0) {
                    releaseStr = date.hour + "小时前";
                  } else if (date.minute > 0) {
                    releaseStr = date.minute + "分钟前";
                  } else if (date.second > 0 && date.second < 10) {
                    releaseStr = "几秒前";
                  } else if (date.second >= 10) {
                    releaseStr = date.second + "秒前";
                  }
  
                  return (
                    <div onClick={() => {
                      // 判断下对方id是多少
                      let myId = props.userInfo.id;
                      if(myId === item.apply_id) {
                        props.messageToDetailClick(item.accept_id);
                      } else {
                        props.messageToDetailClick(item.apply_id);
                      }
                      
                    }} key={index} className="item clearfix">
                      <div className="avatar">
                        <img src={`http://images.adchina.club/${item.avatar}`} alt=""/>
                      </div>
                      <div className="content">
                        <p>
                          <strong>{item.name}</strong>
                        </p>
                        <p>
                          {item.content}
                        </p>
                      </div>
                      <div className="time">
                        {releaseStr}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </List>
          
        </div>
      )
    }
  }
  if(page === 5) {
    return (
      <List renderHeader={() => '个人信息'}>
        <Item
          thumb={nameImg}
          arrow="horizontal"
          onClick={() => {}}
        >
          {props.userInfo.name}
        </Item>
        <Item
          thumb={addressImg}
          onClick={() => {}}
          arrow="horizontal"
        >
          {props.userInfo.address}
        </Item>
        <Item
          thumb={creImg}
          extra={props.userInfo.credit}
          onClick={() => {}}
          arrow="horizontal"
        >
          信用值
        </Item>
        <Item
          thumb={moneyImg}
          extra={`${props.userInfo.account} 元`}
          onClick={() => {}}
          arrow="horizontal"
        >
          余额
        </Item>
        <Item
          thumb={qrImg}
          onClick={() => { window.open(`http://${props.userInfo.qrcode}`); }}
          arrow="horizontal"
        >
          收款二维码
        </Item>
      </List>
    )
  }
  if(page === 6) {
    if(props.isSystemInfoDetail) {
      return (
        <div className="system-info-detail">
          <div className="header">
            <h2>关于参加中国大学生计算机设计大赛通知</h2>
            <p>adchina发布者</p>
            <p>2019-04-29</p>
          </div>
          <div style={{marginTop: "0.6rem", fontSize: "0.7rem"}} dangerouslySetInnerHTML={{__html: props.systemInfo[0].content}}>
            
          </div>
        </div>
      )
    } else {
      return (
        <div className="system-info">
          {
            props.systemInfo.map((item, index) => (
              <div key={index}>
                <Preview>
                  <PreviewHeader>
                    <PreviewItem onClick={() => {}} label="" value={item.title} />
                  </PreviewHeader>
                  <PreviewBody>
                    <PreviewItem label="发布时间" value={item.pubtime} />
                    <PreviewItem label="发布者" value={item.pubpeople} />
                    <PreviewItem label="简介" value={item.description} />
                  </PreviewBody>
                  <PreviewFooter>
                    <PreviewButton primary={false} onClick={() => props.turnToSystemInfoDetail(item.id)}>
                      查看详情
                    </PreviewButton>
                  </PreviewFooter>
                </Preview>
                <WhiteSpace></WhiteSpace>
              </div>
            ))
          }
        </div>
      )
    }
    
  }
}

const MyContent = props => {
  return (
    <WingBlank>
      <div className="my-content">
        {
          getContent(props.page, props)
        }
      </div>
      {
        props.page === 5 ?
          <Button onClick={() => props.exitLoginClick()} type="warning">退出登陆</Button>
          :
          ""
      }
    </WingBlank>
      
  );
}

export default MyContent;