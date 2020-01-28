import React, { Component } from 'react'
import './ResSchedule.css'
import { Table } from 'reactstrap'
import uuid from 'uuid'

class ResSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      daysRaw:   [], // days with unorganized classes and ini and end times as strings
      daysClean: [], // days with classes in order and ini and end times as ints
      classesWithColor: this.props.classesWithColor
    }

    this.state.daysRaw   = this.arrangeClassesByDay(this.props.classesWithSchedule)
    this.state.daysClean = this.organizeDays()
  }

  newWeekDays() {
    let days = [
      {
        day:'Mo',
        slots:[]
      },
      {
        day:'Tu',
        slots:[]
      },
      {
        day:'We',
        slots:[]
      },
      {
        day:'Th',
        slots:[]
      },
      {
        day:'Fr',
        slots:[]
      },
      {
        day:'Sa',
        slots:[]
      },
      {
        day:'Su',
        slots:[]
      },
    ]

    return days
  }

  /* The days array is filled with the arrays of all of the classes that are imparted
     each day and its timeframe for the day */
  arrangeClassesByDay(classesWithSch) {
    let days = this.newWeekDays()
    for (let i = 0; i < classesWithSch.length; i++) {
      for (let e = 0; e < classesWithSch[i].timetables.length; e++) {
        for (let o = 0; o < classesWithSch[i].timetables[e].days.length; o++) {
          if (classesWithSch[i].timetables[e].days[o] === 'Mo') {
            days[0].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if (classesWithSch[i].timetables[e].days[o] === 'Tu') {
            days[1].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if (classesWithSch[i].timetables[e].days[o] === 'We') {
            days[2].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if (classesWithSch[i].timetables[e].days[o] === 'Th') {
            days[3].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if (classesWithSch[i].timetables[e].days[o] === 'Fr') {
            days[4].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if(classesWithSch[i].timetables[e].days[o] === 'Sa') {
            days[5].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if(classesWithSch[i].timetables[e].days[o] === 'Su') {
            days[6].slots.push(this.newSlot(classesWithSch[i], e))
          }
        }
      }
    }

    return days
  }

  newSlot(classWithSchedule, e) {
    return ({
      color: this.checkColor(classWithSchedule.classId),
      name: classWithSchedule.className,
      ini: classWithSchedule.timetables[e].hours.ini,
      end: classWithSchedule.timetables[e].hours.end,
    })
  }

  checkColor(classId) {
    for (let a = 0; a < this.state.classesWithColor.length; a++) {
      if (this.state.classesWithColor[a].id === classId) {
        return(this.state.classesWithColor[a].color)
      }
    }
  }

  organizeDays() {
    let daysBef = this.state.daysRaw
    let daysAft = this.newWeekDays()

    // The times as strings are transformed into ints
    for (let i = 0; i < daysBef.length; i++) {
      for (let e = 0; e < daysBef[i].slots.length; e++) {
        daysAft[i].slots.push(JSON.parse(JSON.stringify(daysBef[i].slots[e])))
        daysAft[i].slots[e].ini = parseInt(daysBef[i].slots[e].ini.substr(0,2),10)
        if (daysBef[i].slots[e].end.substr(3,2) === '00') {
          daysAft[i].slots[e].end = parseInt(daysBef[i].slots[e].end.substr(0,2),10) - 1
        } else {
          daysAft[i].slots[e].end = parseInt(daysBef[i].slots[e].end.substr(0,2),10)
        }
      }
    }

    // The classes are aranged in order each day
    for(let o = 0; o < daysAft.length; o++) {
      daysAft[o].slots.sort((a,b) => {
        if(a.ini < b.ini) {
          return -1
        } else {
          return 1
        }
      })
    }

    return daysAft
  }

  render() {
    let h = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
    let daysCleanCopy = JSON.parse(JSON.stringify(this.state.daysClean))
    // At this step, the classes are in order in each day
    let days = daysCleanCopy.map((day, step) => {
      let checked = false
      let hours = h.map((hour) => {
        for (let e = 0; e < day.slots.length; e++) {
          let removed = false
          let color, name
          if (hour === day.slots[e].ini) {
            checked = true
          }
          if (hour === day.slots[e].end) {
            checked = false
            removed = true
            color = day.slots[e].color
            name = day.slots[e].name
            day.slots.splice(e, 1)
          }
          if (checked) {
            return(
              <tr key={uuid.v4()} style={{background:day.slots[e].color}}><td>{day.slots[e].name || '-'}</td></tr>
            )
          }
          if (removed) {
            return(
              <tr key={uuid.v4()} style={{background:color}}><td>{name || '-'}</td></tr>
            )
          }
        }
        return(<tr key={uuid.v4()}><td>{'-'}</td></tr>)
      })
      return(
        <td style={{margin:0,padding:0}} key={uuid.v4()}>
          <Table size='sm' style={{margin:0,padding:0}}>
            <tbody>
              <tr><td>{day.day}</td></tr>
              {hours}
            </tbody>
          </Table>
        </td>
      )
    })
    return(
      <div style={{fontSize:11}}>
        <Table bordered style={{width:800}}>
          <tbody>
            <tr>
              <td style={{margin:0,padding:0}}>
                <Table size='sm' style={{margin:0,padding:0}}>
                  <tbody>
                    <tr><td>Time</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>7:00</td></tr>
                    <tr><td>8:00</td></tr>
                    <tr><td>9:00</td></tr>
                    <tr><td>10:00</td></tr>
                    <tr><td>11:00</td></tr>
                    <tr><td>12:00</td></tr>
                    <tr><td>13:00</td></tr>
                    <tr><td>14:00</td></tr>
                    <tr><td>15:00</td></tr>
                    <tr><td>16:00</td></tr>
                    <tr><td>17:00</td></tr>
                    <tr><td>18:00</td></tr>
                    <tr><td>19:00</td></tr>
                    <tr><td>20:00</td></tr>
                    <tr><td>21:00</td></tr>
                  </tbody>
                </Table>
              </td>
              {days}
            </tr>
          </tbody>
        </Table>
        <hr/>
        {/* <pre>{JSON.stringify(message)}</pre>
        <pre>{JSON.stringify(this.state.daysAft,null,2)}</pre> */}
      </div>
    )
  }
}


export default ResSchedule