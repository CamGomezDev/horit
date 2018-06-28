import ResSchedule from './ResSchedule.js'
import React, { Component } from 'react'
import uuid from 'uuid'

class SchedulesGroup extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    let schedulesGroup = this.props.arr.map((scheduleRes) => {
      return(
        <ResSchedule singleArr={scheduleRes} classesColors={this.props.classesColors} key={uuid.v4()}/>
      )
    })
    return(
      <div>
        {schedulesGroup}
      </div>
    )
  }
}

export default SchedulesGroup