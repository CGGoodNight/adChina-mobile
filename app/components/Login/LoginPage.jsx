import React from "react";
import { WingBlank, List, InputItem, Button } from 'antd-mobile';
import loginLogo from "../../../static/image/png/loginlogo.png";
import {hashHistory} from "react-router";
import "./style.less";

const LoginPage = props => {
  return(
    <div className="login-box">
      <div className="login-content">
        <div className="login-logo">
          <img src={loginLogo} />
        </div>
        {/* 输入账号和密码 */}
        <div className="login-input">
          <List renderHeader={() => '账号密码登录'}>
            <InputItem
              placeholder="请输入邮箱"
              value={props.loginMail}
              onChange={(value) => props.onLoginMailChange(value)}
            >
              邮箱
            </InputItem>
            <InputItem
              type="password"
              placeholder="请输入密码"
              onChange={(value) => props.onLoginPasswordChange(value)}
              onVirtualKeyboardConfirm={() => {
                props.loginBtnClick();
              }}

            >
              密码
            </InputItem>
          </List>
        </div>
        <WingBlank>
          {/* 去注册 */}
          <div className="toggle-login">
            <span onClick={() => props.togglePage()}>没有账号？去注册</span>
          </div>
          {/* 登录按钮 */}
          <div className="login-register-btn">
            <Button onClick={() => props.loginBtnClick()} type="warning"><strong>登 录</strong></Button>
            <Button style={{marginTop: "0.5rem"}} onClick={() => hashHistory.goBack()}><strong>返 回</strong></Button>
          </div>
        </WingBlank>
      </div>
    </div>
  )
};
export default LoginPage;
