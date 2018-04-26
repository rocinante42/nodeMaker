import React, { Component } from 'react';
import { Divider } from 'antd';
import MathJax from 'react-mathjax-preview';

const asciimath = '` sum_(i=1)^n i^3=((n(n+1))/2)^2 `'
const math = String.raw`
  <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
    <menclose notation="circle box">
      <mi> x </mi><mo> + </mo><mi> y </mi>
    </menclose>
  </math>

  $$\lim_{x \to \infty} \exp(-x) = 0$$

  ${asciimath}`

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



export default MathRenderer