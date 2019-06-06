import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {hashHistory} from "react-router";
// tabber
import Tabber from "../../components/Common/Tabbar";
import { getUserInfoAction } from '../../actions/loginActions';
import {getMyAdAction, getMyDemandAction, submitMyModifyInfoAction, uploadQRCodeAction, uploadAvatarAction} from "../../actions/myActions";

import Avatar from '../../components/My/Avatar';
import MyControl from "../../components/My/MyControl";
import NoLogin from "../../components/My/NoLogin";

import { LoadMore } from 'react-weui';


import { Modal, Button, Toast, ImagePicker, Progress } from 'antd-mobile';
const prompt = Modal.prompt;
const alert = Modal.alert;

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



class My extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      files: [],
      files2: [],
    }
  }


  // 修改个人信息的Modal
  showModal1 = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
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
  // 修改个人信息的Modal

  // 修改个人信息
  submitMyModifyInfo(name, address, qrcode) {
    Toast.loading("正在上传...", 10, () => {
      Toast.fail("上传失败！", 1.2);
    });
    this.props.submitMyModifyInfoData(name, address, qrcode);
  }

  // 上传头像
  onChange2 = (files, type, index) => {
    if(index === 0) {
      this.setState({
        files2: []
      });
      return;
    }
    let file = files[0].file;
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
              files2: files
            });
            this.props.uploadAvatarData(formData);
            Toast.loading("正在上传，可在顶部查看上传进度...", 999, () => {
              Toast.fail("上传失败！", 1.2);
            });    
          } },
        ])
      } else {
        let formData = new FormData();
        formData.append('file', file);
        this.setState({
          files2: files
        });
        this.props.uploadAvatarData(formData);
        Toast.loading("正在上传，可在顶部查看上传进度...", 999, () => {
          Toast.fail("上传失败！", 1.2);
        });
      }
    } else {
      Toast.fail("上传的图片格式必须是jpg，jpeg，png其中的一种哟~");
      return false;
    }
  };
  // 收款二维码上传的时候先将图片上传到服务器保存
  onChange = (files, type, index) => {
    if(index === 0) {
      this.setState({
        files: []
      });
      return;
    }
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
            _that.props.uploadQRCode(_that.props.userInfo.name, _that.props.userInfo.address,formData);
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
        _that.props.uploadQRCode(_that.props.userInfo.name, _that.props.userInfo.address,formData);
        Toast.loading("正在上传...", 10, () => {
          Toast.fail("上传失败！", 1.2);
        });
      }
    } else {
      Toast.fail("上传的图片格式必须是jpg，jpeg，png其中的一种哟~");
      return false;
    }
  };

  // 当手风琴改变的时候
  onPanelChange(key) {
    // 未登录的时候不能点击手风琴
    if(!this.props.isLogin) {
      alert('操作失败', '必须登录才能进行操作，是否登录？', [
        { text: '取消', onPress: () => {} },
        { text: '前往', onPress: () => hashHistory.push("/login") },
      ]);
      return;
    }

    if(key.length === 0) {
      // 全部关闭的时候
    } else {
      // 0.个人中心 1.我的广告 2.我的需求 3.私信列表 4.订单列表 5.系统信息
      switch (parseInt(key[0])) {
        case 0: {
          break;
        }
        case 1: {
          this.props.getMyAdData();
          break;
        }
        case 2: {
          this.props.getMyDemandData();
          break;
        }
        case 3: {
          break;
        }
        case 4: {
          break;
        }
        case 5: {
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  // 未登录的时候点击头像跳转到登录页
  turnToLoginPage() {
    hashHistory.push('/login');
  }

  // 生命周期函数
  componentDidMount() {
    // localStorage 中有 token 使用该token登录
    if(localStorage.getItem("token")) {
      this.props.getUserInfoData();
    }
  }

  render() {
    const { files, files2 } = this.state;
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
          title="选择修改的项目"
          footer={[{ text: 'Ok', onPress: () => { 
            this.onClose('modal1')();
            this.setState({
              files: [],
              files2: []
            })
          } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: "15rem", overflow: 'scroll' }}>
            <Button
              onClick={() => prompt('修改用户名', '', [
                { text: '取消' },
                { text: '提交', onPress: value => this.submitMyModifyInfo(value, this.props.userInfo.address, this.props.userInfo.qrcode) },
              ])}
            >用户名</Button>
            <Button
              onClick={() => prompt('修改地址', '', [
                { text: '取消' },
                { text: '提交', onPress: value => this.submitMyModifyInfo(this.props.userInfo.name, value, this.props.userInfo.qrcode) },
              ])}
              style={{margin: "10px 0"}}
            >地址</Button>
            <div>
              <h4>上传/修改头像</h4>
              <ImagePicker
                files={files2}
                onChange={this.onChange2}
                selectable={files2.length < 1}
              />
            </div>
            <div>
              <h4>上传/修改收款二维码</h4>
              <ImagePicker
                files={files}
                onChange={this.onChange}
                selectable={files.length < 1}
              />
            </div>
          </div>
        </Modal>
        {
          localStorage.getItem("token") ?
            this.props.isLogin ?
              <Avatar
                userInfo={this.props.userInfo}
              />
              :
              <div>
                <div className="my-header">
                  <p>
                    个人中心
                  </p>
                </div>
                <LoadMore loading>正在获取数据...</LoadMore>
              </div>


            :
            <NoLogin
              turnToLoginPage={this.turnToLoginPage.bind(this)}
            />

        }


        <MyControl
          onPanelChange={this.onPanelChange.bind(this)}
          userInfo={this.props.userInfo}
          myAd={this.props.myAd}
          myDemand={this.props.myDemand}

          showModal1={this.showModal1}
        />
        <div className="bottom-white"></div>
        <Tabber page="my" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.loginReducers.userInfo,
  isLogin: state.loginReducers.isLogin,
  myAd: state.myReducers.myAd,
  myDemand: state.myReducers.myDemand,
  progressValue: state.adReducers.progressValue
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfoData() {
    dispatch(getUserInfoAction());
  },
  getMyAdData() {
    dispatch(getMyAdAction());
  },
  getMyDemandData() {
    dispatch(getMyDemandAction());
  },
  submitMyModifyInfoData(name, address, qrcode) {
    dispatch(submitMyModifyInfoAction(name, address, qrcode));
  },
  uploadQRCode(name, address, formData) {
    dispatch(uploadQRCodeAction(name, address, formData));
  },
  uploadAvatarData(formData) {
    dispatch(uploadAvatarAction(formData));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(My);
