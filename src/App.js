import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Layout, Menu} from 'antd'
import 'antd/dist/antd.css';
import MatchStatementsPage from './components/views/MatchStatements';
import HomePage from './components/views/Home';
import TrueFalsePage from './components/views/TrueFalse';
import MultipleSelectPage from './components/views/MultipleSelectPage';
import Test from './components/views/Test';
import DefinitionPage from './components/views/DefinitionPage';
import './App.css';

const {Header, Content, Footer} = Layout;

class App extends Component {
  render() {
    return (
      <Layout >
        <Header>
          <div className="logo"><h3 style={{color: "white"}}>Edit Definition Node: </h3></div>
          <Menu theme="light"/> 
        </Header>
        <Content>
          <div className="App">
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/test_component"  component={Test} />
              <Route path="/definition"  component={DefinitionPage} />
              <Route path="/match_statements" component={MatchStatementsPage} />
              <Route path="/true_false" component={TrueFalsePage} />
              <Route path="/multiple_select" component={MultipleSelectPage} />
            </div>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default App;
