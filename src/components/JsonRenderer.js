import React, { Component } from 'react';
import { Button, message, Row, Col, Card } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { vs } from 'react-syntax-highlighter/styles/prism';
import PropTypes from 'prop-types';

class JsonRenderer extends Component {

  copyMessage = () => {
    message.success('JSON copied to clipboard')
  }

  copyClipboard = (event) => {
    const el = document.createElement('textarea');
    el.value = JSON.stringify(this.props.json, null, 2);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copyMessage();
  }
  render() {
    let _json = JSON.stringify(this.props.json, null, 2);
    return (
      <Card title={<Button onClick={this.copyClipboard} icon="copy">Copy</Button>}>
        <Row>
          <SyntaxHighlighter CodeTag={"code"}  language='javascript' style={vs}>{_json}</SyntaxHighlighter>
        </Row>
      </Card>
    )
  }
}

JsonRenderer.propTypes = {
  json: PropTypes.object
}

export default JsonRenderer;