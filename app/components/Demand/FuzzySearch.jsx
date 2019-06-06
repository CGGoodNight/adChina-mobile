import React from 'react';
import { Picker, List } from 'antd-mobile';
import {type, traffic, price_start, price_end} from "../Ad/selectOption";

const FuzzySearch = props => {
  return (
    <div>
      <Picker
        data={type}
        title="选择类型(可选)"
        cascade={false}
        extra="请选择(可选)"
        value={[props._this.state.type]}
        onChange={v => props._this.setState({ type: v[0] })}
        onOk={v => props._this.setState({ type: v[0] })}
      >
        <List.Item arrow="horizontal">类型</List.Item>
      </Picker>
      <Picker
        data={traffic}
        title="选择人流量(可选)"
        cascade={false}
        extra="请选择(可选)"
        value={[props._this.state.traffic]}
        onChange={v => props._this.setState({ traffic: v[0] })}
        onOk={v => props._this.setState({ traffic: v[0] })}
      >
        <List.Item arrow="horizontal">人流量</List.Item>
      </Picker>
      <Picker
        data={price_start}
        title="最低价(可选)"
        cascade={false}
        extra="请选择(可选)"
        value={[props._this.state.price_start]}
        onChange={v => props._this.setState({ price_start: v[0] })}
        onOk={v => props._this.setState({ price_start: v[0] })}
      >
        <List.Item arrow="horizontal">最低价</List.Item>
      </Picker>
      <Picker
        data={price_end}
        title="最高价(可选)"
        cascade={false}
        extra="请选择(可选)"
        value={[props._this.state.price_end]}
        onChange={v => props._this.setState({ price_end: v[0] })}
        onOk={v => props._this.setState({ price_end: v[0] })}
      >
        <List.Item arrow="horizontal">最高价</List.Item>
      </Picker>
    </div>
  );
}

export default FuzzySearch;