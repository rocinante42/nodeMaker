import React, { Component } from 'react';
import { Divider } from 'antd';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax-preview';

const PlainText = (props) => {
  return(
    <div>
      <p>{props.content}</p>
    </div>
  )
}

const MapContent = (types, content) => {
  var _content = []
  content.map((v, i)=>{
    _content.push( (types[i]=="math") ? <MathJax key={i} math={"`" + v + "`"}/> : <PlainText key={i} content={v} />  )
  })
  return _content;
}

class MathRenderer extends Component {
  render() {
    //const {clientWidth, clientHeight} = this.containerNode;
    return (
      <div ref={input => {this.myRenderer = input}}>
        <Divider style={{ fontSize: "12px" }}>
          {this.props.title || 'Preview'}
        </Divider>
        <div>
          {MapContent(this.props.types, this.props.contents)}
        </div>
      </div >
    )
  }
}

MathRenderer.propTypes = {
  types: PropTypes.array,
  contents: PropTypes.array.isRequired,
  title: PropTypes.string
}



export default MathRenderer