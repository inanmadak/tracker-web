import React from 'react';
import redux from 'redux';
import { connect } from 'react-redux';
import * as actionTypes from '../sagas/actionTypes';


export default class PaginationBar extends React.Component{

  render(){
    return (
      <div className="row">
        <div className="btn btn-group mx-auto">
          <button className="btn btn-secondary" onClick={this.props.pagePrev}>Prev</button>
          <button className="btn btn-secondary" onClick={this.props.pageNext}>Next</button>
        </div>
      </div>
    )
  }
}