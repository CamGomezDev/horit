import React, { Component } from 'react'
import './ResSchedule.css'
import { Table } from 'reactstrap'
import uuid from 'uuid'

class ResSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      daysRaw:   [], // días con las clases en desorden y horas de inicio y fin como strings
      daysClean: [], // días con las clases en orden y horas de inicio y fin como ints
      classesWithColor: this.props.classesWithColor
    }

    this.state.daysRaw   = this.arrangeClassesByDay(this.props.classesWithSchedule)
    this.state.daysClean = this.organizeDays()
  }

  newWeekDays() {
    let days = [
      {
        day:'Lu',
        slots:[]
      },
      {
        day:'Ma',
        slots:[]
      },
      {
        day:'Mi',
        slots:[]
      },
      {
        day:'Ju',
        slots:[]
      },
      {
        day:'Vi',
        slots:[]
      },
      {
        day:'Sa',
        slots:[]
      },
      {
        day:'Do',
        slots:[]
      },
    ]

    return days
  }

  /* Se llena el arreglo days con los arreglos de todas las clases que se dan 
     cada día y su horario del día */
  arrangeClassesByDay(classesWithSch) {
    let days = this.newWeekDays()
    for (let i = 0; i < classesWithSch.length; i++) {
      for (let e = 0; e < classesWithSch[i].timetables.length; e++) {
        for (let o = 0; o < classesWithSch[i].timetables[e].days.length; o++) {
          if (classesWithSch[i].timetables[e].days[o] === 'Lu') {
            days[0].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if (classesWithSch[i].timetables[e].days[o] === 'Ma') {
            days[1].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if (classesWithSch[i].timetables[e].days[o] === 'Mi') {
            days[2].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if (classesWithSch[i].timetables[e].days[o] === 'Ju') {
            days[3].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if (classesWithSch[i].timetables[e].days[o] === 'Vi') {
            days[4].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if(classesWithSch[i].timetables[e].days[o] === 'Sa') {
            days[5].slots.push(this.newSlot(classesWithSch[i], e))
          }
          if(classesWithSch[i].timetables[e].days[o] === 'Do') {
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

    // Se convierten las horas como strings en ints
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

    // Se arreglan las clases en orden en cada día
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
    // En este punto, las clases están en orden en cada día
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
                    <tr><td>Hora</td></tr>
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