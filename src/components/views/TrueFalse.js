import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import JsonRenderer from './../JsonRenderer';
import TrueFalseForm from './../TrueFalse'


class TrueFalse extends Component {

  jsonLayout = {
    "5ab6996fc405a2a419bebe8d": {
      "questions": {
        "random": []
      }
    }
  }

  constructor(props) {
    super();
    this.state = {
      nodeId: "5ab6996fc405a2a419bebe8d",
      json: this.jsonLayout,
      elements: 0
    }
  }

  setupBuilder = (i, type = "text", content = "***content here***") => {
    let obj = {
      ["setup" + i]: {
        "jaxContent": [
          {
            "type": type,
            "content": content
          }
        ]
      }
    }
    return obj;
  }
  answerBuilder = (i, v = "true") => {
    let obj = [("setup" + i), "" + v];
    return obj;
  }
  addElement = () => {
    console.log("Hello there")
    let _json = { ...this.state.json };
    let i = this.state.elements + 1;
    let new_setup = this.setupBuilder(i);
    let new_answer = this.answerBuilder(i);
    // injecting a new setup with default values
    _json[this.state.nodeId] = { ...this.state.json[this.state.nodeId], ...new_setup };
    //injecting a new answer with default values
    _json[this.state.nodeId]["questions"]["random"].push(new_answer);
    this.setState({ json: _json, elements: i });
  }

  //Change the answer to true or false
  changeAnswer = (isTrue, i) => {
    let _json = { ...this.state.json };
    _json[this.state.nodeId]["questions"]["random"][i][1] = "" + !isTrue;
    this.setState({ json: _json });
  }

  //Change the type of the content from the question
  changeQuestionType = (type, i) => {
    let _json = { ...this.state.json };
    _json[this.state.nodeId][("setup" + i)]["jaxContent"][0]["type"] = type;
    this.setState({ json: _json });
  }

  changeQuestionContent = (content, i) => {
    let _json = { ...this.state.json };
    _json[this.state.nodeId][("setup" + i)]["jaxContent"][0]["content"] = content;
    this.setState({ json: _json });
  }
  render() {
    const json = this.state.json
    return (
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Row>
          <Col span={12}>
            <div>
              <h3>Edit True False Node: </h3>
              <TrueFalseForm
                elements={this.state.elements}
                changeAnswer={this.changeAnswer}
                changeQuestionType={this.changeQuestionType}
                changeQuestionContent={this.changeQuestionContent}
              />
              <br />
              <Button onClick={this.addElement} type="default">Add Element</Button>
            </div>
          </Col>
          <Col span={12}><JsonRenderer json={json} /></Col>
        </Row>
        <br />
      </div>
    )
  }
}

export default TrueFalse;