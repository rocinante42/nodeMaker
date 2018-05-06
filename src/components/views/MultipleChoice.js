import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import JsonRenderer from './../JsonRenderer';
import MultipleChoiceCardRenderer from './../MultipleChoice';

// This function returns the coordenates of x and y on a table depending of the index and number of col
const calculatePosition = (id, cols) => {
  return {
    x: ((id + cols ) % cols),
    y: Math.floor(id/cols)
  }
}

const mapContent = (arr, kind) => {
  let response = [];
  arr.map((v, i)=>{
    response.push(v[kind]);
  });
  return response;
}

class MultipleChoice extends Component {

  jsonLayout = {
    "5aee1ae480aee2c9d28a4251": {
      "data": {
        "value": [
        ]
      },
    }
  }

  constructor(props){
    super();
    this.state = {
      json: this.jsonLayout,
      nodeId: "5aee1ae480aee2c9d28a4251",
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
        "input_options": [],
        "jaxLayout": [
          {
            "i": i,
            "x": 0,
            "y": 0,
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
    let json = {...this.state.json};
    json[this.state.nodeId]["data"]["value"][i] = this.answerBuilder(i, v);
    this.setState({json: json});
  }

  changeContent = (i, c) => {
    let json = {...this.state.json};
    json[this.state.nodeId]["setup"+i]["jaxLayout"][0]["jaxDisplay"]["jaxContent"] = c;
    this.setState({json: json});
  }
  inputOption = (i, arr) => {
    let json = {...this.state.json};
    json[this.state.nodeId]["setup"+i]["input_options"] = arr;
    console.log(json[this.state.nodeId]["setup"+i]["input_options"])
    this.setState({json: json});
  }
  /******ADD ELEMENT ********/
  addElement = () => {
    console.log("adding element")
    let json = {...this.state.json};
    let elements = this.state.elements;
    let newSetup = this.setupBuilder(elements)
    json[this.state.nodeId] = {...this.state.json[this.state.nodeId], ...newSetup};
    json[this.state.nodeId]["data"]["value"][elements] = this.answerBuilder(elements);
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
              <MultipleChoiceCardRenderer 
                columns={this.state.columns} 
                elements={this.state.elements}
                changeAnswer={this.changeAnswer}
                changeContent={this.changeContent}
                inputOption={this.inputOption}
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

export default MultipleChoice;