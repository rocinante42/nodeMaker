import React, {Component} from 'react';
import {Row, Col} from 'antd'
import CardRenderer from './../CardRenderer';

const contents = ["hola a todos", "x^2"];
const types = ["text", "math"];

class Test extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={12} >
            <CardRenderer 
              index={1} 
              card_title="Title"
              elements={3}
              hasFlag
              hasFeedback
              hasPreview
            />
          </Col>
        </Row>
      </div>
  );
  }
}

export default Test;
