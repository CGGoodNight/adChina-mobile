import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {hashHistory} from "react-router";
import {
  Tab,
  TabBody,
  NavBar,
  NavBarItem,
  Article,
  LoadMore
} from 'react-weui';
import { Modal, WingBlank, Toast, Progress } from 'antd-mobile';
const alert = Modal.alert;

// tabber
import Tabber from "../../components/Common/Tabbar";
import Select from "../../components/Ad/Select";
import ExactFindWrapper from "../../components/Ad/ExactFind";
import AdItem from "../../components/Ad/AdItem";
import AddAd from "../../components/Ad/AddAd";
//Actions
import {
  getSearchAdAction, 
  onSearchPageChangeAction, 
  crossIdSearchAdAction, 
  uploadAdImageAction,
  clearImageUrl,
  submitAdAction,
  modifyAdAction
} from "../../actions/adActions";
import {editorObjectAction} from "../../actions/detailActions";

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

class Ad extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      modal1: false,
      modal2: false,
      // TODO:用户的搜索需求 由于ant design mobile组件的原因返回的都是 数组数据 发送的时候需要改造一下[数据]
      type: "",
      traffic: 0,
      price_start: 0,
      price_end: 0,
      address: "",

      // 当前是否是显示的全部广告页
      isAllAd: false,
      // 当前搜索框是否聚焦
      isSearchFocus: false,
      // 搜索框的值
      searchBarValue: "",

      // EditorAd
      isEditor: false,
      modifyId: 0,

      //AddAd
      addName: "",
      addTel: "",
      addAddress: "",
      addPrice: "",
      addTraffic: "",
      addSize: "",
      addType: "",
      addDay: "0",
      addHour: "0",
      addDetail: "",
      uploadImg: [],

      files: []
    }
  }

  // 点击searchBar的分类搜索按钮后触发showModal

  openShowModal(key) {
    alert('选择搜索条件', "", [
      { text: '模糊搜索', onPress: () => this.showModal(key) },
      { text: '精确搜索', onPress: () => this.showModal('modal2') },
      { text: '返回', onPress: () => {} },
    ])
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

  // 跳转到详情页
  turnToDetailPage(id) {
    hashHistory.push(`/detail/1/${id}`);
  }

  // 分页器发生变化
  onPageChange(page) {
    let pageSize = 12;
    let start = pageSize * (page - 1);
    let end = page * pageSize;
    this.props.onSearchPageChange(start, end);
  }

  // 搜索框的聚焦与失去焦点
  toggleFocusState() {
    this.setState({
      isSearchFocus: !this.state.isSearchFocus
    });
  }

  // 根据id搜索广告
  crossIdSearchAd() {
    let oldId = this.state.searchBarValue;
    let id = 0;
    id = parseInt(oldId);
    // 使用两个等号是为了防止parseInt只将中间的非数字去掉
    if(id == oldId) {
      Toast.loading("获取数据中...", 10, () => {
        Toast.fail("获取失败", 1.2);
      });
      this.props.crossIdSearchAdData(this.state.searchBarValue);
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

  // ModifyAd
  modifyAd() {
    Toast.loading("上传中...", 999, () => {
      Toast.fail("上传失败！", 1.2);
    });
    this.props.modifyAdData(this.state);
  }

  // AddAd
  // 广告图片上传触发
  onFilesChange = (files, type, index) => {

    let file = files[this.state.uploadImg.length].file;

    // 检查上传的图片是否符合格式
    if(file.type.indexOf("jpeg") > -1 || file.type.indexOf("jpg") > -1 || file.type.indexOf("png") > -1) {
      if(file.name.indexOf("JPEG") > -1 || file.name.indexOf("JPG") > -1 || file.name.indexOf("PNG") > -1) {
        Toast.fail("上传的图片格式后缀名小写哟~", 1.5);
        return false;
      }
      if(file.size/1024 > 1025) {
        alert('文件过大', '文件太大可能导致上传速度慢，请耐心等候...', [
          { text: '取消上传', onPress: () => {} },
          { text: '继续上传', onPress: () => {
            let formData = new FormData();
            formData.append('file', file);
            this.setState({
              files,
            });
            this.props.uploadAdImage(formData);  
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
        this.props.uploadAdImage(formData);  
        Toast.loading("上传中，可在顶部查看上传进度...", 999, () => {
          Toast.fail("上传失败！", 1.2);
        });    
      }

    } else {
      Toast.fail("上传的图片格式必须是jpg，jpeg，png其中的一种哟~", 1.5);
      return false;
    }
  };

  // 提交广告位
  submitAd() {
    // 所有选项的不能为空
    let isSuccess = true;
    this.state.addName === "" ? isSuccess=false : "";
    this.state.addTel === "" ? isSuccess=false : "";
    this.state.addAddress === "" ? isSuccess=false : "";
    this.state.addPrice === "" ? isSuccess=false : "";
    this.state.addTraffic === "" ? isSuccess=false : "";
    this.state.addSize === "" ? isSuccess=false : "";
    this.state.addType === "" ? isSuccess=false : "";
    this.state.addDay === "0" ? isSuccess=false : "";
    this.state.addHour === "0" ? isSuccess=false : "";
    this.state.addDetail === "" ? isSuccess=false : "";
    this.state.uploadImg.length === 0 ? isSuccess=false : "";

    if(isSuccess) {
      this.props.submitAdData(this.state);
      Toast.loading("正在上传...", 10, () => {
        Toast.fail("上传失败！", 1.2);
      });
    } else {
      Toast.fail("以上都为必填项，请全部输入后提交~", 2);
    }
  }

  // 清空输入的添加广告位的信息
  clearInputInfo() {
    this.setState({
      addName: "",
      addTel: "",
      addAddress: "",
      addPrice: "",
      addTraffic: "",
      addSize: "",
      addType: "",
      addDay: "0",
      addHour: "0",
      addDetail: "",
      uploadImg: []
    })
  }

  // 生命周期函数
  componentDidMount() {

    // 如果是进入编辑页就不用在获取所有的广告，直接跳转
    if(this.props.params.editor === "1") {

      let editorObj = this.props.editorObj;
      //判断是否为空 解决不想修改返回到搜索tab0时报错的现象
      if(JSON.stringify(editorObj) == "{}") {
        // 获取所有广告
        this.props.getSearchAdData(this.state);
        this.setState({
          isAllAd: true
        });
        return;
      }
      // antd mobile组件的显示图片
      let filesData = [];
      editorObj.images.map((item, index) => {
        let obj = {
          url: `http://images.adchina.club/${item.image}`
        };
        filesData.push(obj);
      });

      // uploadImg是存放的{ "" , ""} 而原始数据是对象数组
      let uploadImage = [];
      editorObj.images.map((item, index) => {
        uploadImage.push(item.image);
      });
      this.setState({
        tab: 1,
        //EditorAd
        isEditor: true,
        modifyId: editorObj.info_id,
        addName: editorObj.name,
        addTel: editorObj.tel,
        addAddress: editorObj.address,
        addPrice: editorObj.price,
        addTraffic: editorObj.traffic,
        addSize: editorObj.maxArea,
        addType: editorObj.type,
        addDay: `${editorObj.exposureDay}`,
        addHour: `${editorObj.exposureHour}`,
        addDetail: `${editorObj.content}`,
        uploadImg: uploadImage,

        files: filesData
      });
      this.props.clearEditorObject();

    } else {
      // 获取所有广告
      this.props.getSearchAdData(this.state);
      this.setState({
        isAllAd: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.uploadImgUrl !== "") {
      this.setState({
        uploadImg: [...this.state.uploadImg, this.props.uploadImgUrl]
      });
      this.props.clearImgUrl();
    }

  }

  render() {
    if(this.props.allSearchAd.length === 0) {
      return (
        <div>
          <LoadMore loading>正在获取数据...</LoadMore>
        </div>
      )
    }
    return (
      <div className="ad-box">
        {/* 上传广告进度条 */}
        <div style={this.props.progressValue ? {display: "block"} : {display: "none"}}>
          <Progress percent={this.props.progressValue} position="fixed" />
        </div>
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
            this.props.getSearchAdData(this.state);
            this.onClose('modal1')();
            // 重置下state的值 延迟下 关闭modal需要动画时间
            setTimeout(() => {
              this.setState({
                type: "",
                traffic: 0,
                price_start: 0,
                price_end: 0,
                address: "",
                isAllAd: false
              });
            }, 200);
            } }]
          }
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: "40vh", overflow: 'scroll' }}>
            <Select
              _this={this}
              page={2}
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
            this.props.getSearchAdData(this.state);
            this.onClose('modal2')();
            // 重置下state的值 延迟下 关闭modal需要动画时间
            setTimeout(() => {
              this.setState({
                type: "",
                traffic: 0,
                price_start: 0,
                price_end: 0,
                address: "",
                isAllAd: false
              });
            }, 200);
            } }]
          }
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: "40vh", overflow: 'scroll' }}>
            <ExactFindWrapper
              _this={this}
            />
          </div>
        </Modal>
        <Tab>
          <NavBar>
            <NavBarItem active={this.state.tab == 0} onClick={e=>this.setState({tab:0})}>搜索广告</NavBarItem>
            <NavBarItem active={this.state.tab == 1} onClick={e=>this.setState({tab:1})}>添加广告</NavBarItem>
          </NavBar>
          <TabBody>
            <Article style={{display: this.state.tab == 0 ? null : 'none'}}>
              <Select
                page={1}
                isSearchFocus={this.state.isSearchFocus}
                toggleFocusState={this.toggleFocusState.bind(this)}
                searchBarValue={this.state.searchBarValue}
                onSearchBarChange={this.onSearchBarChange.bind(this)}
                crossIdSearchAd={this.crossIdSearchAd.bind(this)}
                openShowModal={this.openShowModal.bind(this)}
              />

              <AdItem
                adList={this.props.displaySearchAd}
                allSearchAd={this.props.allSearchAd}
                isAllAd={this.state.isAllAd}
                turnToDetailPage={this.turnToDetailPage.bind(this)}
                onPageChange={this.onPageChange.bind(this)}
              />
              
            </Article>
            <Article style={{display: this.state.tab == 1 ? null : 'none'}}>
              <AddAd
                files={this.state.files}
                onFilesChange={this.onFilesChange.bind(this)}
                _this={this}
              />
            </Article>
          </TabBody>
        </Tab>
        <div className="bottom-white"></div>
        <Tabber page="ad" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  displaySearchAd: state.adReducers.displaySearchAd,
  allSearchAd: state.adReducers.allSearchAd,
  uploadImgUrl: state.adReducers.uploadImgUrl,
  progressValue: state.adReducers.progressValue,
  editorObj: state.detailReducers.editorObj
});

const mapDispatchToProps = (dispatch) => ({
  getSearchAdData(dataObj) {
    dispatch(getSearchAdAction(dataObj));
  },
  onSearchPageChange(start, end) {
    dispatch(onSearchPageChangeAction(start, end));
  },
  crossIdSearchAdData(id) {
    dispatch(crossIdSearchAdAction(id))
  },
  uploadAdImage(formData) {
    dispatch(uploadAdImageAction(formData));
  },
  clearImgUrl() {
    dispatch(clearImageUrl());
  },
  submitAdData(dataObj) {
    dispatch(submitAdAction(dataObj));
  },
  modifyAdData(dataObj) {
    dispatch(modifyAdAction(dataObj));
  },
  clearEditorObject() {
    dispatch(editorObjectAction({}, true));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ad);
