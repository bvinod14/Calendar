import React, { Component } from 'react'

class MonthView extends Component {
    constructor(){
        super();
        this.weeks = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        this.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        this.date = new Date();
        this.state = {
            Month : generateDays(),
            dispMonth : this.date.getMonth(),
            dispYear : this.date.getFullYear(),
            years : []
        }
    }

    componentDidMount() {
        let yearsArr = [];
        for(var i=1980; i<2051; i++){
            yearsArr.push(i);
        }
        this.setState({years:yearsArr});
    }

    changeMonth(e){
        let selMonth = e.target.value;
        this.setState({dispMonth:selMonth,Month:generateDays(selMonth,this.state.dispYear)});
    }

    changeYear(e) {
        let selYear = e.target.value;
        this.setState({dispYear:selYear,Month:generateDays(this.state.dispMonth,selYear)});
    }

    render () {
        return (
            <div className="month-view-container">
                <select onChange={this.changeMonth.bind(this)}>
                    {
                        this.months.map((month,index) =>(
                            <option key={index} value={index} selected={this.state.dispMonth === index ? 'selected' : ''}>{month}</option>
                        ))
                    }
                </select>
                <select onChange={this.changeYear.bind(this)}>
                    {
                        this.state.years.map((year,index) =>(
                            <option key={index} value={year} selected={this.state.dispYear === year ? 'selected' : ''}>{year}</option>
                        ))
                    }
                </select>
                <div className="month-view-restrict">
                    {this.weeks.map((week,index)=>(
                        <div className="week-name" key={index}>{week}</div>
                    ))}
                    {
                        this.state.Month.map((day,index) =>(
                            <div key={index} className={`day ${day.currentDate ? 'current-day':''}`}>{day.date}</div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default MonthView

function generateDays(selMon,selYear){
    var MonthArray = [];
    // the object will contain the day and the current day boolean variable 
    var currentDate = new Date();
    var yearDetails = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        date: currentDate.getDate()
    }

    if(selMon) {
        yearDetails.month = Number(selMon);
    }
    if(selYear) {
        yearDetails.year = Number(selYear);
    }

    var monthDetails = getNumberOfDays(yearDetails.year, yearDetails.month + 1);
    for (var i = 1 ; i <= monthDetails.days; i++ ){
        let obj = {};
        obj.date = i;
        obj.currentDate = (i == yearDetails.date) ? true : false;
        MonthArray.push(obj);
    }
    monthDetails.day = (new Date(yearDetails.year, yearDetails.month,1)).getDay();
    for (var j = 0; j< monthDetails.day ; j++){
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