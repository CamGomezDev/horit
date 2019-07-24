import React, { Component } from 'react'
import { Card, CardBody, FormGroup, Label, Button, Col } from 'reactstrap'
import uuid from 'uuid'

class Timetable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    }
    this.changeDaysChecked = this.changeDaysChecked.bind(this)
  }

  changeDaysChecked(value, bool) {
    this.props.changeDaysChecked(this.props.index, value, bool)
  }

  render() {
    let timesStart = ['06:00']
    let timesFin = []
    for (let i = 7; i < 22; i++) {
      if(i < 10) {
        timesStart.push('0'+i+':00')
        timesFin.push('0'+i+':00')
      } else {
        timesStart.push(i+':00')
        timesFin.push(i+':00')
      }
    }
    timesFin.push('22:00')
    return (
      <Col sm={12} md={6} lg={4}>
        <Card style={{marginBottom:10, fontSize:14}}>
          <CardBody>
            <div>
              {this.state.days.map((day,step) => {
                let dayThing = this.props.days.find(dayThingie => dayThingie === day)
                if (dayThing) {
                  return <DayCheckbox day={day} key={step} checkedVar={true} changeDaysChecked={this.changeDaysChecked}/>
                }
                return <DayCheckbox day={day} key={step} checkedVar={false} changeDaysChecked={this.changeDaysChecked}/>
              })}
            </div>
            <FormGroup row style={{margin:0}}>
              <Label sm={4} for="iniTime">Ini</Label>
              <Col sm={8}>
                <select name="time" id="iniTime" value={this.props.hours.ini} onChange={e => {this.props.changeHoursIni(this.props.index, e.target.value)}}>
                  {timesStart.map((time, step) => {
                    return <option key={uuid.v4()}>{time}</option>
                  })}
                </select>
              </Col>
            </FormGroup>
            <FormGroup row style={{margin:0}}>
              <Label sm={4} for="endTime">Fin</Label>
              <Col sm={8}>
                {/* <Input type="time" name="time" id="endTime" bsSize="sm"
                  value={this.props.hours.end}
                  onChange={e => {this.props.changeHoursEnd(this.props.index, e.target.value)}}
                /> */}
                <select name="time" id="finTime" value={this.props.hours.end} onChange={e => {this.props.changeHoursEnd(this.props.index, e.target.value)}}>                  
                  {timesFin.map((time, step) => {
                    return <option key={uuid.v4()} value={time}>{time}</option>
                  })}
                </select>
              </Col>
            </FormGroup>
            <Button style={{marginTop:10,fontSize:14}} color="danger" onClick={e =>{e.preventDefault(); this.props.deleteTimetable(this.props.id)}}>
              <i className="fa fa-times" aria-hidden="true"></i> Cuadro
            </Button>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default Timetable

class DayCheckbox extends Component {
  render() {
    return(
      <div className="pretty p-default p-smooth p-bigger" style={{marginBottom:8}}>
        <input type="checkbox" defaultChecked={this.props.checkedVar}
          onChange={e => {this.props.changeDaysChecked(this.props.day, e.target.checked)}}
        />
        <div className="state p-primary">
          <label>{this.props.day}</label>
        </div>
      </div>
    )
  }
}