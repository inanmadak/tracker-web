import React, { Component } from 'react';
import * as actionTypes from '../sagas/actionTypes';
import { connect } from 'react-redux';
import TrackTable from '../components/TrackTable';
import PaginationBar from '../containers/PaginationBar';


class Home extends Component {

  componentDidMount() {
    this.props.listTracks();
  }

  renderTracks() {

    if (this.props.trackList) {
      const { trackList } = this.props;

      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <TrackTable tracks={trackList.data}></TrackTable>
            </div>
          </div>
        </div>
      )
    }

    return <div>None</div>
  }
  render() {
    return (
      <div>
        <div className="row">
          <h2 className="text-center text-lg my-5 mx-auto">Welcome to Tracker</h2>
          {this.renderTracks()}
        </div>
        <PaginationBar></PaginationBar>
      </div>


    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    trackList: state.trackList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    listTracks: () => dispatch({ type: actionTypes.LIST_TRACKS_ASYNC })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
