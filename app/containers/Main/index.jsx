import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {hashHistory} from "react-router";
import { LoadMore } from 'react-weui';

// 导入无状态组件
import Header from "../../components/Common/Header";
import MainAd from "../../components/Main/MainAd";
import MainDemand from "../../components/Main/MainDemand";

// tabber
import Tabber from "../../components/Common/Tabbar";
// actions
import {getUserInfoAction} from "../../actions/loginActions";
import {getMainDataAction} from "../../actions/mainActions";


class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  // 跳转到详情页
  turnToDetailPage(isAdPage, id) {
    // isAdPage 判断是进入广告页还是详情页
    isAdPage ? hashHistory.push(`/detail/1/${id}`) : hashHistory.push(`/detail/2/${id}`);
  }

  // 生命周期函数
  componentDidMount() {
    window.scrollTo(0,0);
    // localStorage 中有 token 使用该token登录
    if(localStorage.getItem("token")) {
      this.props.getUserInfoData();
    }
    this.props.getMainData();
  }

  render() {
    // adList没有数据导致Carousel不能autoplay 所以在adList没有加载出来时返回空
    if(this.props.adList.length === 0) {
      return (
        <div>
          <Header
            isLogin={this.props.isLogin}
            headerPage={1}
            userInfo={this.props.userInfo}
            title={"广告中国"}
          />
          <LoadMore loading>正在获取数据...</LoadMore>
        </div>
      )
    }
    return (
      <div>
        <Header
          isLogin={this.props.isLogin}
          userInfo={this.props.userInfo}
          headerPage={1}
          title={"广告中国"}
        />
        <MainAd
          adList={this.props.adList}
          turnToDetailPage={this.turnToDetailPage.bind(this)}
        />
        <MainDemand
          demandList={this.props.demandList}
          turnToDetailPage={this.turnToDetailPage.bind(this)}
        />
        <Tabber page="home" />
        <div className="bottom-white"></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.loginReducers.userInfo,
  isLogin: state.loginReducers.isLogin,
  adList: state.mainReducers.adList,
  demandList: state.mainReducers.demandList,
  videoList: state.mainReducers.videoList
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfoData() {
    dispatch(getUserInfoAction());
  },
  getMainData() {
    dispatch(getMainDataAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
