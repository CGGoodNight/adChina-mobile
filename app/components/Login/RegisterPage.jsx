import React from "react";
import loginLogo from '../../../static/image/png/loginlogo.png';
import { WingBlank, Button, List, InputItem } from 'antd-mobile';

const RegisterPage = props => {
  return(
    <div className="login-box">
      <div className="login-content">
        <div className="login-logo registerPage">
          <img src={loginLogo} />
        </div>
        {/* 输入注册信息 */}
        <div className="login-input">
          <List renderHeader={() => '账号注册'}>
            <InputItem
              placeholder="请输入邮箱"
              onChange={(value) => props.onRegisterMailChange(value)}
            >
              邮箱
            </InputItem>
            <InputItem
              placeholder="请输入用户名"
              onChange={(value) => props.onRegisterUsernameChange(value)}
            >
              用户名
            </InputItem>
            <InputItem
              type="password"
              placeholder="请输入密码"
              onChange={(value) => props.onRegisterPasswordChange(value)}
            >
              密码
            </InputItem>
            <InputItem
              type="password"
              placeholder="再次输入密码"
              onChange={(value) => props.onRegisterPassword2Change(value)}
            >
              &nbsp;
            </InputItem>
            <InputItem
              placeholder="请输入验证码"
              onChange={(value) => props.onVerificationCodeChange(value)}
            >
              验证码
            </InputItem>
          </List>
          <div className="verification-code">
            {
              props.verificationCodeData === "" ?
                <p onClick={() => props.getVerificationCode()}>点击获取验证码</p>
                :
                <img onClick={() => props.getVerificationCode()} src={props.verificationCodeData.captcha_image_content} />
            }

          </div>
        </div>
        <WingBlank>
          {/* 去注册 */}
          <div className="toggle-login">
            <span onClick={() => props.togglePage()}>已有账号？去登录</span>
          </div>
          {/* 注册按钮 */}
          <div className="login-register-btn">
            <Button onClick={() => props.registerBtnClick()} type="warning"><strong>注 册</strong></Button>
          </div>
        </WingBlank>
      </div>
    </div>
  )
};
export default RegisterPage;
