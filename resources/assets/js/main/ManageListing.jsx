// standard library

import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { StripeProvider } from 'react-stripe-elements';

import store from '../store'
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import Chatbox from '../common/chatbox/Chatbox';

import NewRooms from '../pages/Rooms/NewRooms'
import Manage_listing from '../pages/Rooms/manage-listing/Manage_listing'
import SubscriptionRoom from '../pages/Rooms/manage-listing/subscription/SubscriptionRoom'

class Main extends Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log('Route change!');
    }
  }
  render () {
    return (
      <StripeProvider apiKey="pk_live_U8hqowvDTqTO4x1I7Wm67SUX00hjzdOcUZ">
        <Router basename="/" >
          <div className="body">
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
              <Switch >
                <Route path='/rooms/manage-listing/:roomId' component={Manage_listing} />
                <Route path='/rooms/new' component={NewRooms} />
                <Route path='/rooms/:roomId/subscribe_property' component={SubscriptionRoom} />
              </Switch>
            </Suspense>
            <Chatbox />
            <Footer />
          </div>
        </Router>
      </StripeProvider>
    )
  }
}

export default withRouter(props => <Main {...props} />)
if (document.getElementById('root')) {
  ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('root'));
}
