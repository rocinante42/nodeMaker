import React, { Component } from 'react';
import { Divider } from 'antd';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax-preview';

class MathRenderer extends Component {
  render() {
    return (
      <div>
        <Divider style={{ fontSize: "12px" }}>
          Content Preview
        </Divider>
        <div>
          {(this.props.type === "math") ? <MathJax math={"`" + this.props.content + "`"} /> : <p>{this.props.content}</p>}
        </div>
      </div >
    )
  }
}

MathRenderer.propTypes = {
  type: PropTypes.string,
  content: PropTypes.string.isRequired
}



export default MathRenderer