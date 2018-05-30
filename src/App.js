import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listTracks } from './actions/actions';


class App extends Component {

  componentDidMount(){
    this.props.listTracks();
  }

  renderTracks(){
    if(this.props.tracks){
      const { tracks } = this.state.props;

      return tracks.map(track => {
        return (
          <div>{track.description}</div>
        )
      })
    }

    return <div>None</div>
  }
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

const mapDispatchToProps = dispatch => {
  return { 
    listTracks: () => dispatch({type: 'LIST_TRACKS'})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
