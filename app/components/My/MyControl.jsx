import React from "react";
import { WingBlank, Button, Accordion, List, Modal } from 'antd-mobile';


const MyControl = props => {
  return(
    <div className="my-control">
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Accordion className="my-accordion" onChange={(key) => props.onPanelChange(key)}>
          {/* 个人中心 */}
          <Accordion.Panel header={
            <span className="info-header iconfont icon-yonghu2">
              <span className="title">个人中心</span>
            </span>
          }>
            <List className="my-list">
              {/* 名字 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-yonghu2"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.name}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 地址 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-icon-"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.address ? props.userInfo.address : "未填"}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 信用值 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-xinyong"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.credit}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 余额 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-zhanghuyue"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.account}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 收款二维码 */}
              <List.Item onClick={() => {
                window.open(`http://${props.userInfo.qrcode}`);
              }}>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-shoukuanerweima"></span>
                    </div>
                    <div className="info">
                      点击查看收款二维码
                      <span className="iconfont icon-forward"></span>
                    </div>
                  </div>
                </div>
              </List.Item>
            </List>
            <div className="modify-btn">
              <WingBlank>
                <Button
                  type="warning"
                  onClick={props.showModal1('modal1')}
                >
                  修改个人信息
                </Button>
              </WingBlank>
            </div>
          </Accordion.Panel>

          {/* 我的广告 */}
          <Accordion.Panel header={
            <span className="info-header iconfont icon-AD-">
              <span className="title">我的广告</span>
            </span>
          }>
            <List className="my-list">
              {
                props.myAd.map((item, index) => (
                  <List.Item key={index}>
                    <div className="ad-content">
                      <p>
                      {`${item.info_id}. ${item.name}`}
                      <span style={{color: "#f40", marginLeft: "0.5rem"}}>
                        {
                          item.status === "未审核" ? "(未审核)" : ""
                        }
                        
                      </span>
                      </p>
                    </div>
                  </List.Item>
                ))
              }
            </List>
          </Accordion.Panel>

          {/* 我的需求 */}
          <Accordion.Panel header={
            <span className="info-header iconfont icon-diychannel-desire">
              <span className="title">我的需求</span>
            </span>
          }>
            <List className="my-list">
              {
                props.myDemand.map((item, index) => (
                  <List.Item key={index}>
                    <div className="ad-content">
                      <p>{`${item.info_id}. ${item.name}`}</p>
                    </div>
                  </List.Item>
                ))
              }
            </List>
          </Accordion.Panel>

          {/* 私信列表 */}
          <Accordion.Panel header={
            <span className="info-header iconfont icon-youxiang">
              <span className="title">私信列表</span>
            </span>
          }>
            <List className="my-list">
              {/* 名字 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-yonghu2"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.name}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 地址 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-icon-"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.address ? props.userInfo.address : "未填"}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 信用值 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-xinyong"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.credit}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 余额 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-zhanghuyue"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.account}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 收款二维码 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-shoukuanerweima"></span>
                    </div>
                    <div className="info">
                      点击查看收款二维码
                      <span className="iconfont icon-forward"></span>
                    </div>
                  </div>
                </div>
              </List.Item>
            </List>
          </Accordion.Panel>

          {/* 订单列表 */}
          <Accordion.Panel header={
            <span className="info-header iconfont icon-chongzhidingdanhao">
              <span className="title">我的订单</span>
            </span>
          }>
            <List className="my-list">
              {/* 名字 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-yonghu2"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.name}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 地址 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-icon-"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.address ? props.userInfo.address : "未填"}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 信用值 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-xinyong"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.credit}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 余额 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-zhanghuyue"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.account}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 收款二维码 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-shoukuanerweima"></span>
                    </div>
                    <div className="info">
                      点击查看收款二维码
                      <span className="iconfont icon-forward"></span>
                    </div>
                  </div>
                </div>
              </List.Item>
            </List>
          </Accordion.Panel>

          {/* 系统消息 */}
          <Accordion.Panel header={
            <span className="info-header iconfont icon-xitongxinxi">
              <span className="title">系统消息</span>
            </span>
          }>
            <List className="my-list">
              {/* 名字 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-yonghu2"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.name}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 地址 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-icon-"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.address ? props.userInfo.address : "未填"}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 信用值 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-xinyong"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.credit}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 余额 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-zhanghuyue"></span>
                    </div>
                    <div className="info">
                      {props.userInfo.account}
                    </div>
                  </div>
                </div>
              </List.Item>
              {/* 收款二维码 */}
              <List.Item>
                <div className="my-info">
                  <div className="item">
                    <div className="icon">
                      <span className="iconfont icon-shoukuanerweima"></span>
                    </div>
                    <div className="info">
                      点击查看收款二维码
                      <span className="iconfont icon-forward"></span>
                    </div>
                  </div>
                </div>
              </List.Item>
            </List>
          </Accordion.Panel>

        </Accordion>
      </div>
    </div>
  )
};
export default MyControl;
