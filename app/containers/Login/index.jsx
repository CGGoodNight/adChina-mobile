import React, { PureComponent } from 'react';
import { Toast } from 'antd-mobile';
import {hashHistory} from "react-router";
import { connect } from 'react-redux';

// 登录页的actions文件
import {getVerificationCodeAction, registerUserAction, destroyVerificationCodeDataAction, turnToLoginPageAction , loginUserAction} from "../../actions/loginActions";

// 引入登录页和注册页的组件
import LoginPage from "../../components/Login/LoginPage";
import RegisterPage from "../../components/Login/RegisterPage";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // true 为登录页 false 为注册页
      isLoginPage: true,

      // 登录页输入框的内容
      loginMail: "",
      loginPassword: "",

      // 注册页输入框的内容
      registerMail: "",
      registerUsername: "",
      registerPassword: "",
      registerPassword2: "",
      verificationCode: ""

    }
  }

  // 用于改变为登录页还是注册页的函数
  togglePage() {
    // 每次切换页面时将验证码数据销毁
    this.props.destroyVerificationCodeData();
    this.setState({
      isLoginPage: !this.state.isLoginPage,
      // 由于state与input双向绑定 所以切换页面时需要清空loginMail
      loginMail: ""
    })
  }

  // 登录页输入框变化时触发的函数（但state改变，value不会变，只实现了loginMail与input双向绑定）
  onLoginMailChange(value) {
    this.setState({
      loginMail: value
    })
  }
  onLoginPasswordChange(value) {
    this.setState({
      loginPassword: value
    })
  }

  // 注册页输入框变化时触发的函数（但state改变，value不会变）
  onRegisterMailChange(value) {
    this.setState({
      registerMail: value
    })
  }
  onRegisterUsernameChange(value) {
    this.setState({
      registerUsername: value
    })
  }
  onRegisterPasswordChange(value) {
    this.setState({
      registerPassword: value
    })
  }
  onRegisterPassword2Change(value) {
    this.setState({
      registerPassword2: value
    })
  }
  onVerificationCodeChange(value) {
    this.setState({
      verificationCode: value
    })
  }

  // 获取注册所需的验证码
  getVerificationCode() {
    if(this.state.registerMail === "") {
      Toast.fail('请输入邮箱', 1.2);
    } else {
      this.props.getVerificationCode(this.state.registerMail);
    }
  }

  // 注册和登录按钮点击
  registerBtnClick() {
    // 检查用户输入的是否符合规范
    if(this.state.registerMail === "") {
      Toast.fail('请输入邮箱地址', 1.2);
    } else if (this.state.registerUsername === "") {
      Toast.fail('请输入用户名', 1.2);
    } else if(this.state.registerPassword === "") {
      Toast.fail('请输入密码', 1.2);
    } else if(this.state.registerPassword2 === "") {
      Toast.fail('请输入重复密码', 1.2);
    } else if(this.state.verificationCode === "") {
      Toast.fail('请输入验证码', 1.2);
    } else if(this.props.verificationCodeData === "") {
      Toast.fail('请先获取验证码', 1.2);
    } else{
      if(this.state.registerPassword === this.state.registerPassword2) {
        this.props.registerUser(
          this.state.registerMail,
          this.state.registerUsername,
          this.state.registerPassword,
          this.state.registerPassword2,
          this.state.verificationCode,
          this.props.verificationCodeData.captcha_key
        );
        // 提供了 全局销毁函数 Toast.hide() 所以设置60s是为了用户体验，在注册成功后调用销毁即可
        Toast.loading('正在注册...', 60);
      } else {
        Toast.fail('两次输入的密码不一致', 1.2);
      }
    }
  }
  loginBtnClick() {
    // 检查用户输入的是否符合规范
    if(this.state.loginMail === "") {
      Toast.fail('请输入邮箱地址', 1.2);
    } else if(this.state.loginPassword === "") {
      Toast.fail('请输入密码', 1.2);
    } else {
      this.props.loginUser(this.state.loginMail, this.state.loginPassword);
    }
  }

  // 生命周期函数
  componentDidMount() {
    if(localStorage.getItem("token")) {
      hashHistory.push("/");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 注册成功后跳转到登录页 并将刚刚注册的邮箱放到input上去的代码
    if(this.props.turnToLoginPage === true) {
      this.setState({
        loginMail: this.props.registerMail,
        isLoginPage: true
      });
      // 将页面跳转和注册号码完成后 重新调用跳转登录页的action将turnToLoginPage改为false
      this.props.cancelTurnToLoginPage();
    }
  }

  render() {
    return (
      <div>
        {
          // 通过 this.state.isLoginPage 来判断显示是登录页还是注册页
          this.state.isLoginPage ?
            <LoginPage
              togglePage={this.togglePage.bind(this)}

              onLoginMailChange={this.onLoginMailChange.bind(this)}
              onLoginPasswordChange={this.onLoginPasswordChange.bind(this)}

              loginMail={this.state.loginMail}
              loginBtnClick={this.loginBtnClick.bind(this)}
            />
              :
            <RegisterPage
              togglePage={this.togglePage.bind(this)}

              onRegisterMailChange={this.onRegisterMailChange.bind(this)}
              onRegisterUsernameChange={this.onRegisterUsernameChange.bind(this)}
              onRegisterPasswordChange={this.onRegisterPasswordChange.bind(this)}
              onRegisterPassword2Change={this.onRegisterPassword2Change.bind(this)}
              onVerificationCodeChange={this.onVerificationCodeChange.bind(this)}

              getVerificationCode={this.getVerificationCode.bind(this)}
              verificationCodeData={this.props.verificationCodeData}

              registerBtnClick={this.registerBtnClick.bind(this)}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  verificationCodeData: state.loginReducers.verificationCodeData,
  turnToLoginPage: state.loginReducers.turnToLoginPage,
  registerMail: state.loginReducers.registerMail
});

const mapDispatchToProps = (dispatch) => ({
  getVerificationCode(email) {
    dispatch(getVerificationCodeAction(email));
  },
  registerUser(email, username, password, password2, verificationCode, captcha_key) {
    dispatch(registerUserAction(email, username, password, password2, verificationCode, captcha_key));
  },
  destroyVerificationCodeData() {
    dispatch(destroyVerificationCodeDataAction());
  },
  cancelTurnToLoginPage() {
    dispatch(turnToLoginPageAction());
  },
  loginUser(email, password) {
    dispatch(loginUserAction(email, password));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
