import React, { Component } from 'react';
import { Button, Row, Col, InputNumber } from 'antd';
import JsonRenderer from './../JsonRenderer';
import CardRenderer from './../CardRenderer';
import Definition from './../Definition';

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

// React stateless component that renders a input number for changing the number of columns
const NumberCols =  (props) => {
  return(
    <div>
        <p>Number of columns</p>
        <InputNumber min={1} max={3} defaultValue={1} onChange={props.changeCols} />
        <Button onClick={props.setColumns}>Set</Button>
    </div>
  )
}

class DefinitionPage extends Component {
  jsonTemplate = {
    "5accec7e6ff4260819ee59a4": {
      "setup": {
        "display": "JaxGrid",
        "grid_columns": 1,
        "disallow_click": false,
        "jaxLayout": [],
        "input_type": "optionOk",
      }
    }
  }
  // INITIAL STATE
  constructor(props) {
    super();
    this.state= {
      nodeId: "5accec7e6ff4260819ee59a4",
      json: this.jsonTemplate,
      cols: 1,
      elements: 0,
      cols_flag: false
    }
  }
  /********* BUILDERS HERE **************/
  commentBuilder = (comment) => {
    return {"value": comment}
  }
  questionBuilder = (id, cols) => {
    let obj = {
      "i": "quest"+(id+1),
      "x": calculatePosition(id, cols).x, 
      "y": calculatePosition(id, cols).y,
      "h": 1,
      "w": 1,
      "static": false,
      "displayType": "card",
      "front": {
        "jaxType": "ascii",
        "jaxContent": [
        ]
      },
      "back": {
        "jaxType": "ascii",
        "jaxContent": []
      }
    }
    return obj;
  }
  /*********CHANGE METHODS HERE**********/

  setColumns = () => {
    this.setState({cols_flag: true});
  }

  reformatPositions = (arr, cols) => {
    let arr2 = [...arr]
    arr2.map((v, i) =>{
      arr2[i]["x"] = calculatePosition(i, cols).x;
      arr2[i]["y"] = calculatePosition(i, cols).y;
    });
    return arr2;
  }
  changeComments = (id, arr) => {
    let _json = {...this.state.json}
    arr.map((v, i)=>{
      _json[this.state.nodeId]["comment"+(i+1)] = this.commentBuilder(v.content);
    })
    this.setState({json: _json});
  }
  changeCols = (number) => {
    this.setState({cols: number})
    let _json = {...this.state.json}
    _json[this.state.nodeId]["setup"]["grid_columns"] = number;
    _json[this.state.nodeId]["setup"]["jaxLayout"] = this.reformatPositions(_json[this.state.nodeId]["setup"]["jaxLayout"], number)
    this.setState({json: _json, cols: number});
  }
  changeQuestionContent = (i, content) => {
    let _json = {...this.state.json}
    _json[this.state.nodeId]["setup"]["jaxLayout"][i]["front"]["jaxContent"] = content;
    this.setState({json: _json});
  }
  changeContentFeedback =(i, content) => {
    let _json = {...this.state.json}
    _json[this.state.nodeId]["setup"]["jaxLayout"][i]["back"]["jaxContent"] = content;
    this.setState({json: _json});
  }
  /********ADD NEW ELEMENT *****************/
  addElement = () => {
    let json = {...this.state.json}
    let id = this.state.elements;
    json[this.state.nodeId]["setup"]["jaxLayout"][id] = this.questionBuilder(id, this.state.cols);
    id++;
    this.setState({json: json, elements: id});
  }

  refreshCardState = (id) => {
    let json = {...this.state.json}
    let obj = {...json[this.state.nodeId]["setup"]["jaxLayout"][id]};
    let response = {
     contents : mapContent(obj["front"]["jaxContent"], "content"),
     types : mapContent(obj["front"]["jaxContent"], "type"),
     feedback_contents : mapContent(obj["back"]["jaxContent"], "content"),
     feedback_types :  mapContent(obj["back"]["jaxContent"], "type"),
     elements : mapContent(obj["front"]["jaxContent"], "content").length,
     feedback_elements : mapContent(obj["back"]["jaxContent"], "content").length
    }
    return response;
  }
/************RENDER METHOD******************/
  render(){
    const json = this.state.json;
    return(
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Row>
          <Col span={12}>
            <Row>
              <div>
                <CardRenderer 
                card_title="settings"
                input_size={300}
                changeContent={this.changeComments}
                hasFlag={false}
                hasFeedback={false}
                >
                  {this.state.cols_flag ? null :<NumberCols cols_flag={this.state.cols_flag} setColumns={this.setColumns} changeCols={this.changeCols}/>}
                <br />
                </CardRenderer>
              </div>
            </Row>
            <Row>
              <Definition
                elements={this.state.elements} 
                columns={this.state.cols}
                input_size={100/this.state.cols}
                changeContent={this.changeQuestionContent}
                changeContentFeedback={this.changeContentFeedback}
                refreshState={this.refreshCardState}
              />
            </Row>
            <Row>
              <br />
              <Button disabled={!this.state.cols_flag} onClick={this.addElement} type="default">Add Element</Button>
            </Row>
          </Col>
          <Col span={12}><JsonRenderer json={json} /></Col>
        </Row>
        <br />
      </div>
    );
  }
}

export default DefinitionPage;


