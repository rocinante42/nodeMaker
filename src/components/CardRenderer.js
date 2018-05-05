import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import  {
          Card, 
          Button, 
          Input, 
          Select, 
          Row,
          Col,
          Switch,
          Divider
        } from 'antd';
import MathRenderer from './MathRenderer';

const InputGroup = Input.Group;
const Option = Select.Option;

class ContentForm extends Component { 
  changeContent = (event) => {
    this.props.changeCardContent(this.props.index, event.target.value, this.props.type);
  }
  changeType = (option) => {
    this.props.changeType(this.props.index, option, this.props.type);
  }
  render(){
    const input = this.props.content;
    const type= this.props.content_type
    return(
      <div>
        <InputGroup compact>
          <Select onSelect={this.changeType} defaultValue={type}>
              <Option value="text">Text</Option>
              <Option value="math">Math</Option>
          </Select>
          <Input
            style={{ maxWidth: this.props.input_size }}
            type="text"
            placeholder="Content Here"
            onChange={this.changeContent}
            value={input}
          />
        </InputGroup>
      </div>
    )
  }
}

const TrueFalse = (props) => {
  return(
    <div>
      <br />
      <Row>
        {`Content is ${props.flag}: `}
        <Switch defaultChecked onChange={props.changeFlag}/>
      </Row>
    </div>
  )
}

const renderContentForm = (content, content_type, props, elements, type="content",  addLine=true, changeCardContent=function(){}, changeType=function(){}) => {
  let arr2 = [];
  for (var i=0; i<elements; i++){
    arr2.push(<ContentForm content={content[i]} content_type={content_type[i]} input_size={props.input_size} type={type} changeType={changeType} changeCardContent={changeCardContent} key={"form"+i} {...props} index={i}/>)
  }
  if (addLine) {
    arr2.push(<div key="add_line" ><br /><Button onClick={addLine} icon="plus" shape="circle"></Button></div>)
  }
  return arr2;
}

class CardRenderer extends Component {
  constructor(props) {
    super();
    this.state = {
      types: [],
      contents: [],
      feedback_types: [],
      feedback_contents: [],
      flag: true,
      elements: 1,
      feedback_elements: 1,
    }
  }
  componentDidMount() {
    this.refreshState();
  }
  finalContent = (contents, types) => {
    let arr = []
    contents.map((v, i)=>{
      arr.push({"type": types[i], "content": v, })
    });
    return arr;
  }
  finalType = (types, contents) => {
    let arr =[]
    types.map((v, i) => {
      arr.push({"type": v, "content": contents[i]})
    })
    return arr
  }
  changeFlag = () => {
    this.props.flagFunction(this.props.index, !this.state.flag)
    this.setState({flag: !this.state.flag});
    // this.props.hasFlag(this.state.flag);
  }
  addLine = () => {
    let types = [...this.state.types];
    types.push("text");
    this.setState({elements: this.state.elements + 1, types: types});
  }
  addFeedbackLine = () => {
    let feedback_types = [...this.state.feedback_types]
    feedback_types.push("text")
    this.setState({feedback_elements: this.state.feedback_elements+1, feedback_types: feedback_types});
  }
  changeCardContent = (id, value, type="content") => {
    var contents = [];
    (type === "content") ?  contents = [...this.state.contents] : contents = [...this.state.feedback_contents]
    contents[id] = value;
    if (type === "content") { 
      this.setState({contents: contents});
      if (this.props.changeContent) {
        this.props.changeContent(this.props.index, this.finalContent(contents, this.state.types));
      }
    } else {
      this.setState({feedback_contents: contents})
      if (this.props.changeContentFeedback) {
        this.props.changeContentFeedback(this.props.index, this.finalContent(contents, this.state.feedback_types));
      }
    }
  }
  changeType = (id, value, type="content") => {
    var types = [];
    (type === "content") ?  types = [...this.state.types] : types = [...this.state.feedback_types]
    types[id] = value;
    if (type === "content") { 
      this.setState({types: types})
      this.props.changeContent(this.props.index, this.finalType(types, this.state.contents)) 
    } else { 
      this.setState({feedback_types: types})
      this.props.changeContentFeedback(this.props.index, this.finalType(types, this.state.feedback_contents))
    }    
  }
  refreshState = () => {
    const obj = this.props.refreshState(this.props.index)
    this.setState({...this.state, ...obj})
  }
  render() {
    const title = this.props.index != "" ? this.props.card_title+(this.props.index+1) : this.props.card_title;
    return(
      <div>
        <Card title={title}>
        {this.props.refresh ? <Button onClick={this.refreshState}>Refresh State</Button> : null}
          {this.props.children ? <Row>{this.props.children}</Row> : null}
          <Row>
            <Col span={this.props.hasFeedback ? 12 : 24}>
            {`${title}'s type and content:`}
            <br /><br />
            {renderContentForm(this.state.contents, this.state.types, this.props, this.state.elements, "content", this.addLine, this.changeCardContent, this.changeType)}
            </Col>
            {this.props.hasFeedback ? 
              <Col span={12}>{`${title}'s Feedback:`}<br /><br />{renderContentForm(this.state.feedback_contents, this.state.feedback_types, this.props, this.state.feedback_elements, "feedback", this.addFeedbackLine, this.changeCardContent, this.changeType)}</Col> 
              : null 
            }
          </Row>
          {this.props.hasFlag ? <TrueFalse changeFlag={this.changeFlag} flag={this.state.flag} /> : null}
          {this.props.hasPreview ? <Row>
            <Divider />
            <Col span={this.props.hasFeedback ? 12 : 24}>
              <MathRenderer title="content preview" types={this.state.types} contents={this.state.contents} />
            </Col>
            {this.props.hasFeedback ? 
              <Col span={12}>
                <MathRenderer title="feedback preview" types={this.state.feedback_types} contents={this.state.feedback_contents} />
              </Col> 
              : null 
            }
          </Row> : null}
        </Card>
      </div>
    )
  }
}
CardRenderer.propTypes = {
  index: PropTypes.any.isRequired,
  types: PropTypes.array.isRequired,
  contents: PropTypes.array.isRequired,
  card_title: PropTypes.string.isRequired,
  elements: PropTypes.number.isRequired,
  hasFeedback: PropTypes.bool,
  hasFlag: PropTypes.bool,
  input_size: PropTypes.number,
  hasPreview: PropTypes.bool,
  refreshState: PropTypes.func.isRequired
}
CardRenderer.defaultProps = {
  hasFlag: false,
  hasFeedback: false,
  hasPreview: false,
  input_size: 100,
  index: 0,
  refreshState: function(){},
  refresh: false,
  flagFunction: function(){}
}

export default CardRenderer;