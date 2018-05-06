import React, { Component } from 'react';
import { Button, Row, Col, InputNumber, Card } from 'antd';
import JsonRenderer from './../JsonRenderer';
import MultipleSelectRenderer from './../MultipleSelect';


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

class MultipleSelectPage extends Component {
  jsonTemplate = {
      "5abe6437c405a2a419bebe8f": {
        "setup": {
          "display": "JaxGrid",
          "grid_columns": 1,
          "disallow_click": false,
          "jaxLayout": [],
          "input_type": "optionOk",
          "shuffle": {
            "type": "row",
            "indices": [
              0,
              1,
              2
            ]
        },    
      },
      "answer": {
        "random": [
          {
          }
        ]
      }
    }
  }
  // INITIAL STATE
  constructor(props) {
    super();
    this.state= {
      nodeId: "5abe6437c405a2a419bebe8f",
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
      "i": "quest"+id,
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

  answerBuilder = (i, v=true) => {
    let answer = {["quest"+i]: v}
    return answer;
  }

  changeAnswer = (i, v) => {
    let json = {...this.state.json}
    json[this.state.nodeId]["answer"]["random"][0] = {...json[this.state.nodeId]["answer"]["random"][0], ...this.answerBuilder(i, v)}
    this.setState({json: json})
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
    json[this.state.nodeId]["answer"]["random"][0] = {...json[this.state.nodeId]["answer"]["random"][0],...this.answerBuilder(id)}
    id++;
    this.setState({json: json, elements: id});
  }

  getFlagFromJson = (id) => {
    const flag = this.state.json[this.state.nodeId]["answer"]["random"][0]["quest"+id];
    return flag;
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
     feedback_elements : mapContent(obj["back"]["jaxContent"], "content").length,
     flag: this.getFlagFromJson(id)
    }
    return response;
  }
/************RENDER METHOD******************/
  render(){
    const json = this.state.json;
    return(
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Row>
          <Col span={20}>
            <Row>
              <div>       
                  {this.state.cols_flag ? null : <Card card_title="settings"> <NumberCols cols_flag={this.state.cols_flag} setColumns={this.setColumns} changeCols={this.changeCols}/> </Card>}
                <br />
                
              </div>
            </Row>
            <Row>
              <MultipleSelectRenderer
                elements={this.state.elements} 
                columns={this.state.cols}
                input_size={100/this.state.cols}
                changeContent={this.changeQuestionContent}
                changeContentFeedback={this.changeContentFeedback}
                refreshState={this.refreshCardState}
                changeAnswer={this.changeAnswer} />
            </Row>
            <Row>
              <br />
              <Button disabled={!this.state.cols_flag} onClick={this.addElement} type="default">Add Element</Button>
            </Row>
          </Col>
          <Col span={4}><JsonRenderer json={json} /></Col>
        </Row>
        <br />
      </div>
    );
  }
}

export default MultipleSelectPage;