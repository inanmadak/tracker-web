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

      let duration = '-',
          liveDuration = '-',
          diff = 0,
          hideStop = false;
          ;
          // appear = {backgroundColor: 'lightgray', fontWeight: 600, borderLeft: 'none'};

      return this.props.tracks.map((track, index) => {

        duration = '', liveDuration = '', diff = 0;
        let appear = {backgroundColor: 'lightgray', fontWeight: 600, borderLeft: 'none'};

        if (track.stop_time) {
          duration = moment.duration(moment(track.stop_time).diff(track.start_time))
          duration = duration.format(DURATION_FORMAT)
          appear.borderLeft = 'none';
          hideStop = true;
        }else{
          diff = moment().diff(moment(track.start_time))
          hideStop = (diff < 0) ? true : false;

          liveDuration = moment.duration(diff);
          liveDuration = (hideStop) ? '0' : liveDuration.format(DURATION_FORMAT, {trim: false});
          appear.borderRight = (hideStop) ? '' : '4px solid red';
        }
        
        return (
          <tr key={index}>
            <td>{track.description}</td>
            <td>{moment(track.start_time).format(LONG_FORMAT)}</td>
            <td>{(track.stop_time) ? moment(track.stop_time).format(LONG_FORMAT) : '-'}</td>
            <td className="text-right" style={appear}>{(duration) ? duration : liveDuration}</td>
            <td>
              <button hidden={hideStop} className="btn btn-link" onClick={this.props.stopHandler.bind(this, track._id)}>Stop</button>
              <button className="btn btn-link" style={ {color: 'chocolate'} } onClick={this.props.deleteHandler.bind(this, track._id)}>Remove</button>
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
            <th>Start</th>
            <th>Stop</th>
            <th className="text-center" style={{backgroundColor:'orange'}}>Duration</th>
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