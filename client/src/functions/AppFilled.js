import { Component } from 'react'
import uuid from 'uuid'

class AppFilled extends Component {
  addClass() {
    let classThings = this.state.classes
    classThings.push({
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
    })
    this.setState({
      classes: classThings
    })    
  }
  
  deleteClass(id){
    let classThings = this.state.classes
    let index = classThings.findIndex(obj => obj.id === id)
    classThings.splice(index, 1)
    this.setState({
      classes: classThings
    })
  }
  
  addSchedule(classId) {
    let classThings = this.state.classes
    let index = classThings.findIndex(obj => obj.id === classId)
    classThings[index].schedules.push({
      id: uuid.v4(),
      timetables: [
        { 
          id: uuid.v4(),
          days: [], 
          hours: { ini: '00:00', end: '00:00' } 
        }
      ]
    })
    this.setState({
      classes: classThings
    })
  }
  
  deleteSchedule(classId, id) {
    let classThings = this.state.classes
    let classIndex  = classThings.findIndex(obj => obj.id === classId)
    let index       = classThings[classIndex].schedules.findIndex(obj => obj.id === id)
    classThings[classIndex].schedules.splice(index, 1)
    this.setState({
      classes: classThings
    })
  }
  
  addTimetable(classId, scheduleId) {
    let classThings   = this.state.classes
    let classIndex    = classThings.findIndex(obj => obj.id === classId)
    let scheduleIndex = classThings[classIndex].schedules.findIndex(obj => obj.id === scheduleId)
    classThings[classIndex].schedules[scheduleIndex].timetables.push({
      id: uuid.v4(),
      days: [],
      hours: { ini: '00:00', end: '00:00' }
    })
    this.setState({
      classes: classThings
    })
  }
  
  deleteTimetable(classId, scheduleId, id) {
    let classThings   = this.state.classes
    let classIndex    = classThings.findIndex(obj => obj.id === classId)
    let scheduleIndex = classThings[classIndex].schedules.findIndex(obj => obj.id === scheduleId)
    let index = classThings[classIndex].schedules[scheduleIndex].timetables.findIndex(obj => obj.id === id)
    classThings[classIndex].schedules[scheduleIndex].timetables.splice(index, 1)
    this.setState({
      classes: classThings
    })
  }
  
  changeName(classIn, value) {
    let classThings = this.state.classes
    classThings[classIn].name = value
    this.setState({
      classes: classThings
    })
  }
  
  changeHoursIni(classIn, scheduleIn, timetableIn, value) {
    let classThings = this.state.classes
    classThings[classIn].schedules[scheduleIn].timetables[timetableIn].hours.ini = value
    this.setState({
      classes: classThings
    })
  }
  
  changeHoursEnd(classIn, scheduleIn, timetableIn, value) {
    let classThings = this.state.classes
    classThings[classIn].schedules[scheduleIn].timetables[timetableIn].hours.end = value
    this.setState({
      classes: classThings
    })
  }
  
  changeDaysChecked(classIn, scheduleIn, timetableIn, day, bool) {
    let classThings = this.state.classes
    let index = classThings[classIn].schedules[scheduleIn].timetables[timetableIn].days.findIndex(dayThing => dayThing === day)
    if (bool === true && index === -1) {
      classThings[classIn].schedules[scheduleIn].timetables[timetableIn].days.push(day)
    // } else if (bool === true && index !== -1) {
    // } else if (bool === false && index !== -1) {
    } else if (bool === false && index !== -1) {
      classThings[classIn].schedules[scheduleIn].timetables[timetableIn].days.splice(index, 1)
    }
    this.setState({
      classes: classThings
    })
  }
}

export default AppFilled