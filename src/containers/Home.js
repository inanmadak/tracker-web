import React, { Component } from 'react';
import * as actionTypes from '../sagas/actionTypes';
import { connect } from 'react-redux';
import TrackTable from '../components/TrackTable';
import PaginationBar from './PaginationBar';
import Modal from './Modal';


class Home extends Component {

  componentDidMount() {
    this.props.listTracks(1, 'asc');
  }

  addTrack = (event) => {
    document.getElementById('addTrack').style.display = 'block';
  }

  handleDescChange = (event) => {
    this.description = event.target.value;
  }

  handleConfirm = () => {
    this.props.addTrack(this.description);
  }

  renderTracks() {

    if (this.props.trackList) {
      const { trackList } = this.props;

      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <TrackTable tracks={trackList.data}></TrackTable>
            </div>
          </div>
          <PaginationBar
            page={this.props.trackList.page || 1}
            total={this.props.trackList.total || 1}
            
          ></PaginationBar>
        </div>

      )
    }


    return <div>None</div>
  }
  render() {
    return (
      <div>
        <div className="container">
          <h2 className="text-center text-lg my-5 mx-auto">Welcome to Tracker</h2>
          <div className="row">
            <button className="btn btn-primary mx-3 my-2" onClick={this.addTrack}>Add Track</button>
          </div>
          {this.renderTracks()}
        </div>
        <Modal id="addTrack" title="Add Track" confirmText="Save" confirmAction={this.handleConfirm} >
          <div className="col-md-10">
            <label className="">Description</label>
            <input className="form-control" onChange={this.handleDescChange} type="text" placeholder="Type description for track..." />
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trackList: state.trackList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    listTracks: (page, sort) => dispatch(actionTypes.listTracksReq(page, sort)),
    addTrack: (description) => dispatch(actionTypes.startTrackReq(description))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
