import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listTracks } from './actions/actions';


class App extends Component {

  render() {
    return (
      <div>
        Welcome tracker!
      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    tracks: state.tracks
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ 
    listTracks: listTracks
  },
    dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
