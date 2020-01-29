import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const dateFormat1 = "YYYY-MM-DD";
const dateFormat = "MM/DD/YYYY HH:mm:ss";
import moment from 'moment';
class Dashboardmain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userinfo: {
        first_name: '',
        last_name: ''
      },
      page_data: {}

    }
  }
  componentDidMount () {
    fetch('/ajax/dashboard/index')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          userinfo: data.user_info,
          page_data: data.data
        })
      });
  }
  render () {
    let { userinfo, page_data } = this.state

    return (
      <div className="col-md-9">
        <div className="aside-main-content">
          <div className="side-cnt">
            <div className="row">
              <div className="col-md-12">
                <div className="pro-detial">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <div className="user-profile">
                        <img src={this.state.page_data.profile_pic} className="img-responsive" alt="profile" />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h3>Hello, {userinfo.first_name}!</h3>
                      <span>Good Morning!</span>
                      <p>Guess how many nights you've hosted this year?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="profile-tab">
                  <ul className="nav nav-tabs">
                    <li><a data-toggle="tab" href="#listing" className="active show">My
                                  Listings</a></li>
                    <li><a data-toggle="tab" href="#trips">My Trips</a></li>
                  </ul>
                  <div className="tab-content">
                    <div id="listing" className="tab-pane   active show">

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">Pending
                                    Reservations <span className="badge badge-primary badge-pill">{page_data.pending_reservation_count}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Upcoming
                                    Reservations <span className="badge badge-primary badge-pill">{page_data.upcoming_reservation_count}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Current
                                    Reservations <span className="badge badge-primary badge-pill">{page_data.current_reservation_count}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Total
                                    Listings <span className="badge badge-pill no-pd">{page_data.listing_count}</span></li>
                      </ul>
                    </div>
                    <div id="trips" className="tab-pane  ">

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">Pending
                                    Trips <span className="badge badge-primary badge-pill">{page_data.pending_trip_count}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Upcoming
                                    Trips <span className="badge badge-primary badge-pill">{page_data.upcoming_trip_count}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Current
                                    Trips <span className="badge badge-primary badge-pill">{page_data.current_trip_count}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">Total
                                    Listings <span className="badge badge-pill no-pd">{page_data.all_trip_count}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="aside-main-content">
          <div className="row">
            <div className="col-12">
              <div className="full-box">
                <ul className="nav nav-tabs fullbox-tab">
                  <li><a data-toggle="tab" href="#pending-request" className="active show">
                    <span className="badge badge-pill badge-warning">{page_data.pending_count}</span> Pending
                    Requests and
                                Inquiries</a></li>
                  <li><a data-toggle="tab" href="#notifications">Notifications <span className="badge badge-pill badge-secondary">{page_data.unreadmessagecount}</span></a></li>
                  {/* <li><a data-toggle="tab" href="#referrals" className>Referrals <span className="badge badge-pill badge-secondary">2</span></a></li> */}
                </ul>
                <div className="tab-content">
                  <div id="pending-request" className="tab-pane active show">
                    <div className="content">
                      <h3>Recent Reservation and Trips</h3>
                      {/* <p>Invite other property owners and managers to list on
                                  Vacation.Rentals</p>
                                <button className="btn btn-outline-primary">Get started</button> */}
                      {page_data.pending_reservations && page_data.pending_reservations.length == 0 ? <p>You have no reservations!</p> : null}
                      {page_data.pending_reservations &&
                        page_data.pending_reservations.map((reservation, index) => {
                          return <li key={"pending_reservations"+index} className="list-group-item d-flex justify-content-between align-items-center">Reservation<span className="badge badge-primary badge-pill"></span></li>
                        })}
                    </div>
                  </div>
                  <div id="notifications" className="tab-pane ">


                    <div className="content">
                      <h3>Notification </h3>
                      <ul className="list-group list-group-flush">

                      </ul>
                      {page_data.messages && page_data.messages.map((message, index) => {
                        if (message.message)
                          return <li key={"messages"+index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="media va-container reserve"><a className="pull-left media-photo media-round">
                              <img width={50} height={50} title="Angie Calfee" src="https://lh4.googleusercontent.com/-AeR3l9kUNTY/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcYcmOWYb7zFNYV1f0ceyRzs5elcKQ/mo/photo.jpg?sz=225" alt="Angie Calfee" /></a>
                              <div className="va-top"><a className="text-normal">{message.userInfo.full_name}</a><br />{message.message.message}<br />
                                {moment.utc(message.message.created_at).format(dateFormat)}
                              </div></div>
                            <span className="badge badge-danger badge-pill">{message.count}</span></li>
                      })}
                    </div>

                  </div>
                  <div id="referrals" className="tab-pane ">
                    <div className="content">
                      <h3>Referrals</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
                        eaque dolorem? Dolorum cum maiores at harum, vel nulla fugiat,
                        error esse, tenetur explicabo doloribus fuga nobis magni nihil
                                  quae libero.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

}
export default Dashboardmain