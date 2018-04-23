import React, { Component } from 'react'

export default class Events extends Component {


    render() {
        return(
            <div className="events">
                <div className="event-header">
                    <h3 className="title">Hello World</h3>
                    <h5 className="time">11:30 AM to 12:30 PM</h5>
                </div>
                <div className="event-content">
                    <p>This is just an event to test the calendar app</p>
                </div><br/>
                {/* <div className="event-header">
                    <h3 className="title">Hello World</h3>
                    <h5 className="time">11:30 AM to 12:30 PM</h5>
                </div>
                <div className="event-content">
                    <p>This is just an event to test the calendar app</p>
                </div> */}
            </div>
        )
    }
}