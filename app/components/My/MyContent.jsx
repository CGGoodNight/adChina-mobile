import React from 'react';
import {WingBlank, List, Button} from "antd-mobile";
import {hashHistory} from "react-router";
const Item = List.Item;

import nameImg from "../../../static/image/png/name.png";
import addressImg from "../../../static/image/png/didian.png";
import creImg from "../../../static/image/png/cre.png";
import moneyImg from "../../../static/image/png/money.png";
import qrImg from "../../../static/image/png/s_shoukuanerweima.png";

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
      <div>3</div>
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