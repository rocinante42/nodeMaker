import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const saveForLater = () => ( <div>
  <Link to="/match_statements">
  <Button type="default">Match Statements</Button>
  </Link>
  <br />
  <br />
  <Link to="/true_false">
    <Button type="default">True False</Button>
  </Link>
  <br />
  <br />
  <Link to="/multiple_select">
    <Button type="default">Multiple Select</Button>
  </Link>
  <br />
  <br />
</div>);

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Templates: </h2>
        <br />
        <Link to="/definition">
          <Button type="default">Definition</Button>
        </Link>
        <br />
        <br />
        <Link to="/true_false_2">
          <Button type="default">True False 2 questions</Button>
        </Link>
        <br />
        <br />
        <Link to="/test_component">
          <Button type="default">Test Card</Button>
        </Link>
      </div>
    )
  }
}

export default Home;