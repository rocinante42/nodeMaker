import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import {Layout, Menu} from 'antd'
import 'antd/dist/antd.css';
import MatchStatementsPage from './components/views/MatchStatements';
import HomePage from './components/views/Home';
import TrueFalsePage from './components/views/TrueFalse';
import TrueFalse2Page from './components/views/TrueFalse2'
import MultipleSelectPage from './components/views/MultipleSelectPage';
import Test from './components/views/Test';
import DefinitionPage from './components/views/DefinitionPage';
import MultipleChoice from './components/views/MultipleChoice'
import './App.css';

const {Header, Content, Footer} = Layout;

class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    return (
      <h3 style={{color: "white"}}>{location.pathname}</h3>
    )
  }
}

const ShowLocation = withRouter(ShowTheLocation);

class App extends Component {
  render() {
    return (
      <Layout >
        <Header>
          <div className="logo"><ShowLocation/></div>
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
              <Route path="/true_false_2" component={TrueFalse2Page} />
              <Route path="/multiple_select" component={MultipleSelectPage} />
              <Route path="/multiple_choice" component={MultipleChoice} />
            </div>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default App;
