import ResSchedule from './ResSchedule.js'
import React, { PureComponent } from 'react'
import uuid from 'uuid'

/* PureComponent to avoid unnecessary rendering, see: 
   https://www.kirupa.com/react/avoiding_unnecessary_renders.htm */
class ResSchedulesGroup extends PureComponent {

  // Unnecessary due to PureComponent
  // shouldComponentUpdate(nextProps, nextState) {}

  render() {
    let classesWithColor = []
    //red, blue, green, yellow, pink, orange
    let colors = ['#e63737','#5a7aed','#69db40','#fff947','#ed79c3','#de823c']
    for(let i = 0; i < this.props.classesName.length; i++) {
      if(i < 6) {
        classesWithColor.push({
          name: this.props.classesName[i].name,
          id: this.props.classesName[i].id, 
          color: colors[i]
        })
      } else {
        // Random colors after 6 basic ones
        let color = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);})
        classesWithColor.push({
          name: this.props.classesName[i].name,
          id: this.props.classesName[i].id,
          color: color
        })
      }
    }

    let combinations = this.props.goodCombs.map((combination) => {
      return(
        <ResSchedule classesWithSchedule={combination} classesWithColor={classesWithColor} key={uuid.v4()}/>
      )
    })
    
    return(
      <div>
        <div style={{marginBottom:15}} >{combinations.length} possible combinations were generated:</div>
        {combinations}
      </div>
    )
  }
}

export default ResSchedulesGroup