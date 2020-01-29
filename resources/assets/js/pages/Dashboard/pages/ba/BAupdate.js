import React, { Component } from "react";
import axios from "axios";
import './baupdate.scss';
import {toast, ToastContainer} from 'react-toastify';

class BAUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: false,
      is_ba_memeber: false,
      credentials: []
    };
    this.onClickUpdate = this.onClickUpdate.bind(this)
  }

  onClickUpdate(event) {
    if (this.state.isUpdating) {
      this.showMessage('error', "Updating now ...");
      return;
    }
    this.setUpdateStatus();
    axios.get("/ba/api/update")
      .then(response => {
        let res = response.data;
        if (res.success === true) {
          this.showMessage('success', "Successfully!");
        } else {
          this.showMessage('error', "Not Success!");
        }
        this.clearUpdateStatus();
      })
      .catch(error => {
        this.showMessage('error', "Not Success!");
        this.clearUpdateStatus();
      });
  }
  setUpdateStatus() {
    this.setState({ isUpdating: true });
  }
  clearUpdateStatus() {
    this.setState({ isUpdating: false });
  }
  showMessage(type, content) {
    if (type === 'error') {
      toast.error(<div dangerouslySetInnerHTML={{ __html : 'Update data from BA <br>' + content }}></div>);
    }
    if (type === 'success') {
      toast.success(<div dangerouslySetInnerHTML={{ __html : 'Update data from BA <br>' + content }}></div>);
    }
  }
  render() {
    return (
      <div className="col-md-8 col-sm-8 col-lg-8">
        <div className="card col-md-8 col-sm-8 p-5 mt-2">
          <div className="row title-bar">
            <p> Updated data from Booking Automation </p>
            {
              (this.state.isUpdating) ?
              (<div className="spinner-border" role="status"><span class="sr-only">Loading...</span></div>)
              : null
            }
          </div>
          <div className="row clearfix">
            <button className="btn btn-info w-100" onClick={this.onClickUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BAUpdate;
