import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import JsonRenderer from './../JsonRenderer';
import MultipleSelect from './../MultipleSelect';

class MultipleSelectPage extends Component {

  jsonTemplate = {
    "5abe6437c405a2a419bebe8f": {
      "setup": {
        "display": "JaxGrid",
        "grid_columns": 3,
        "removeClick": false,
        "jaxLayout": []
      },
      "answer": {
        "random": [{}]
      }
    }
  }

  constructor(props) {
    super();
    this.state = {
      json: this.jsonTemplate,
      nodeId: "5abe6437c405a2a419bebe8f",
      elements: 0
    }
  }

  questionBuilder = (i, type = "text", content = "***insert content here****") => {
    let x = (i + 2) % 3
    let y = Math.round((i + 1) / 3) - 1
    let obj = {
      "i": "quest" + (i - 1),
      "x": x,
      "y": y,
      "h": 1,
      "w": 1,
      "static": true,
      "jaxDisplay": {
        "jaxType": "ascii",
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

  answerBuilder = (i, a = "true") => {
    let obj = {
      ["quest" + i]: a
    }
    return obj;
  }

  addQuestion = () => {
    let _json = { ...this.state.json };
    let i = this.state.elements + 1;
    let new_question = this.questionBuilder(i);
    _json[this.state.nodeId]["setup"]["jaxLayout"][i - 1] = new_question;
    let new_answer = this.answerBuilder(i - 1)
    _json[this.state.nodeId]["answer"]["random"][0] = { ..._json[this.state.nodeId]["answer"]["random"][0], ...new_answer }
    this.setState({ json: _json, elements: i });
    console.log("I'm adding stuff");
  }

  changeQuestionTitle = () => {

  }

  render() {
    const json = this.state.json;
    return (
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Row>
          <Col span={12}>
            <div>
              <h3>Edit True False Node: </h3>
              <MultipleSelect
                elements={this.state.elements}
              />
              <br />
              <Button onClick={this.addQuestion} type="default">Add Element</Button>
            </div>
          </Col>
          <Col span={12}><JsonRenderer json={json} /></Col>
        </Row>
      </div>
    )
  }
}

export default MultipleSelectPage;