import React, { Component } from 'react';
import * as actionTypes from '../sagas/actionTypes';
import { connect } from 'react-redux';
import TrackTable from '../components/TrackTable';
import PaginationBar from './PaginationBar';
import Modal from '../components/Modal';


class Home extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.listTracks(1, 'desc');
    this.searchText = '';
  }

  addTrack = (event) => {
    document.getElementById('addTrack').style.display = 'block';
  }

  handleDescChange = (event) => {
    this.description = event.target.value;
  }

  handleBookTimeChange = (event) => {
    this.booktime = event.target.value;
  }

  handleSearchTextChange = (event) => {
    this.searchText = event.target.value;
    this.props.searchTracks(this.searchText, (this.props.trackList.page || 1), (this.props.trackList.sort || 'desc'));
  }

  handleConfirm = () => {
    this.props.addTrack(this.description, this.booktime);
    this.booktime = '';
    this.description = '';
    this.descInput.value = '';
    this.bookInput.value = '';
  }

  renderTracks() {

    if (this.props.trackList) {
      const { trackList } = this.props;

      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <TrackTable tracks={trackList.data} stopHandler={this.props.stopTrack}
                deleteHandler={this.props.deleteTrack}></TrackTable>
            </div>
          </div>
          <PaginationBar
            page={this.props.trackList.page || 1}
            total={this.props.trackList.total || 1}
            pageNext={this.props.pageChange.bind(this, 'next', this.props.trackList.sort)}
            pagePrev={this.props.pageChange.bind(this, 'prev', this.props.trackList.sort)}
          ></PaginationBar>
        </div>

      )
    }


    return <div>None</div>
  }
  render() {
    return (
      <div>
        <div className="container" style={{ marginBottom: '150px' }}>
          <h2 className="text-center text-lg my-5 pt-3 mx-auto">Welcome to Tracker</h2>
          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-primary mx-3 my-2" onClick={this.addTrack}>Add Track</button>
              <span className="text-secondary">Total: </span><span className="text-primary">{this.props.trackList.data.length}</span>
            </div>
            <div className="col-md-6">

              <input type="text"
                onChange={this.handleSearchTextChange}
                className="form-control" placeholder="Search description..." aria-label="Search description..." aria-describedby="basic-desc" />

            </div>

            <div className="col-md-3 text-right">
              <div className="btn btn-group">
                <button className="btn btn-secondary" onClick={this.props.listTracks.bind(this, (this.props.trackList.page || 1), 'desc')}>Desc</button>
                <button className="btn btn-secondary" onClick={this.props.listTracks.bind(this, (this.props.trackList.page || 1), 'asc')}>Asc</button>
              </div>
            </div>

          </div>
          {this.renderTracks()}
        </div>
        <Modal id="addTrack" title="Add Track" confirmText="Save" confirmAction={this.handleConfirm} >
          <div className="col-md-10">
            <label >Description</label>
            <input ref={(input) => this.descInput = input} className="form-control" onChange={this.handleDescChange} type="text" placeholder="Type description for track..." />
          </div>
          <div className="col-md-10 mt-3">
            <label title="If set, timer will automatically start when the time comes.">Desired time to start automatically (optional)</label>
            <input ref={(input) => this.bookInput = input} type="datetime-local" className="form-control" onChange={this.handleBookTimeChange} />
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
    listTracks: (page, sort, text) => dispatch(actionTypes.listTracksReq(page, sort, text)),
    addTrack: (description, booktime) => dispatch(actionTypes.startTrackReq(description, booktime)),
    stopTrack: (id) => dispatch(actionTypes.stopTrackReq(id)),
    deleteTrack: (id) => dispatch(actionTypes.deleteTrackReq(id)),
    pageChange: (to, sort) => dispatch(actionTypes.pageChangeReq(to, sort)),
    searchTracks: (text, page, sort) => dispatch(actionTypes.searchTracksReq(text, page, sort))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
