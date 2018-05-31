import React from 'react';
import redux from 'redux';
import { connect } from 'react-redux';
import * as actionTypes from '../sagas/actionTypes';


export default class PaginationBar extends React.Component{


  render(){
    return (
      <div className="row">
        <div className="btn-group mx-auto">
          <span className="btn">Prev</span>
          <span className="btn">Next</span>
        </div>
      </div>
    )
  }
}