import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import MatchStatementsPage from './components/views/MatchStatements';
import HomePage from './components/views/Home';
import TrueFalsePage from './components/views/TrueFalse';
import MultipleSelectPage from './components/views/MultipleSelectPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Route path="/" exact component={HomePage} />
          <Route path="/match_statements" component={MatchStatementsPage} />
          <Route path="/true_false" component={TrueFalsePage} />
          <Route path="/multiple_select" component={MultipleSelectPage} />
        </div>
      </div>
    );
  }
}

export default App;
