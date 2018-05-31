import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
const formatA = 'DD/MM/YYYY, HH:mm:ss';
const formatDuration = 'hh:mm:ss';

export default class TrackTable extends React.Component {

  renderRows() {
    if (this.props.tracks && this.props.tracks.length > 0) {


      let duration = '-';

      return this.props.tracks.map((track, index) => {

        if (track.stop_time) {
          duration = moment.duration(moment(track.stop_time).diff(track.start_time))
          duration = duration.format(formatDuration)
        }
        
        return (
          <tr key={index}>
            <td>{track.description}</td>
            <td>{moment(track.start_time).format(formatA)}</td>
            <td>{(track.stop_time) ? moment(track.stop_time).format(formatA) : '-'}</td>
            <td>{duration}</td>
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
            <th>Duration</th>
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