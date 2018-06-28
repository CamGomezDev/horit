import React, { Component } from 'react'
import './ResSchedule.css'
import { Table } from 'reactstrap'

class ResSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: [
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
      ],
      daysAft: [
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
      ],
      classes: [
      ]
    }
  }
  colors = ['red','blue','green','yellow','pink','orange','grey']

  organizeClassesColor(arr) {
    let classesThings = this.state.classes
    for(let i=0; i<arr.length; i++) {
      classesThings.push({name:arr[i].name,color:this.colors[i]})
    }
    this.setState({classes:classesThings})
  }

  checkColor(className) {
    for(let a=0; a<this.state.classes.length; a++) {
      if(this.state.classes[a].name === className) {
        return(this.state.classes[a].color)
      }
    }
  }

  organizeByDay(arr) {
    let days = this.state.days
    for(let i=0; i<arr.length; i++) {
      for(let e=0; e<arr[i].timetables.length; e++) {
        for(let o=0; o<arr[i].timetables[e].days.length; o++) {
          if(arr[i].timetables[e].days[o]==='Lu') {
            days[0].slots.push({
              color:this.checkColor(arr[i].className),
              name:arr[i].className,
              ini:arr[i].timetables[e].hours.ini,
              end:arr[i].timetables[e].hours.end,
            })
          }
          if(arr[i].timetables[e].days[o]==='Ma') {
            days[1].slots.push({
              color:this.checkColor(arr[i].className),
              name:arr[i].className,
              ini:arr[i].timetables[e].hours.ini,
              end:arr[i].timetables[e].hours.end,
            })
          }
          if(arr[i].timetables[e].days[o]==='Mi') {
            days[2].slots.push({
              color:this.checkColor(arr[i].className),
              name:arr[i].className,
              ini:arr[i].timetables[e].hours.ini,
              end:arr[i].timetables[e].hours.end,
            })
          }
          if(arr[i].timetables[e].days[o]==='Ju') {
            days[3].slots.push({
              color:this.checkColor(arr[i].className),
              name:arr[i].className,
              ini:arr[i].timetables[e].hours.ini,
              end:arr[i].timetables[e].hours.end,
            })
          }
          if(arr[i].timetables[e].days[o]==='Vi') {
            days[4].slots.push({
              color:this.checkColor(arr[i].className),
              name:arr[i].className,
              ini:arr[i].timetables[e].hours.ini,
              end:arr[i].timetables[e].hours.end,
            })
          }
          if(arr[i].timetables[e].days[o]==='Sa') {
            days[5].slots.push({
              color:this.checkColor(arr[i].className),
              name:arr[i].className,
              ini:arr[i].timetables[e].hours.ini,
              end:arr[i].timetables[e].hours.end,
            })
          }
          if(arr[i].timetables[e].days[o]==='Do') {
            days[6].slots.push({
              color:this.checkColor(arr[i].className),
              name:arr[i].className,
              ini:arr[i].timetables[e].hours.ini,
              end:arr[i].timetables[e].hours.end,
            })
          }
        }
      }
    }
    this.setState({days:days})
  }

  andDoSlots() {
    let daysBef = this.state.days
    let daysAft = this.state.daysAft
    for(let i=0; i<daysBef.length; i++) {
      for(let e=0; e<daysBef[i].slots.length; e++) {
        if()
      }
    }
  }

  UNSAFE_componentWillMount() {
    this.organizeClassesColor(this.props.classesColors)
    this.organizeByDay(this.props.singleArr)
  }

  render() {
    console.log(this.state)
    return(
      <div style={{height:400,fontSize:11}}>
        <Table bordered style={{height:'100%',width:'100%'}}>
          <tbody>
            <tr>
              <td style={{margin:0,padding:0}}>
                <Table size='sm' style={{margin:0,padding:0}}>
                  <tbody>
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
              <td>
                <Table bordered size='sm'>
                  <tbody>
                  </tbody>
                </Table>
              </td>
              <td>
                <Table bordered size='sm'>
                  <tbody>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                  </tbody>
                </Table>
              </td>
              <td>
                <Table bordered size='sm'>
                  <tbody>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                    <tr><td>6:00</td></tr>
                  </tbody>
                </Table>
              </td>
            </tr>
          </tbody>
        </Table>
        <pre>{JSON.stringify(this.props.arr,null,2)}</pre>
      </div>
    )
  }
}


export default ResSchedule