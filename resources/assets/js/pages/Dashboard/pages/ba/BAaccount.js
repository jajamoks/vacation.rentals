import React, { Component } from "react";
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';

const vStyle = {
  color : 'red',
};

class BAaccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_ba_memeber: false,
      prop_id: null,
      ota_password: null,
      api_key: null,
      prop_key: null,
      is_bin_enable: false,
      disabled_bin: true,
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillMount() {
    fetch("/ba/account/get_ba_credential")
      .then(response => response.json())
      .then(data => {
        // var res = response.data;
        if (data.success == false) {
          console.log("Failed Initail fetching Data!");
          console.log("++++++++++Response data from initial+++++++++++++");
        } else {
          var param = data.data;
          this.setState({
            is_ba_memeber: true,
            prop_id : param.prop_id,
            ota_password : param.ota_password,
            api_key : param.api_key,
            prop_key : param.prop_key,
            is_bin_enable : param.is_bin_enable,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  checkDisableBin() {
    if (
      this.state.prop_id === null || this.state.prop_id === '' ||
      this.state.ota_password === null || this.state.ota_password === '' ||
      this.state.api_key === null || this.state.api_key === '' ||
      this.state.prop_key === null || this.state.prop_key === '' 
    ) {
      this.state.disabled_bin = true;
      this.state.is_bin_enable = false;
    } else {
      this.state.disabled_bin = false;
    }
  }

  onClickUpdate(event) {
    axios.get("/ba/api/update").then(response => {
      var res = response.data;
      if (res.success == false) {
        alert("Not success");
      } else {
        alert("Success");
      }
    });
  }

  handleChecked(event) {
    this.setState({
      is_bin_enable : !this.state.is_bin_enable,
    });
  }

  handleChange(event) {
    
    let fieldName = event.target.name;
    let fieldVlaue = event.target.value;

    this.setState({
      [fieldName] : fieldVlaue,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/ba/account/register', {
      prop_id:this.state.prop_id,
      ota_password:this.state.ota_password,
      api_key : this.state.api_key,
      prop_key: this.state.prop_key,
      is_bin_enable : this.state.is_bin_enable
    }).then(function(response){
      let success_message = "Saved Successfully!"
      toast.success(<div dangerouslySetInnerHTML={{ __html : 'Succeed to save data<br>' + success_message }}></div>)
    }).catch((err) => {
      let error_message = "Network Error!"
      toast.error(<div dangerouslySetInnerHTML={{ __html : 'Failed to save data<br>' + error_message }}></div>)
    });
  }
  render() {
    this.checkDisableBin();
    return (
      <div className="col-md-8 col-sm-8 col-lg-8">
        <ToastContainer/>
        <div className="panel">
          <div className="panel panel-header">
            <h1>Booking Automation Credential Info</h1>
          </div>
          <div className="panel panel-body">
            <div>
              <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                  <label className="col-sm-4">Prop ID</label>
                  <input
                    type="text"
                    placeholder="prop_id"
                    name="prop_id"
                    onChange={this.handleChange}
                    defaultValue={this.state.prop_id || ""}
                  />
                </div>

                <div className="form-group">
                  <label className="col-sm-4">OTA Password</label>
                  <input
                    type="text"
                    placeholder="OTA password"
                    name="ota_password"
                    onChange={this.handleChange}
                    defaultValue={this.state.ota_password || ""}
                  />
                </div>

                <div className="form-group">
                  <label className="col-sm-4">APIKey</label>
                  <input
                    type="text"
                    placeholder="api_key"
                    name="api_key"
                    onChange={this.handleChange}
                    defaultValue={this.state.api_key || ""}
                  />
                </div>

                <div className="form-group">
                  <label className="col-sm-4">PropKey</label>
                  <input
                    type="text"
                    placeholder="propkey"
                    name="prop_key"
                    onChange={this.handleChange}
                    defaultValue={this.state.prop_key || ""}
                  />
                </div>

                <div className="form-group">
                  <input  type="checkbox" 
                          name="is_bin_enable" 
                          checked={ this.state.is_bin_enable } 
                          disabled={this.state.disabled_bin ? "disabled" : ""}
                          onChange={this.handleChecked}
                          style={{ verticalAlign: "initial"}}/>
                  {
                    (this.state.disabled_bin === true) ?
                      <label style={{'color': '#ccc'}}>Enable Book it now?</label>
                    :
                      <label style={{'color': 'black'}}>Enable Book it now?</label>
                  }
                </div>

                <div className="form-group">
                  <button className="btn btn-success" type="submit">
                    Save
                  </button>
                  <button className="btn btn-danger" type="reset">
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BAaccount;