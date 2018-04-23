import React, { Component } from 'react';
import Events from './events';

class MonthView extends Component {
    constructor(){
        super();
        this.weeks = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        this.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        this.canvasClass = {
            'circle':['circle1','circle2','circle3','circle4','circle5'],
            'rect': ['rect1','rect2','rect3','rect4','rect5'],
            'triangle': ['triangle1','triangle2','triangle3','triangle4','triangle5'],
            'poly': ['poly1','poly2','poly3','poly4','poly5']
        };
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
                <div class="plus">
                    <span>+</span>
                </div>
                <div className="circle">
                    <div className="circle6"></div>
                    <div className="circle7"></div>
                    <div className="circle8"></div>
                    <div className="circle4"></div>
                    <div className="circle5"></div>
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                </div>
                <Events />
                <div className="current-month-view">
                    <span>{this.months[this.state.dispMonth]}</span>
                    <span className="slash">/</span>
                    <span>{this.state.dispYear}</span>
                </div>
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
        obj.currentDate = (i === yearDetails.date) ? true : false;
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