import React, { Component } from 'react';
import { Row, Col, Card, Input, Cascader, Switch } from 'antd';
import MathRenderer from './../MathRenderer';

class MultipleSelectCard extends Component {
  constructor(props) {
    super();
    this.state = {
      switch: true,
      content: "",
      type: "text"
    }
  }
  onChangeSwitch = () => {
    this.setState({ switch: !this.state.switch })
    this.props.changeAnswer(this.state.switch, this.props.index)
  }
  changeQuestionType = (value) => {
    this.props.changeQuestionType(value[0], this.props.index + 1);
    this.setState({ type: value[0] });
  }
  changeQuestionContent = (event) => {
    const content = event.target.value
    this.props.changeQuestionContent(content, this.props.index + 1);
    this.setState({ content: content });
  }
  render() {
    let options = [
      {
        label: "Text",
        value: "text",
        index: this.props.index
      },
      {
        label: "Math",
        value: "math",
        index: this.props.index
      }
    ]
    let fontSize = "14px"
    return (
      <Col span={24}>
        <Card title={"Quest" + (this.props.index + 1)}>
          <Row>
            <Col style={{ fontSize: fontSize }} span={5}>
              Title Type:
            </Col>
            <Col span={19}>
              <Cascader
                onChange={this.changeQuestionType}
                data-type="title"
                default="text"
                data-index={this.props.index}
                placeholder="Please select"
                options={options}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col style={{ fontSize: fontSize }} span={5}>
              Content:
            </Col>
            <Col span={19}>
              <Input data-type="title" data-index={this.props.index} placeholder="Title here" onChange={this.changeQuestionContent} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col style={{ fontSize: fontSize }} span={5}>
              {"answer is " + this.state.switch}:
              </Col>
            <Col span={19}>
              <Switch defaultChecked onChange={this.onChangeSwitch} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24} >
              <MathRenderer type={this.state.type} content={this.state.content} />
            </Col>
          </Row>
        </Card>
      </Col>
    )
  }
}

class MultipleSelect extends Component {


  RenderMultipleCard = (props) => {
    let a = [];
    for (var i = 0; i < props.elements; i++) {
      a.push(<MultipleSelectCard
        key={i}
        index={i}
        changeAnswer={props.changeAnswer}
        changeQuestionType={props.changeQuestionType}
        changeQuestionContent={props.changeQuestionContent}
      />)
    }
    return a;
  }

  render() {
    return (
      <div>
        {
          this.RenderMultipleCard(this.props)
        }
      </div>
    )
  }
}

export default MultipleSelect;