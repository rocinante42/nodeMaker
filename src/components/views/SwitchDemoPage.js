import React, {Component} from 'react';
import {Layout, Row, Col} from 'antd';
import SwitchDemo from './../SwitchDemo';

const {Content} = Layout;

class SwitchDemoPage extends Component {
  render() {
    return (
      <Content
        style={{
        padding: 'auto auto',
        margin: 'auto auto 0'
      }}>
        <Row type="flex" justify="center" align="middle">
          <Col span={12} type="flex">
            <SwitchDemo style={{
              margin: '0 auto'
            }}/></Col>
        </Row>
      </Content>
    )
  }
}

export default SwitchDemoPage;
