import React from 'react';
import {WingBlank, List, Picker, Button, WhiteSpace} from "antd-mobile";
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton, LoadMore } from 'react-weui';
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
    return (
      <div>4</div>
    )
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
    return (
      <div>6</div>
    )
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