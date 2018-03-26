import React, { Component } from 'react'

class MonthView extends Component {
    constructor(){
        super();
        this.weeks = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        this.Month = generateDays();
    }
    render () {
        return (
            <div className="month-view-container">
            <div className="month-view-restrict">
                {this.weeks.map((week,index)=>(
                    <div className="week-name" key={index}>{week}</div>
                ))}
                {
                    this.Month.map((day) =>(
                        <div key={day.date} className={`day ${day.currentDate ? 'current-day':''}`}>{day.date}</div>
                    ))
                }
            </div>
            </div>
        )
    }
}

export default MonthView

function generateDays(){
    var MonthArray = [];
    // the object will contain the day and the current day boolean variable 
    var currentDate = new Date();
    var yearDetails = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        date: currentDate.getDate()
    }

    var monthDetails = getNumberOfDays(yearDetails.year, yearDetails.month + 1);

    for (var i = 1 ; i <= monthDetails.days; i++ ){
        let obj = {};
        obj.date = i;
        obj.currentDate = (i == yearDetails.date) ? true : false;
        MonthArray.push(obj);
    }
    monthDetails.day = (new Date(yearDetails.year, yearDetails.month,1)).getDay();
    for (var i = 0; i< monthDetails.day ; i++){
        let obj = {
            date: '',
            currentDate: false
        }
        MonthArray.unshift(obj);
    }

    return MonthArray;
}

function getNumberOfDays(year,month){
    var date = new Date(year, month, 0);
    return {days: date.getDate()};
}