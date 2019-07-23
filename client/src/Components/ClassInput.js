import React, { Component } from 'react'
import { Card, CardBody, Col, Collapse, Button, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import Schedule from './Schedule'

class ClassInput extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      collapse: false,
      rotated: false
    }
    this.deleteSchedule    = this.deleteSchedule.bind(this)
    this.addTimetable      = this.addTimetable.bind(this)
    this.deleteTimetable   = this.deleteTimetable.bind(this)
    this.changeName        = this.changeName.bind(this)
    this.changeHoursIni    = this.changeHoursIni.bind(this)
    this.changeHoursEnd    = this.changeHoursEnd.bind(this)
    this.changeDaysChecked = this.changeDaysChecked.bind(this)
  }

  deleteSchedule(id) {
    this.props.deleteSchedule(this.props.id, id)
  }

  addTimetable(scheduleId) {
    this.props.addTimetable(this.props.id, scheduleId)
  }

  deleteTimetable(scheduleId, id) {
    this.props.deleteTimetable(this.props.id, scheduleId, id)
  }

  changeName(event) {
    this.props.changeName(this.props.index, event.target.value)
  }

  changeHoursIni(scheduleIn, timetableIn, value) {
    this.props.changeHoursIni(this.props.index, scheduleIn, timetableIn, value)
  }

  changeHoursEnd(scheduleIn, timetableIn, value) {
    this.props.changeHoursEnd(this.props.index, scheduleIn, timetableIn, value)
  }

  changeDaysChecked(scheduleIn, timetableIn, value, bool) {
    this.props.changeDaysChecked(this.props.index, scheduleIn, timetableIn, value, bool)
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse,
      rotated: !this.state.rotated
    })
  }

  render() {
    let schedules = this.props.schedules.map((schedule,step) => {
      return(
        <Schedule id={schedule.id} key={schedule.id} deleteSchedule={this.deleteSchedule}
          timetables={schedule.timetables} addTimetable={this.addTimetable}
          deleteTimetable={this.deleteTimetable} changeHoursIni={this.changeHoursIni}
          changeHoursEnd={this.changeHoursEnd} changeDaysChecked={this.changeDaysChecked}
          index={step}
        />
      )
    })

    return (
      <div>
        <FormGroup row>
          <Button color='danger' style={{fontSize:14,marginLeft:10,paddingTop:2,paddingBottom:2}} onClick={(e) => {e.preventDefault(); this.props.deleteClass(this.props.id)}}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </Button>
          <Col xs={10} md={8} lg={5}>
            <InputGroup style={{height:30}}>
              <Input value={this.props.name} style={{fontSize:14}} onChange={this.changeName}></Input>
              <InputGroupAddon addonType="prepend">
                <Button onClick={this.toggle} style={{paddingTop:3}}><i className={"fa fa-caret-"+(this.state.rotated ? 'up' : 'down')} aria-hidden="true"></i></Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
        <Collapse isOpen={this.state.collapse}>
          <Col lg={12} xl={9}>
            <Card>
              <CardBody>
                <h5 style={{textAlign:'center'}}>Posibles horarios</h5>
                {schedules}
                <Button color="primary" style={{marginTop:15,fontSize:14}} onClick={(e) => {e.preventDefault(); this.props.addSchedule(this.props.id)}}>
                  <i className="fa fa-plus rotate" aria-hidden="true"></i> Horario
                </Button>
              </CardBody>
            </Card>
          </Col>
          <br/>
        </Collapse>
      </div>
    )
  }
}

export default ClassInput
