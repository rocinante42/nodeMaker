import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Templates: </h2>
        <br />
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
      </div>
    )
  }
}

export default Home;