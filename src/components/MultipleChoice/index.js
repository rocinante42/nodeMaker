import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Card, Input, Cascader, Switch } from 'antd';
import CardRenderer from './../CardRenderer';

class MultipleSelectRenderer extends Component {

  colCreator = (obj, cols) => {
    let col=24/cols;
    return (
      <Col span={col}>{obj}</Col>
    )
  }

  mapElementsToCards = (elements, cols) => {
    let arr = []
    let cont = 0
    while(cont != elements) {
      let rows = []
      let cont2 = 0
      while (cont != elements && cont2 < cols){
        rows.push(this.colCreator(<CardRenderer 
                                    hasPreview
                                    hasInputOption
                                    index={cont}
                                    card_title={"Setup"} 
                                    changeContent={this.props.changeContent}
                                    refreshState={this.props.refreshState} 
                                    changeAnswer={this.props.changeAnswer} 
                                    inputOption={this.props.inputOption}
                                            
                                  />, cols))
        cont2++;
        cont++
      }        
      arr.push(<Row key={cont}>{rows}</Row>)
    }
    return arr;
  }

  render(){
    return(
      <div>
        {this.mapElementsToCards(this.props.elements, this.props.columns)}
      </div>
    )
  }

}


MultipleSelectRenderer.propTypes = {
  elements: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired
}

MultipleSelectRenderer.defaultProps = {
  elements: 0,
  columns: 1,
  changeContent: function(){},
  refreshState: function(){}
}

export default MultipleSelectRenderer;