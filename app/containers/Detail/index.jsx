import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Header from "../../components/Common/Header";
import Content from "../../components/Detail/Content";
import { getUserInfoAction } from '../../actions/loginActions';
import {getAdDetailAction, getDemandDetailAction, clearDetailAction } from "../../actions/detailActions";

import { LoadMore } from 'react-weui';

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 1 广告详情页 2 需求详情页
      page: 1,
      currentImagePage: 1
    }
  }

  // 广告详情页轮播图当前页
  onCurrentImageChange(index) {
    this.setState({
      currentImagePage: index + 1
    });
  }

  // 生命周期函数
  componentDidMount() {
    // localStorage 中有 token 使用该token登录
    if(localStorage.getItem("token")) {
      this.props.getUserInfoData();
    }

    // 根据路由传递过来的id获取数据
    if(this.props.params.page === "1") {
      // 广告详情页 根据id获取数据
      this.props.getAdDetailData(this.props.params.id);
      this.setState({
        page: 1
      });
    } else if(this.props.params.page === "2") {
      // 需求详情页 根据id获取数据
      this.props.getDemandDetailData(this.props.params.id);
      this.setState({
        page: 2
      });
    }
  }

  componentWillUnmount() {
    this.props.clearDetailData();
  }


  render() {
    if(this.props.adDetail.length === 0 && this.props.demandDetail.length === 0) {
      return (
        <div>
          <Header
            isLogin={this.props.isLogin}
            userInfo={this.props.userInfo}
            headerPage={2}
            title={this.state.page === 1 ? "广告详情" : "需求详情"}
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
          headerPage={2}
          title={this.state.page === 1 ? "广告详情" : "需求详情"}
        />
        {
          this.state.page === 1 ?
            <Content
              page = {this.state.page}
              adDetail = {this.props.adDetail}
              onCurrentImageChange={this.onCurrentImageChange.bind(this)}
              currentImagePage={this.state.currentImagePage}
            />
            :
            <Content
              page = {this.state.page}
              demandDetail = {this.props.demandDetail}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.loginReducers.userInfo,
  isLogin: state.loginReducers.isLogin,
  adDetail: state.detailReducers.adDetail,
  demandDetail: state.detailReducers.demandDetail
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfoData() {
    dispatch(getUserInfoAction());
  },
  getAdDetailData(id) {
    dispatch(getAdDetailAction(id));
  },
  getDemandDetailData(id) {
    dispatch(getDemandDetailAction(id));
  },
  clearDetailData() {
    dispatch(clearDetailAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
