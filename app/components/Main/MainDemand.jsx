import React from "react";
import { WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { Page ,Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';

const MainDemand = props => {
  return(
    <div>
      <div className="main-ad-detail">
        <WingBlank>
          <div className="title">
            热门需求位
            <span className="iconfont icon-remen">
            </span>
            <div className="title-more">
              更多需求 >
            </div>
          </div>
        </WingBlank>
      </div>
      {
        props.demandList.map((item, index) => (
          <div key={index}>
            <Preview>
              <PreviewHeader>
                <PreviewItem label="Price" value={`￥${item.price}`} />
              </PreviewHeader>
              <PreviewBody>
                <PreviewItem label="需求名称" value={item.name} />
                <PreviewItem label="发布人" value={item.user_name} />
                <PreviewItem label="详情内容" value={item.content} />
              </PreviewBody>
              <PreviewFooter>
                <PreviewButton primary onClick={() => {props.turnToDetailPage(false, item.info_id)}}>查看详情></PreviewButton>
              </PreviewFooter>
            </Preview>
            <WhiteSpace></WhiteSpace>
          </div>
        ))
      }
      <Button>点击查看更多</Button>
    </div>
  )
};
export default MainDemand;
