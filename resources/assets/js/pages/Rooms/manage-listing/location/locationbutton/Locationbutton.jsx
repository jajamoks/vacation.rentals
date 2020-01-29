import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Locationbutton extends React.Component {
    render(){
        return(
            <div className="calendar_savebuttons col-sm-12"> 
                <a href={`/rooms/manage-listing/${this.props.roomId}/description`} className="right_save" >Back</a>
                    <a href={`/rooms/manage-listing/${this.props.roomId}/amenities`} className="right_save_continue" >Next</a>
            </div>
            
        )
    }
}

export default Locationbutton;