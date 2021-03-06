import React, { Component } from 'react';
import { Row, Col, Card, Input, Cascader } from 'antd';
import MathRenderer from './../MathRenderer';

class TitleQuestionCard extends Component {

  constructor(props) {
    super();
    this.state = {
      titleContent: "",
      titleType: "text",
      questionType: "text",
      index: "",
      questionContent: ""
    }
  }

  changeValue = (event) => {
    if (event.target.dataset.type === "title") {
      this.props.changeTitle(event.target.value, event.target.dataset.index);
      this.setState({titleContent: event.target.value})
    }
    else if (event.target.dataset.type === "question") {
      this.props.changeQuestion(event.target.value, event.target.dataset.index);
      this.setState({questionContent: event.target.value})
    }
    else
      console.log("ERROR, NO CARD TYPE ADDED");
  }

  changeTitleType = (value, options) => {
    this.props.changeTitleType(value[0], options[0]["index"])
    this.setState({titleType: value[0]})
  }

  changeQuestionType = (value, options) => {
    this.props.changeQuestionType(value[0], options[0]["index"])
    this.setState({questionType: value[0]})
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
    let fontSize = "10px"
    return (
      <Row>
        <Col span={12}>
          <Card title={"Title" + (this.props.index + 1)}>
            <Row>
              <Col style={{ fontSize: fontSize }} span={5}>
                Title Type:
              </Col>
              <Col span={19}>
                <Cascader
                  onChange={this.changeTitleType}
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
                Title Content:
              </Col>
              <Col span={19}>
                <Input data-type="title" data-index={this.props.index} placeholder="Title here" onChange={this.changeValue} />
              </Col>
            </Row>
            <br />
          <Row>
            <Col span={24} >
              <MathRenderer type={this.state.titleType} content={this.state.titleContent} />
            </Col>
          </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={"Quest" + (this.props.index + 1)}>
            <Row>
              <Col style={{ fontSize: fontSize }} span={5}>
                Question Type:
              </Col>
              <Col span={19}>
                <Cascader
                  onChange={this.changeQuestionType}
                  placeholder="Please select"
                  options={options}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col style={{ fontSize: fontSize }} span={5}>
                Question Content:
              </Col>
              <Col span={19}>
                <Input data-type="question" data-index={this.props.index} placeholder="Question here" onChange={this.changeValue} />
              </Col>
            </Row>
            <br />
          <Row>
            <Col span={24} >
              <MathRenderer type={this.state.questionType} content={this.state.questionContent} />
            </Col>
          </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}



class MatchStatementsForm extends Component {

  RenderQuestionTitle = (props) => {
    let a = [];
    for (var i = 0; i < props.elements; i++) {
      a.push(<TitleQuestionCard
        key={i}
        index={i}
        changeQuestionType={props.changeQuestionType}
        changeQuestion={props.changeQuestion}
        changeTitle={props.changeTitle}
        changeTitleType={props.changeTitleType}
      />)
    }
    return a;
  }

  render() {
    return (
      <div>
        {
          this.RenderQuestionTitle(this.props)
        }
      </div>
    )
  }
}

export default MatchStatementsForm;