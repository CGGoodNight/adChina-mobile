import React from "react";
import { List, InputItem, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';

import {type} from "../Ad/selectOption";
// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class AccurateSearch extends React.Component {
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <List>

          <Picker
            data={type}
            title="选择类型(可选)"
            cascade={false}
            extra="请选择(可选)"
            value={[this.props._this.state.type]}
            onChange={v => this.props._this.setState({ type: v[0] })}
            onOk={v =>this.props._this.setState({ type: v[0] })}
          >
            <List.Item arrow="horizontal">类型</List.Item>
          </Picker>

          <InputItem
            type={'money'}
            defaultValue={0}
            value={this.props._this.state.price_start}
            onChange={(v) => { 
              if(v === "") {
                this.props._this.setState({ price_start: 0 }) 
              } else {
                this.props._this.setState({ price_start: parseInt(v) })
              }
            }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >最低价</InputItem>

          <InputItem
            type={'money'}
            defaultValue={0}
            value={this.props._this.state.price_end}
            onChange={(v) => { 
              if(v === "") {
                this.props._this.setState({ price_end: 0 }) 
              } else {
                this.props._this.setState({ price_end: parseInt(v) })
              }
            }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >最高价</InputItem>

          <InputItem
            type={'money'}
            defaultValue={0}
            value={this.props._this.state.traffic}
            onChange={(v) => { 
              if(v === "") {
                this.props._this.setState({ traffic: 0 }) 
              } else {
                this.props._this.setState({ traffic: parseInt(v) })
              }
            }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >人流量</InputItem>
        </List>
      </div>
    );
  }
}

const AccurateSearchWrapper = createForm()(AccurateSearch);
export default AccurateSearchWrapper;