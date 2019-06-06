import React from "react";
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';

const MainDemand = props => {
  return(
    <div>
      <div style={{height: "2.75rem", marginTop: 0}} className="main-ad-detail">
        <WingBlank>
          <div className="title">
            {
              props.isAllDemand ? "所有需求位" : "搜索到的广告"
            }
            <div style={{bottom: "-0.7rem"}} className="title-more">
              查看我的需求 >
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
    </div>
  )
};
export default MainDemand;
