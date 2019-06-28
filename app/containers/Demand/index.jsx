import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {hashHistory} from "react-router";
import { Modal, Toast } from 'antd-mobile';
const alert = Modal.alert;

import {
  Tab,
  TabBody,
  NavBar,
  NavBarItem,
  Article,
  LoadMore
} from 'react-weui';

import {getSearchDemandAction, submitDemandAction, crossIdSearchDemandAction ,modifyDemandAction, onDemandSearchPageChangeAction} from "../../actions/demandActions";
import {editorObjectAction} from "../../actions/detailActions";

import Tabber from "../../components/Common/Tabbar";
import FooterDemo from "../../components/Common/FooterDemo";
import SelectHeader from "../../components/Demand/SelectHeader";
import FuzzySearch from "../../components/Demand/FuzzySearch";
import AccurateSearch from "../../components/Demand/AccurateSearch";
import DemandItem from "../../components/Demand/DemandItem";
import AddDemand from "../../components/Demand/AddDemand";


class Demand extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      tab: 0,
      modal1: false,
      isSearchFocus: false,
      isAllDemand: false,
      searchBarValue: "",

      // search
      type: "",
      traffic: 0,
      price_start: 0,
      price_end: 0,

      isEditor: false,
      modifyId: 0,

      // AdDemand
      addName: "",
      addTel: "",
      addPrice: "",
      addTraffic: "",
      addSize: "",
      addType: "",
      addDay: "0",
      addHour: "0",
      addDetail: "",
    }
  }

  // 搜索广告的Modal
  showModal (key) {
    this.setState({
      [key]: true,
    });
  };

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };
  // 搜索广告的Modal

  // 搜索框的聚焦和失焦
  toggleFocusState() {
    this.setState({
      isSearchFocus: !this.state.isSearchFocus
    });
  }

  // 点击searchBar的分类搜索按钮后触发showModal
  openShowModal() {
    alert('选择搜索条件', "", [
      { text: '模糊搜索', onPress: () => this.showModal("modal1") },
      { text: '精确搜索', onPress: () => this.showModal('modal2') },
      { text: '返回', onPress: () => {} },
    ])
  }

  // 根据id搜索需求
  crossIdSearchDemand() {
    let oldId = this.state.searchBarValue;
    let id = 0;
    id = parseInt(oldId);
    // 使用两个等号是为了防止parseInt只将中间的非数字去掉
    if(id == oldId) {
      Toast.loading("获取数据中...", 10, () => {
        Toast.fail("获取失败", 1.2);
      });
      this.props.crossIdSearchDemandData(this.state.searchBarValue);
      this.setState({
        searchBarValue: ""
      });
    } else {
      Toast.fail("id只能为数字", 1.5);
      this.setState({
        searchBarValue: ""
      });
    }
  }
  onSearchBarChange(value) {
    this.setState({
      searchBarValue: value
    });
  }
  
  // ModifyDemand
  modifyDemand() {
    Toast.loading("上传中...", 999, () => {
      Toast.fail("上传失败！", 1.2);
    });
    this.props.modifyDemandData(this.state);
  }

  // 上传需求位
  submitDemand() {
    // 所有选项的不能为空
    let isSuccess = true;
    this.state.addName === "" ? isSuccess=false : "";
    this.state.addTel === "" ? isSuccess=false : "";
    this.state.addPrice === "" ? isSuccess=false : "";
    this.state.addTraffic === "" ? isSuccess=false : "";
    this.state.addSize === "" ? isSuccess=false : "";
    this.state.addType === "" ? isSuccess=false : "";
    this.state.addDay === "0" ? isSuccess=false : "";
    this.state.addHour === "0" ? isSuccess=false : "";
    this.state.addDetail === "" ? isSuccess=false : "";

    if(isSuccess) {
      this.props.submitDemandData(this.state);
      this.clearInputInfo();
      Toast.loading("正在上传...", 10, () => {
        Toast.fail("上传失败！", 1.2);
      });
    } else {
      Toast.fail("以上都为必填项，请全部输入后提交~", 2);
    }
  }

  // 清空输入的需求信息
  clearInputInfo() {
    this.setState({
      addName: "",
      addTel: "",
      addPrice: "",
      addTraffic: "",
      addSize: "",
      addType: "",
      addDay: "0",
      addHour: "0",
      addDetail: "",
    });
  }

  // 分页器发生变化
  onPageChange(page) {
    let pageSize = 8;
    let start = pageSize * (page - 1);
    let end = page * pageSize;
    window.scrollTo(0,0);
    this.props.onSearchPageChange(start, end);
  }

  // 跳转到详情页
  turnToDetailPage(isAdPage, id) {
    // isAdPage 判断是进入广告页还是详情页
    isAdPage ? hashHistory.push(`/detail/1/${id}`) : hashHistory.push(`/detail/2/${id}`);
  }

  // 生命周期函数
  componentDidMount() {
    window.scrollTo(0,0);
    // 如果是进入编辑页就不用在获取所有的广告，直接跳转
    if(this.props.params.editor === "1") {
      let editorObj = this.props.editorObj;

      if(JSON.stringify(editorObj) == "{}") {
        // 获取所有广告
        this.props.getSearchAdData(this.state);
        this.setState({
          isAllAd: true
        });
        return;
      }

      this.setState({
        tab: 1,
        //EditorAd
        isEditor: true,
        modifyId: editorObj.info_id,
        addName: editorObj.name,
        addTel: editorObj.tel,
        addPrice: editorObj.price,
        addTraffic: editorObj.traffic,
        addSize: editorObj.minArea,
        addType: editorObj.type,
        addDay: `${editorObj.exposureDay}`,
        addHour: `${editorObj.exposureHour}`,
        addDetail: `${editorObj.content}`,
      });
      this.props.clearEditorObject();

    } else {
      // 获取全部需求信息
      this.props.getSearchDemandData(this.state);
      this.setState({
        isAllDemand: true
      });
    }
  }
  render() {

    if(this.props.allSearchDemand.length === 0) {
      return (
        <div>
          <LoadMore loading>正在获取数据...</LoadMore>
        </div>
      )
    }

    return (
      <div className="ad-box">
        {/* 模糊搜索 */}
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="模糊搜索(可选)"
          footer={[{ text: '搜索', onPress: () => { 
            // 发送搜索请求API
            Toast.loading("获取数据中...", 10, () => {
              Toast.fail("获取失败", 1.2);
            });
            this.props.getSearchDemandData(this.state);
            this.onClose('modal1')();
            // 重置下state的值 延迟下 关闭modal需要动画时间
            setTimeout(() => {
              this.setState({
                type: "",
                traffic: 0,
                price_start: 0,
                price_end: 0,
                address: "",
                isAllDemand: false
              });
            }, 200);
            } }]
          }
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: "40vh", overflow: 'scroll' }}>
            <FuzzySearch
              _this={this}
            />
          </div>
        </Modal>
        {/* 精确搜索 */}
        <Modal
          visible={this.state.modal2}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal2')}
          title="精确搜索(可选)"
          footer={[{ text: '搜索', onPress: () => {
            // 发送搜索请求API
            Toast.loading("获取数据中...", 10, () => {
              Toast.fail("获取失败", 1.2);
            });
            this.props.getSearchDemandData(this.state);
            this.onClose('modal2')();
            // 重置下state的值 延迟下 关闭modal需要动画时间
            setTimeout(() => {
              this.setState({
                type: "",
                traffic: 0,
                price_start: 0,
                price_end: 0,
                address: "",
                isAllDemand: false
              });
            }, 200);
            } }]
          }
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: "40vh", overflow: 'scroll' }}>
            <AccurateSearch
              _this={this}
            />
          </div>
        </Modal>
        <Tab>
          <NavBar>
            <NavBarItem active={this.state.tab == 0} onClick={e=>this.setState({tab:0})}>搜索需求</NavBarItem>
            <NavBarItem active={this.state.tab == 1} onClick={e=>{
              // localStorage 中有 token 使用该token登录
              if(!localStorage.getItem("token")) {
                Toast.fail("请先登录！", 1.5);
                return;
              }
              this.setState({tab:1})
            }}>添加需求</NavBarItem>
          </NavBar>
          <TabBody>
            <Article style={{display: this.state.tab == 0 ? null : 'none'}}>
              <SelectHeader
                toggleFocusState={this.toggleFocusState.bind(this)}
                isSearchFocus={this.state.isSearchFocus}
                openShowModal={this.openShowModal.bind(this)}
                crossIdSearchDemand={this.crossIdSearchDemand.bind(this)}
                onSearchBarChange={this.onSearchBarChange.bind(this)}
                searchBarValue={this.state.searchBarValue}
              />
              <DemandItem
                isAllDemand={this.state.isAllDemand}
                demandList={this.props.displaySearchDemand}
                allSearchDemand={this.props.allSearchDemand}
                turnToDetailPage={this.turnToDetailPage.bind(this)}
                onPageChange={this.onPageChange.bind(this)}
              />
            </Article>
            <Article style={{display: this.state.tab == 1 ? null : 'none'}}>
              <AddDemand
                _this={this}
              />
            </Article>
          </TabBody>
        </Tab>
        <FooterDemo />
        <div className="bottom-white"></div>
        <Tabber page="xuqiu" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allSearchDemand: state.demandReducers.allSearchDemand,
  displaySearchDemand: state.demandReducers.displaySearchDemand,
  editorObj: state.detailReducers.editorObj
});

const mapDispatchToProps = (dispatch) => ({
  getSearchDemandData(dataObj) {
    dispatch(getSearchDemandAction(dataObj));
  },
  submitDemandData(dataObj) {
    dispatch(submitDemandAction(dataObj));
  },
  crossIdSearchDemandData(id) {
    dispatch(crossIdSearchDemandAction(id))
  },
  clearEditorObject() {
    dispatch(editorObjectAction({}, true));
  },
  modifyDemandData(dataObj) {
    dispatch(modifyDemandAction(dataObj));
  },
  onSearchPageChange(start, end) {
    dispatch(onDemandSearchPageChangeAction(start, end));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Demand);