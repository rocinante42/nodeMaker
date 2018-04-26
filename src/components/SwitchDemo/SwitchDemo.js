import React, {Component} from 'react';
import {Card, Switch} from 'antd';

class SwitchDemo extends Component {
  constructor() {
    super();
    this.state = {
      switch: true
    }
  }
  changeSwitch = () => {
    this.setState({
      switch: !this.state.switch
    })
  }
  render() {
    return (
      <div>
        <Card
          style={{
          width: 300,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <p className="App-intro">
            {`The switch state is: ${this.state.switch}`}
            <br/>
            <Switch onClick={this.changeSwitch} checked={this.state.switch}/>
          </p>
        </Card>
      </div>
    );
  }
}

export default SwitchDemo;
