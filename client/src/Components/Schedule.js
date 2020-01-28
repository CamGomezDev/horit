import React, { Component } from 'react'
import { Row, Card, CardBody, Button } from 'reactstrap'
import Timetable from './Timetable'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.deleteTimetable   = this.deleteTimetable.bind(this)
    this.changeHoursIni    = this.changeHoursIni.bind(this)
    this.changeHoursEnd    = this.changeHoursEnd.bind(this)
    this.changeDaysChecked = this.changeDaysChecked.bind(this)
  }

  deleteTimetable(id) {
    this.props.deleteTimetable(this.props.id, id)
  }

  changeHoursIni(timetableIn, value) {
    this.props.changeHoursIni(this.props.index, timetableIn, value)
  }

  changeHoursEnd(timetableIn, value) {
    this.props.changeHoursEnd(this.props.index, timetableIn, value)
  }

  changeDaysChecked(timetableIn, value, bool) {
    this.props.changeDaysChecked(this.props.index, timetableIn, value, bool)
  }

  render() {
    return (
      <Card style={{marginTop:20}}>
        <CardBody>
          <Row>
            {this.props.timetables.map((timetable, step) => {
              return (
                <Timetable days={timetable.days} key={timetable.id}
                  hours={timetable.hours} changeDaysChecked={this.changeDaysChecked}
                  deleteTimetable={this.deleteTimetable} id={timetable.id}
                  changeHoursIni={this.changeHoursIni} changeHoursEnd={this.changeHoursEnd}
                  index={step}
                />
              )
            })}
            <div>
              <Button color="primary"  style={{fontSize:14,marginLeft:15}} onClick={e => {e.preventDefault(); this.props.addTimetable(this.props.id)}}>
                <i className="fa fa-plus" aria-hidden="true"></i> Box
              </Button>
            </div>
          </Row>
          <Button color="danger" style={{fontSize:14}} className="pull-right" onClick={e => {e.preventDefault(); this.props.deleteSchedule(this.props.id)}}>
            <i className="fa fa-times" aria-hidden="true"></i> Schedule
          </Button>
        </CardBody>
      </Card>
    )
  }
}

export default Schedule

