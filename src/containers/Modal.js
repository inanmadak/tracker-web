import React from 'react';
import { connect } from 'react-redux';



export default class Modal extends React.Component {


  constructor(props){
    super(props);
  }

  handleConfirm = () => {
    this.props.confirmAction();
    this.closeModal();
  }

  closeModal = () => {
    document.getElementById(this.props.id).style.display = 'none';
  }


  render() {
    return (
      <div className="modal" tabIndex="-1" role="dialog" id={this.props.id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span onClick={ this.closeModal} aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.handleConfirm}>{this.props.confirmText || 'Save'}</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={ this.closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
      )
  }

}

