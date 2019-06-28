import React from 'react';
import {
    Footer,
    FooterText,
    FooterLinks,
    FooterLink
} from 'react-weui';

const FooterDemo = props => {
  return (
    <div style={{padding: "1rem 0"}}>
      <Footer>
        <FooterLinks>
            <FooterLink href="http://www.beian.miit.gov.cn">渝ICP备18005245号-3</FooterLink>
        </FooterLinks>
        <FooterText>Copyright &copy; 2019 adchina.club</FooterText>
      </Footer>
    </div>
  );
}

export default FooterDemo;