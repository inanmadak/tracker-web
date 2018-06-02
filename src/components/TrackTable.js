import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
const LONG_FORMAT = 'DD/MM/YYYY, HH:mm:ss';
const DURATION_FORMAT = 'hh:mm:ss';

export default class TrackTable extends React.Component {

  constructor(props){
    super(props);
    this.state = { count: 0, timer: null}

  }

  startTimer(){
    const timer = setInterval(()=> {
      this.setState({ count: this.state.count + 1})
    }, 1000);

    this.setState({timer: timer});
  }

  componentDidMount(){
    this.startTimer();
  }

  componentWillUnmount(){
    clearInterval(this.state.timer);
  }

  renderRows() {
    if (this.props.tracks && this.props.tracks.length > 0) {

      let duration = '-';
      let liveDuration = '-';

      return this.props.tracks.map((track, index) => {

        duration = '', liveDuration = '';

        if (track.stop_time) {
          duration = moment.duration(moment(track.stop_time).diff(track.start_time))
          duration = duration.format(DURATION_FORMAT)
        }else{
          liveDuration = moment.duration(moment().diff(moment(track.start_time)))
          liveDuration = liveDuration.format(DURATION_FORMAT);        
        }
        
        return (
          <tr key={index}>
            <td>{track.description}</td>
            <td>{moment(track.start_time).format(LONG_FORMAT)}</td>
            <td>{(track.stop_time) ? moment(track.stop_time).format(LONG_FORMAT) : '-'}</td>
            <td className="text-right">{(duration) ? duration : liveDuration}</td>
            <td>
              <button className="btn btn-link" onClick={this.props.stopHandler.bind(this, track._id)}>Stop</button>
              <button className="btn btn-link" style={ {color: 'lightpink'} } onClick={this.props.deleteHandler.bind(this, track._id)}>Remove</button>
            </td>
          </tr>
        )
      })

    }
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Started</th>
            <th>Stopped</th>
            <th className="text-right">Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }
}