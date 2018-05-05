import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import JsonRenderer from './../JsonRenderer';
import TrueFalse2CardRenderer from './../TrueFalse2';

class TrueFalse extends Component {

  jsonLayout = {
    "5ab6996fc405a2a419bebe8d": {
      "questions": {
        "random": [
        ]
      },
    }
  }

  constructor(props){
    super();
    this.state = {
      json: this.jsonLayout,
      nodeId: "5ab6996fc405a2a419bebe8d",
      elements: 0,
      columns: 1
    }
  }
  /******BUILDERS HERE ******/

  setupBuilder = (i, content="", type="text") => {
    let obj = {
        ["setup"+i]: {
        "display": "JaxGrid",
        "grid_columns": 1,
        "jaxLayout": [
          {
            "i": i,
            "x": i,
            "y": 1,
            "h": 1,
            "w": 1,
            "jaxDisplay": {
              "jaxContent": [
                {
                  "type": type,
                  "content": content
                }
              ]
            }
          }
        ]
      }
    }
    return obj;
  }
  answerBuilder = (i, v="true") => {
    let answer = [
      ("setup"+i),
      ""+v
    ]
    return answer;
  }
  /****CONTENT CHANGERS ********/

  changeAnswer = (i, v) => {
    let json = {...this.state.json}
    json[this.state.nodeId]["questions"]["random"][i] = this.answerBuilder(i, v);
    this.setState({json: json});
  }

  changeContent = (i, c) => {
    let json = {...this.state.json}
    json[this.state.nodeId]["setup"+i]["jaxLayout"][0]["jaxDisplay"]["jaxContent"] = c;
    this.setState({json: json});
  }
  /******ADD ELEMENT ********/
  addElement = () => {
    console.log("adding element")
    let json = {...this.state.json};
    let elements = this.state.elements;
    let newSetup = this.setupBuilder(elements)
    json[this.state.nodeId] = {...this.state.json[this.state.nodeId], ...newSetup};
    json[this.state.nodeId]["questions"]["random"][elements] = this.answerBuilder(elements);
    elements++;
    this.setState({json: json, elements: elements});
  }

  render(){
    const json = this.state.json;
    return(
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Row>
          <Col span={18}>
            <Row>
              <TrueFalse2CardRenderer 
                columns={this.state.columns} 
                elements={this.state.elements}
                changeAnswer={this.changeAnswer}
                changeContent={this.changeContent}
              />
            </Row>
            <Row>
              <br />
              <Button disabled={false} onClick={this.addElement} type="default">Add Setup</Button>
            </Row>
          </Col>
          <Col span={6}><JsonRenderer json={json} /></Col>
        </Row>
        <br />
      </div>
    )
  }

}

export default TrueFalse