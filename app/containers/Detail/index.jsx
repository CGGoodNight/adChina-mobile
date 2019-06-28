import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {hashHistory} from "react-router";
import {Toast, Modal, ImagePicker, Progress } from "antd-mobile";
const alert = Modal.alert;
const prompt = Modal.prompt;
import Header from "../../components/Common/Header";
import FooterDemo from "../../components/Common/FooterDemo";
import Content from "../../components/Detail/Content";
import { getUserInfoAction } from '../../actions/loginActions';
import {getAdDetailAction, getDemandDetailAction, clearDetailAction, editorObjectAction, deleteAdAction, deleteDemandAction, uploadAdImageAction } from "../../actions/detailActions";
import {submitPrivateLetter} from "../../actions/myActions";

import { LoadMore } from 'react-weui';


function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}



class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 1 广告详情页 2 需求详情页
      page: 1,
      currentImagePage: 1,
      modal1: false,
      files: []
    }
  }

  // -------上传广告底图的Modal
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  // 上传广告底图
  onChange = (files, type, index) => {
    let file = files[0].file;
    let _that = this;
    // 检查上传的图片是否符合格式
    if(file.type.indexOf("jpeg") > -1 || file.type.indexOf("jpg") > -1 || file.type.indexOf("png") > -1) {
      if(file.name.indexOf("JPEG") > -1 || file.name.indexOf("JPG") > -1 || file.name.indexOf("PNG") > -1) {
        Toast.fail("上传的图片格式后缀名小写哟~", 1.5);
        return false;
      }
      // 判断大小
      if(file.size/1024 > 1025) {
        alert('文件过大', '文件太大可能导致上传速度慢，请耐心等候...', [
          { text: '取消上传', onPress: () => {} },
          { text: '继续上传', onPress: () => {
            let formData = new FormData();
            formData.append('file', file);
            this.setState({
              files,
            });
            _that.props.uploadAdImage(this.props.adDetail.info_id, formData);
            Toast.loading("上传中，可在顶部查看上传进度...", 999, () => {
              Toast.fail("上传失败！", 1.2);
            });    
          } },
        ])
      } else {
        let formData = new FormData();
        formData.append('file', file);
        this.setState({
          files,
        });
        _that.props.uploadAdImage(this.props.adDetail.info_id, formData);
        
        Toast.loading("正在上传...", 99, () => {
          Toast.fail("上传失败！", 1.2);
        });
      }
    } else {
      Toast.fail("上传的图片格式必须是jpg，jpeg，png其中的一种哟~");
      return false;
    }
  };

  // -------上传广告底图的Modal

  // 广告详情页轮播图当前页
  onCurrentImageChange(index) {
    this.setState({
      currentImagePage: index + 1
    });
  }

  // 跳转到广告/需求修改页

  turnToEditorPage(dataObj, page) {
    if(page === 1) {
      // 跳转到广告编辑页
      // 第二个参数为editor 1为编辑 0为常态
      hashHistory.push("/ad/1");
      // 无法通过路由将对象传递过去 但是可以通过redux传递过去 第二个参数是是否清空
      this.props.editorObject(dataObj, false);
      
    } else {
      // 跳转到广告编辑页
      // 第二个参数为editor 1为编辑 0为常态
      hashHistory.push("/demand/1");
      // 无法通过路由将对象传递过去 但是可以通过redux传递过去 第二个参数是是否清空
      this.props.editorObject(dataObj, false);
    }
    
  }

  // 发送私信按钮点击
  onSubmitMessageBtnClick(id) {
    prompt(
      '发送私信',
      '',
      [
        { text: '取消' },
        { text: '提交', onPress: value => {
          this.props.submitPrivateLetterData(id, value);
        } },
      ],
      '',
    )
  }

  // 生命周期函数
  componentDidMount() {
    // localStorage 中有 token 使用该token登录
    if(!localStorage.getItem("token")) {
      Toast.fail("请先登录！", 1.5);
      hashHistory.push("/");
      return;
    } else {
      this.props.getUserInfoData();
    }
    window.scrollTo(0,0);
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
        <div style={this.props.progressValue ? {display: "block"} : {display: "none"}}>
          <Progress percent={this.props.progressValue} position="fixed" />
        </div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="Title"
          footer={[{ text: '返回', onPress: () => { this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 300, overflow: 'scroll' }}>
            <p>红色：广告底图</p>
            <p>粉色：收款二维码</p>
            <div className="example-adImg">
              <div className="ditu">
                <div className="center"></div>
              </div>
            </div>
            <p style={{marginTop: "0.5rem"}}>购买前需上传广告位底图</p>
            <ImagePicker
              files={this.state.files}
              onChange={this.onChange}
              disableDelete
              selectable={this.state.files.length < 1}
            />
          </div>
        </Modal>
        <Header
          isLogin={this.props.isLogin}
          userInfo={this.props.userInfo}
          headerPage={2}
          title={this.state.page === 1 ? "广告详情" : "需求详情"}
        />
        {
          this.state.page === 1 ?
            <Content
              userInfo={this.props.userInfo}
              page = {this.state.page}
              adDetail = {this.props.adDetail}
              onCurrentImageChange={this.onCurrentImageChange.bind(this)}
              currentImagePage={this.state.currentImagePage}
              turnToEditorPage={this.turnToEditorPage.bind(this)}
              deleteAd={this.props.deleteAd}
              deleteDemand={this.props.deleteDemand}
              showModal={this.showModal}
              onSubmitMessageBtnClick={this.onSubmitMessageBtnClick.bind(this)}
            />
            :
            <Content
              userInfo={this.props.userInfo}
              page = {this.state.page}
              demandDetail = {this.props.demandDetail}
              turnToEditorPage={this.turnToEditorPage.bind(this)}
              deleteAd={this.props.deleteAd}
              deleteDemand={this.props.deleteDemand}
              showModal={this.showModal}
              onSubmitMessageBtnClick={this.onSubmitMessageBtnClick.bind(this)}
            />
        }
        <FooterDemo />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.loginReducers.userInfo,
  isLogin: state.loginReducers.isLogin,
  adDetail: state.detailReducers.adDetail,
  demandDetail: state.detailReducers.demandDetail,
  progressValue: state.adReducers.progressValue,
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
  },
  editorObject(dataObj, isClear) {
    dispatch(editorObjectAction(dataObj, isClear));
  },
  deleteAd(id) {
    dispatch(deleteAdAction(id));
  },
  deleteDemand(id) {
    dispatch(deleteDemandAction(id));
  },
  uploadAdImage(id, formData) {
    dispatch(uploadAdImageAction(id, formData))
  },
  submitPrivateLetterData(to, content) {
    dispatch(submitPrivateLetter(to, content))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
