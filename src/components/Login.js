import React from 'react';

export default class Login extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){

  }


  render(){
    return (
      <div className="auth-container">
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="form-custom">
              <h2 className="title">LOGIN</h2>
              <form className="form form-horizontal">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" name="password" onChange={this.handleChange} />
                </div>
                <div className="form-group text-right">
                  <button className="btn btn-primary">Go</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}