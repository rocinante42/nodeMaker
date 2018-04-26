import React, { Component } from 'react';
import { Button } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { vs } from 'react-syntax-highlighter/styles/prism';
import PropTypes from 'prop-types';

const CustomCode = (props) => {
  return (
    <div>{props.children}</div>
  )
}


class JsonRenderer extends Component {
  copyClipboard = (event) => {
    var _select = document.getElementsByTagName("code1");
    _select.select();
    document.execCommand('copy');
  }
  render() {
    let _json = JSON.stringify(this.props.json, null, 2);
    return (
      <div style={{ textAlign: "left", overflowY: "scroll" }}>
        <div style={{ textAlign: "right" }}>
          <br />
          <Button icon="copy" onClick={this.copyClipboard}>Copy</Button>
        </div>
        <SyntaxHighlighter CodeTag={"code1"} showLineNumbers language='javascript' style={vs}>{_json}</SyntaxHighlighter>
      </div>
    )
  }
}

JsonRenderer.propTypes = {
  json: PropTypes.object
}

export default JsonRenderer;