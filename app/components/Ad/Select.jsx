import React from "react";
import "./style.less";
import { SearchBar, Picker, List } from 'antd-mobile';

import {address, type, traffic, price_start, price_end} from "./selectOption";


const Select = props => {
  return(
    <div>
      {
        props.page === 1 ?
          <SearchBar
            placeholder={props.isSearchFocus ? "输入id进行搜索" : "Search"}
            onFocus={ () => props.toggleFocusState() }
            onBlur={ () => props.toggleFocusState() }
            cancelText="分类搜索请点击"
            value={props.searchBarValue}
            onSubmit={ () => props.crossIdSearchAd() }
            onChange={ (value) => props.onSearchBarChange(value) }
            onCancel={() => props.openShowModal("modal1")}
            maxLength={8} />
          :
          <div>
            <Picker
              data={address}
              title="选择城市(可选)"
              cascade={false}
              extra="请选择(可选)"
              value={[props._this.state.address]}
              onChange={v => props._this.setState({ address: v[0] })}
              onOk={v => props._this.setState({ address: v[0] })}
            >
              <List.Item arrow="horizontal">城市</List.Item>
            </Picker>
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
      }
    </div>
  )
};
export default Select;
