import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import JsonRenderer from './../JsonRenderer';
import MatchStatementsForm from './../MatchStatements/MatchStatementsForm';


class MatchStatemets extends Component {

  templateId = "5abe6c68c405a2a419bebe91"

  defaultTemplate = {
    "5abe6c68c405a2a419bebe91": {
      "setup": {
        "display": "JaxGrid",
        "grid_columns": 2,
        "jaxAnswerType": "layout",
        "input_type": "optionOk",
        "jaxLayout": []
      },
      "answer": {
        "random": []
      }
    }
  }

  constructor(props) {
    super();
    this.state = {
      elements: 0,
      titles: [],
      questions: [],
      answers: {},
      json: this.defaultTemplate
    }
  }

  answerBuilder = (position) => {
    let obj = { "y": (position - 1) }
    return obj;
  }

  titleBuilder = (c, t, i) => {
    let obj = {
      "i": "title" + i,
      "x": 0,
      "y": i - 1,
      "h": 1,
      "w": 1,
      "static": true,
      "jaxDisplay": {
        "jaxType": "ascii",
        "jaxContent": [
          {
            "type": t,
            "content": c
          }
        ]
      }
    }
    return obj;
  }

  questionBuilder = (c, t, i) => {
    let obj = {
      "i": "quest" + i,
      "x": 1,
      "y": i - 1,
      "h": 1,
      "w": 1,
      "static": false,
      "jaxDisplay": {
        "jaxType": "ascii",
        "jaxContent": [
          {
            "type": t,
            "content": c
          }
        ]
      }
    }
    return obj;
  }

  changeTitle = (v, i) => {
    let _json = this.state.json;
    let _titles = this.state.titles;
    _titles[i]["jaxDisplay"]["jaxContent"][0]["content"] = v;
    _json[this.templateId]["setup"]["jaxLayout"] = [..._titles, ...this.state.questions]
    this.setState({ json: _json });
  }
  changeTitleType = (v, i) => {
    let _json = this.state.json;
    let _titles = this.state.titles;
    if (v) {
      _titles[i]["jaxDisplay"]["jaxContent"][0]["type"] = v;
    } else {
      _titles[i]["jaxDisplay"]["jaxContent"][0]["type"] = "text";
    }

    _json[this.templateId]["setup"]["jaxLayout"] = [..._titles, ...this.state.questions]
    this.setState({ json: _json });
  }

  changeQuestionType = (v, i) => {
    let _json = this.state.json;
    let _questions = this.state.questions;
    _questions[i]["jaxDisplay"]["jaxContent"][0]["type"] = v;
    _json[this.templateId]["setup"]["jaxLayout"] = [...this.state.titles, ..._questions]
    this.setState({ json: _json });
  }

  addQuestionLine = () => {

  }

  addTitleLine = () => {
    
  }

  changeQuestion = (v, i) => {
    let _json = this.state.json;
    let _questions = this.state.questions;
    _questions[i]["jaxDisplay"]["jaxContent"][0]["content"] = v;
    _json[this.templateId]["setup"]["jaxLayout"] = [...this.state.titles, ..._questions]
    this.setState({ json: _json });
  }

  addElement = () => {
    let default_title_text = "***Default Title Content***";
    let default_title_type = "text";
    let i = this.state.elements + 1;
    let _json = this.state.json;
    // adding a new title
    let _titles = this.state.titles;
    _titles[i - 1] = this.titleBuilder(default_title_text, default_title_type, i)
    // adding a new question
    let _questions = this.state.questions;
    _questions[i - 1] = this.questionBuilder(default_title_text, default_title_type, i)
    //mergin titles and questions
    _json[this.templateId]["setup"]["jaxLayout"] = [..._titles, ..._questions]
    //adding answer 
    let _answers = this.state.answers;
    _answers[("quest" + i)] = this.answerBuilder(i);
    _json[this.templateId]["answer"]["random"][0] = { ..._answers }
    this.setState({ json: _json, elements: i });
  }

  render() {

    let json = this.state.json;
    return (
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Row>
          <Col span={16}>
            <div>
              <h3>Edit Match Statement Node: </h3>
              <MatchStatementsForm
                elements={this.state.elements}
                changeQuestion={this.changeQuestion}
                changeQuestionType={this.changeQuestionType}
                changeTitle={this.changeTitle}
                changeTitleType={this.changeTitleType}
              />
              <br />
              <Button onClick={this.addElement} type="default">Add Element</Button>
            </div>
          </Col>
          <Col span={8}><JsonRenderer json={json} /></Col>
        </Row>
        <br />
      </div>
    );
  }
}

export default MatchStatemets;