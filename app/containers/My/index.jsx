import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {hashHistory} from "react-router";
// tabber
import Tabber from "../../components/Common/Tabbar";
import FooterDemo from "../../components/Common/FooterDemo";
import { getUserInfoAction, exitLoginAction } from '../../actions/loginActions';
import {
  getMyAdAction, 
  getMyDemandAction, 
  submitMyModifyInfoAction, 
  uploadQRCodeAction, 
  uploadAvatarAction, 
  getMyOrderAction,
  changeOrderStateAction,
  changeOrderStateToPayAction,
  downloadBaseImageAction,
  viewSellerImageAction,
  uploadAdImageAction,
  getSystemInfoAction,
  getMessageAction,
  getMessageDetailAction,
  getMessageDetail,
  submitReplyContentAction
} from "../../actions/myActions";

import MyHeader from '../../components/My/MyHeader';
import NoLogin from "../../components/My/NoLogin";
import MyContent from "../../components/My/MyContent";

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
      // 1.广告 2.需求 3. 订单 4.私信 5.个人中心 6.系统信息
      page: 5,
      // 订单页获取
      isBuyPage: true,
      // 防止用户多次点击
      closeBtn: false,
      // 系统信息是否是详情页
      isSystemInfoDetail: false,
      // 私信列表是否处于详情页
      isMessageDetail: false,
      // 私信列表回复内容
      replyContent: ""

    }
  }
  // 当回复内容框里内容改变时
  onReplyContentChange (value) {
    this.setState({
      replyContent: value
    })
  }
  // 当回复按钮点击的时候
  onReplyBtnClick(id) {
    this.props.submitReplyContentData(id ,this.state.replyContent);
  }
  // 私信全部列表点击进入私信详情列表
  messageToDetailClick(id) {
    this.setState({
      isMessageDetail: true
    });
    this.props.getMessageDetailData(id);
  }
  // 返回全部私信列表
  goBackMessageTotal() {
    this.setState({
      isMessageDetail: false
    });
    this.props.clearMessageDetail();
  }

  // 跳转到系统信息详情
  turnToSystemInfoDetail(id) {
    this.props.getSystemInfo(true, id);
    this.setState({
      isSystemInfoDetail: true
    })
  }

  // 获取订单数据
  getMyOrder(v) {
    this.setState({
      isBuyPage: v[0]
    }, () => {
      this.props.getMyOrderData(this.state.isBuyPage);
    })
  }
  onOrderPageChange(v) {
    this.setState({
      isBuyPage: v[0]
    });
  }
  // 改变订单状态
  onOrderStateChange(order_id) {
    if(this.props.userInfo.qrcode === "images.adchina.club/") {
      Toast.fail("亲，需要去个人中心上传收款二维码图片才能继续进行操作哟");
      return;
    }
    this.setState({
      closeBtn: true
    });
    setTimeout(() => {
      this.setState({
        closeBtn: false
      });
    }, 20000)
    this.props.changeOrderState(order_id);
  }

  // 支付单独改变状态
  onOrderStateChangeTopayData(order_id) {
    if(this.props.userInfo.qrcode === "images.adchina.club/") {
      info("亲，需要去个人中心上传收款二维码图片才能继续进行操作哟");
      return;
    }
    this.props.onOrderStateChangeTopay(order_id);
  }

  // 上传效果图
  sellerUploadImg(order_id) {
    let _that = this;
    let input = document.getElementById("sellerUpload");
    input.click();
    input.onchange = function() {
      let file = this.files[0];
      let formData = new FormData(input);
      formData.append('file', file);
      _that.props.uploadAdImage(formData, order_id);
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

  // 当header里面的图片点击时候触发
  onFunIconClick(page) {
    if(page === 1) {
      this.props.getMyAdData();
    }
    if(page === 2) {
      this.props.getMyDemandData();
    }
    if(page === 3) {
      this.props.getMyOrderData(true);
      this.setState({
        isBuyPage: true
      });
    }
    if(page === 4) {
      this.props.getMessageData();
    }
    if(page === 6) {
      this.props.getSystemInfo(false, "");
      this.setState({
        isSystemInfoDetail: false
      })
    }
    this.setState({
      page
    });
  }

  // 未登录的时候点击头像跳转到登录页
  turnToLoginPage() {
    hashHistory.push('/login');
  }

  // 退出登陆
  exitLoginClick() {
    this.props.exitLogin();
  }

  // 生命周期函数
  componentDidMount() {
    window.scrollTo(0,0);
    // localStorage 中有 token 使用该token登录
    if(!localStorage.getItem("token")) {
      
    } else {
      this.props.getUserInfoData();
    }
    if(this.props.params.page) {
      setTimeout(() => {
        this.onFunIconClick(parseInt(this.props.params.page));
      }, 200);
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
              <MyHeader
                userInfo={this.props.userInfo}
                onFunIconClick={this.onFunIconClick.bind(this)}
                showModal1={this.showModal1}
              >
                666
              </MyHeader>
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


        {
          this.props.isLogin ?
            <MyContent
              page = {this.state.page}
              myAd={this.props.myAd}
              myDemand={this.props.myDemand}
              myOrder={this.props.myOrder}
              userInfo={this.props.userInfo}
              systemInfo={this.props.systemInfo}
              exitLoginClick={this.exitLoginClick.bind(this)}
              getMyOrder={this.getMyOrder.bind(this)}
              isBuyPage={this.state.isBuyPage}
              onOrderPageChange={this.onOrderPageChange.bind(this)}
              onOrderStateChange={this.onOrderStateChange.bind(this)}
              onOrderStateChangeTopayData={this.onOrderStateChangeTopayData.bind(this)}
              downloadBaseImage={this.props.downloadBaseImage}
              viewSellerImage={this.props.viewSellerImage}
              sellerUploadImg={this.sellerUploadImg.bind(this)}
              closeBtn={this.state.closeBtn}
              isSystemInfoDetail={this.state.isSystemInfoDetail}
              turnToSystemInfoDetail={this.turnToSystemInfoDetail.bind(this)}
              totalMessage={this.props.totalMessage}
              isMessageDetail={this.state.isMessageDetail}
              messageToDetailClick={this.messageToDetailClick.bind(this)}
              detailMessage={this.props.detailMessage}
              goBackMessageTotal={this.goBackMessageTotal.bind(this)}
              onReplyContentChange={this.onReplyContentChange.bind(this)}
              replyContent = {this.state.replyContent}
              onReplyBtnClick = {this.onReplyBtnClick.bind(this)}
            />
          :
          ""
        }
        <input style={{display: "none"}} type="file" id="sellerUpload"/>
        <FooterDemo />
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
  progressValue: state.adReducers.progressValue,
  myOrder: state.myReducers.myOrder,
  systemInfo: state.myReducers.systemInfo,
  totalMessage: state.myReducers.totalMessage,
  detailMessage: state.myReducers.detailMessage
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
  },
  exitLogin() {
    dispatch(exitLoginAction());
  },
  getMyOrderData(isBuyPage) {
    dispatch(getMyOrderAction(isBuyPage))
  },
  changeOrderState(order_id) {
    dispatch(changeOrderStateAction(order_id));
  },
  onOrderStateChangeTopay(order_id) {
    dispatch(changeOrderStateToPayAction(order_id));
  },
  downloadBaseImage(order_id) {
    dispatch(downloadBaseImageAction(order_id));
  },
  viewSellerImage(order_id) {
    dispatch(viewSellerImageAction(order_id));
  },
  uploadAdImage(formData, order_id) {
    dispatch(uploadAdImageAction(formData, order_id));
  },
  getSystemInfo(isSearch, value) {
    dispatch(getSystemInfoAction(isSearch, value));
  },
  getMessageData() {
    dispatch(getMessageAction());
  },
  getMessageDetailData(id) {
    dispatch(getMessageDetailAction(id));
  },
  clearMessageDetail() {
    dispatch(getMessageDetail([], true));
  },
  submitReplyContentData(id, content) {
    dispatch(submitReplyContentAction(id, content))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(My);
