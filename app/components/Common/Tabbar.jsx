import React from "react";
import { TabBar } from 'antd-mobile';
import "./tabber.less";
import {hashHistory} from "react-router";

// 引入底部导航栏的图片
import home_no from "../../../static/image/png/home_no_selected.png";
import home_yes from "../../../static/image/png/home_selected.png";
import ad_no from "../../../static/image/png/ad_no_selected.png";
import ad_yes from "../../../static/image/png/ad_selected.png";
import xuqiu_no from "../../../static/image/png/xuqiu_no_selected.png";
import xuqiu_yes from "../../../static/image/png/xuqiu_selected.png";
import my_no from "../../../static/image/png/my_no_selected.png";
import my_yes from "../../../static/image/png/my_selected.png";
class Tabbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,
      fullScreen: false,
    };
  }

  componentDidMount() {
    this.setState({
      selectedTab: this.props.page
    })
  }

  render() {
    return (
      <div className="tabber">
        <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: "50px" }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
            tabBarPosition="bottom"
          >
            <TabBar.Item
              title="首页"
              key="home"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: `url(${home_no}) center center /  21px 21px no-repeat` }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: `url(${home_yes}) center center /  21px 21px no-repeat` }}
              />
              }
              selected={this.state.selectedTab === 'home'}
              onPress={() => {
                hashHistory.push("/");
                this.setState({
                  selectedTab: 'home',
                });
              }}
              data-seed="logId"
            >
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ad_no}) center center /  21px 21px no-repeat` }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ad_yes}) center center /  21px 21px no-repeat` }}
                />
              }
              title="广告"
              key="ad"
              selected={this.state.selectedTab === 'ad'}
              onPress={() => {
                hashHistory.push("/ad");
                this.setState({
                  selectedTab: 'ad',
                });
              }}
            >
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${xuqiu_no}) center center /  21px 21px no-repeat` }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${xuqiu_yes}) center center /  21px 21px no-repeat` }}
                />
              }
              title="需求"
              key="xuqiu"
              selected={this.state.selectedTab === 'xuqiu'}
              onPress={() => {
                hashHistory.push("/demand");
                this.setState({
                  selectedTab: 'xuqiu',
                });
              }}
            >
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${my_no}) center center /  21px 21px no-repeat` }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${my_yes}) center center /  21px 21px no-repeat` }}
                />
              }
              title="我的"
              key="my"
              selected={this.state.selectedTab === 'my'}
              onPress={() => {
                this.setState({
                  selectedTab: 'my',
                });
                hashHistory.push("/my");
              }}
            >
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}
export default Tabbar;
