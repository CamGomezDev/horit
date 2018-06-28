import React from 'react'
import AppFilled from './functions/AppFilled'
import { Form, Container, Button } from 'reactstrap'
import uuid from 'uuid'
import ClassInput from './Components/ClassInput'
import SchedulesGroup from './Components/SchedulesGroup'
import './App.css'

class App extends AppFilled {
  constructor() {
    super()
    this.state = {
      classes: Array(2).fill(null).map(() => ({
        id: uuid.v4(),
        name: '', 
        schedules: [
          {
            id: uuid.v4(),
            timetables: [
              {
                id: uuid.v4(),
                days: [],
                hours: { ini: '00:00', end: '00:00' }
              }
            ]
          }
        ]
      })),
      results: [],
      classesColors: []
    }
    this.addClass          = this.addClass.bind(this)
    this.deleteClass       = this.deleteClass.bind(this)
    this.addSchedule       = this.addSchedule.bind(this)
    this.deleteSchedule    = this.deleteSchedule.bind(this)
    this.addTimetable      = this.addTimetable.bind(this)
    this.deleteTimetable   = this.deleteTimetable.bind(this)
    this.changeName        = this.changeName.bind(this)
    this.changeHoursIni    = this.changeHoursIni.bind(this)
    this.changeHoursEnd    = this.changeHoursEnd.bind(this)
    this.changeDaysChecked = this.changeDaysChecked.bind(this)
    this.ready             = this.ready.bind(this)
    this.dummy             = this.dummy.bind(this)
  }

  dummy() {
    let classThings = this.state.classes
    for(let i=0; i<classThings.length; i++) {
      if(i===0) {
        classThings[i].name = 'Cálc. II'
        //weird
        this.deleteSchedule(classThings[i].id)
        this.addSchedule(classThings[i].id)
        this.addSchedule(classThings[i].id)

        classThings[i].schedules[0].timetables[0].days = ['Lu', 'Mi', 'Vi']
        classThings[i].schedules[0].timetables[0].hours.ini = '08:01'
        classThings[i].schedules[0].timetables[0].hours.end = '09:59'

        classThings[i].schedules[1].timetables[0].days = ['Lu', 'Mi', 'Vi']
        classThings[i].schedules[1].timetables[0].hours.ini = '10:01'
        classThings[i].schedules[1].timetables[0].hours.end = '11:59'
      }
      if(i===1) {
        classThings[i].name = 'Fís. Bás. I'
        //yep, weird
        this.deleteSchedule(classThings[i].id)
        this.addSchedule(classThings[i].id)
        this.addSchedule(classThings[i].id)
        this.addTimetable(classThings[i].id, classThings[i].schedules[0].id)
        this.addTimetable(classThings[i].id, classThings[i].schedules[1].id)

        classThings[i].schedules[0].timetables[0].days = ['Mi', 'Vi']
        classThings[i].schedules[0].timetables[0].hours.ini = '10:01'
        classThings[i].schedules[0].timetables[0].hours.end = '11:59'

        classThings[i].schedules[0].timetables[1].days = ['Lu']
        classThings[i].schedules[0].timetables[1].hours.ini = '12:01'
        classThings[i].schedules[0].timetables[1].hours.end = '13:59'

        classThings[i].schedules[1].timetables[0].days = ['Mi', 'Vi']
        classThings[i].schedules[1].timetables[0].hours.ini = '10:01'
        classThings[i].schedules[1].timetables[0].hours.end = '11:59'

        classThings[i].schedules[1].timetables[1].days = ['Lu']
        classThings[i].schedules[1].timetables[1].hours.ini = '08:01'
        classThings[i].schedules[1].timetables[1].hours.end = '09:59'
      }
    }
    this.setState({classes: classThings})
  }

  ready() {
    let classThings = this.state.classes
    fetch('http://localhost:5000/schedule', {
      method: 'POST',
      body: JSON.stringify(classThings),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(data => this.received(data.groups))
    .catch(err => console.log(err))
  }

  received(arr) {
    let results = this.state.results
    let classesColors = this.state.classesColors
    for(let e=0; e<this.state.classes.length; e++) {
      classesColors.push({name:this.state.classes[e].name,color:''})
    }
    results = arr
    this.setState({results:results, classesColors:classesColors})
  }

  render() {
    let classInputs = this.state.classes.map((classObject, step) => {
      return (
        <ClassInput
          key={classObject.id} id={classObject.id} name={classObject.name} 
          schedules={classObject.schedules} deleteClass={this.deleteClass}
          deleteSchedule={this.deleteSchedule} addSchedule={this.addSchedule} addClass={this.addClass}
          deleteTimetable={this.deleteTimetable} addTimetable={this.addTimetable}
          changeName={this.changeName} changeHoursIni={this.changeHoursIni}
          changeHoursEnd={this.changeHoursEnd} changeDaysChecked={this.changeDaysChecked} 
          index={step}
        />
      )
    })

    let tables = <SchedulesGroup arr={this.state.results} classesColors={this.state.classesColors}/>
    return (
      <div className="App">
        <Container>
          <Form>
            {classInputs}
          </Form>
          <Button color="primary" onClick={this.addClass} style={{fontSize:14}}>
            <i className="fa fa-plus" aria-hidden="true"></i> Clase
          </Button>
          {' '}
          <Button color="success" onClick={this.ready} style={{fontSize:14}}>
            <i className="fa fa-check" aria-hidden="true"></i> Listo
          </Button>
          {' '}
          <Button color="primary" onClick={this.dummy} style={{fontSize:14}}>
            <i className="fa fa-check" aria-hidden="true"></i> Dummy
          </Button>
          <div style={{marginTop:20}}>
            {tables}
          </div>
          <pre>{JSON.stringify(this.state.results,null,2)}</pre>
        </Container>
      </div>
    )
  }
}

export default App