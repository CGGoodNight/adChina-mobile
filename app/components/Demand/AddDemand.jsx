import React from "react";
import { Button, WingBlank, List, InputItem, Picker, TextareaItem  } from "antd-mobile";
import {type, time} from "../Ad/selectOption";

const AddDemand = props => {
  return (
    <div style={{ marginTop: 0 }} className="main-ad-detail">
      <WingBlank>
        <div className="title adPage">
          添加需求位
          <div className="title-more">查看我的需求 ></div>
        </div>
      </WingBlank>
      <div className="add-ad-input">
        <List>
          <InputItem 
            clear 
            placeholder="name"
            value={props._this.state.addName}
            onChange={ (value) => props._this.setState({
              addName: value
            }) }
          >
            名称
          </InputItem>

          <InputItem 
            clear 
            placeholder="phone number"
            value={props._this.state.addTel}
            onChange={ (value) => props._this.setState({
              addTel: value
            }) }
          >
            联系电话
          </InputItem>

          <InputItem 
            clear 
            placeholder="price"
            value={props._this.state.addPrice}
            onChange={ (value) => props._this.setState({
              addPrice: value
            }) }
          >
            价格
          </InputItem>

          <InputItem 
          clear 
          placeholder="visitors flow"
          value={props._this.state.addTraffic}
          onChange={ (value) => props._this.setState({
            addTraffic: value
          }) }
          >
            人流量
          </InputItem>

          <InputItem 
            clear 
            placeholder="size: 40cm*40cm"
            value={props._this.state.addSize}
            onChange={ (value) => props._this.setState({
              addSize: value
            }) }
          >
            大小
          </InputItem>

          <Picker
            data={type}
            title="选择类型"
            cascade={false}
            extra="请选择(必选)"
            value={[props._this.state.addType]}
            onChange={v => props._this.setState({ addType: v[0] })}
            onOk={v => props._this.setState({ addType: v[0] })}
          >
            <List.Item arrow="horizontal">类型</List.Item>
          </Picker>

          <Picker
            data={time}
            title="选择时间"
            cascade={false}
            extra="请选择(必选)"
            value={[props._this.state.addDay, props._this.state.addHour]}
            onChange={v => props._this.setState({ addDay: v[0], addHour: v[1] })}
            onOk={v => props._this.setState({ addDay: v[0], addHour: v[1] })}
          >
            <List.Item arrow="horizontal">营业时间</List.Item>
          </Picker>

          <TextareaItem
            title="具体详情"
            placeholder="输入详情"
            value={props._this.state.addDetail}
            onChange={ (value) => props._this.setState({
              addDetail: value
            }) }
            rows={4}
            count={100}
          />
          <div style={{height: 5, backgroundColor: "#fff"}}></div>
        </List>
        <div className="add-ad-submit">
          {
            props._this.state.isEditor ?
            <Button onClick={() => props._this.modifyDemand()} type="primary">提交</Button>
            :
            <Button onClick={() => props._this.submitDemand()} type="primary">提交</Button>

          }
          
          <Button onClick={ () => props._this.clearInputInfo() } type="warning">清空</Button>
        </div>
      </div>
    </div>
  );
};

export default AddDemand;
