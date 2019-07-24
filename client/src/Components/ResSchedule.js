import React, { Component } from 'react'
import './ResSchedule.css'
import { Table } from 'reactstrap'
import uuid from 'uuid'

class ResSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: [],
      daysAft: [],
      classesWithColors: this.props.classesWithColors
    }

    this.state.days = this.organizeByDay(this.props.classesWithSchedules)
    this.state.daysAft = this.createSlots()
  }

  newDays() {
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

  organizeByDay(classesWithSchs) {
    let days = this.newDays()
    for(let i=0; i<classesWithSchs.length; i++) {
      for(let e=0; e<classesWithSchs[i].timetables.length; e++) {
        for(let o=0; o<classesWithSchs[i].timetables[e].days.length; o++) {
          if(classesWithSchs[i].timetables[e].days[o]==='Lu') {
            days[0].slots.push({
              color:this.checkColor(classesWithSchs[i].classId),
              name:classesWithSchs[i].className,
              ini:classesWithSchs[i].timetables[e].hours.ini,
              end:classesWithSchs[i].timetables[e].hours.end,
            })
          }
          if(classesWithSchs[i].timetables[e].days[o]==='Ma') {
            days[1].slots.push({
              color:this.checkColor(classesWithSchs[i].classId),
              name:classesWithSchs[i].className,
              ini:classesWithSchs[i].timetables[e].hours.ini,
              end:classesWithSchs[i].timetables[e].hours.end,
            })
          }
          if(classesWithSchs[i].timetables[e].days[o]==='Mi') {
            days[2].slots.push({
              color:this.checkColor(classesWithSchs[i].classId),
              name:classesWithSchs[i].className,
              ini:classesWithSchs[i].timetables[e].hours.ini,
              end:classesWithSchs[i].timetables[e].hours.end,
            })
          }
          if(classesWithSchs[i].timetables[e].days[o]==='Ju') {
            days[3].slots.push({
              color:this.checkColor(classesWithSchs[i].classId),
              name:classesWithSchs[i].className,
              ini:classesWithSchs[i].timetables[e].hours.ini,
              end:classesWithSchs[i].timetables[e].hours.end,
            })
          }
          if(classesWithSchs[i].timetables[e].days[o]==='Vi') {
            days[4].slots.push({
              color:this.checkColor(classesWithSchs[i].classId),
              name:classesWithSchs[i].className,
              ini:classesWithSchs[i].timetables[e].hours.ini,
              end:classesWithSchs[i].timetables[e].hours.end,
            })
          }
          if(classesWithSchs[i].timetables[e].days[o]==='Sa') {
            days[5].slots.push({
              color:this.checkColor(classesWithSchs[i].classId),
              name:classesWithSchs[i].className,
              ini:classesWithSchs[i].timetables[e].hours.ini,
              end:classesWithSchs[i].timetables[e].hours.end,
            })
          }
          if(classesWithSchs[i].timetables[e].days[o]==='Do') {
            days[6].slots.push({
              color:this.checkColor(classesWithSchs[i].classId),
              name:classesWithSchs[i].className,
              ini:classesWithSchs[i].timetables[e].hours.ini,
              end:classesWithSchs[i].timetables[e].hours.end,
            })
          }
        }
      }
    }

    return days
  }

  checkColor(classId) {
    for(let a = 0; a < this.state.classesWithColors.length; a++) {
      if(this.state.classesWithColors[a].id === classId) {
        return(this.state.classesWithColors[a].color)
      }
    }
  }

  createSlots() {
    let daysBef = this.state.days
    let daysAft = this.newDays()
    for(let i=0; i<daysBef.length; i++) {
      for(let e=0; e<daysBef[i].slots.length; e++) {
        daysAft[i].slots.push(JSON.parse(JSON.stringify(daysBef[i].slots[e])))
        daysAft[i].slots[e].ini = parseInt(daysBef[i].slots[e].ini.substr(0,2),10)
        if(daysBef[i].slots[e].end.substr(3,2) === '00') {
          daysAft[i].slots[e].end = parseInt(daysBef[i].slots[e].end.substr(0,2),10) - 1
        } else {
          daysAft[i].slots[e].end = parseInt(daysBef[i].slots[e].end.substr(0,2),10)
        }
      }
    }

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
    let message = []
    let h = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
    let daysNew = JSON.parse(JSON.stringify(this.state.daysAft))
    let days = daysNew.map((day,step) => {
      message.push([])
      let checked = false
      let hours = h.map((hour) => {
        for(let e=0; e<day.slots.length; e++) {
          let removed = false
          let color, name
          if(hour === 7) {
            message[step].push(day.slots.length)
            message[step].push(removed, checked)
            message[step].push(day.slots[e].ini,day.slots[e].end)
          }
          if(hour === day.slots[e].ini) {
            checked = true
          }
          if(hour === day.slots[e].end) {
            checked = false
            removed = true
            color = day.slots[e].color
            name = day.slots[e].name
            if(hour === 7) {
              message[step].push('bo')
            }
            // message[step].push('bo',hour,day.slots[e].end)
            // message[step].push(JSON.parse(JSON.stringify(day.slots[e])))
            day.slots.splice(e, 1)
          }
          if(checked) {
            return(
              <tr key={uuid.v4()} style={{background:day.slots[e].color}}><td>{day.slots[e].name || '-'}</td></tr>
            )
          }
          if(removed) {
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