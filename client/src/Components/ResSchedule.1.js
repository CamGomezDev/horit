import React, { Component } from 'react'
import './ResSchedule.css'
import { Table } from 'reactstrap'

class ResSchedule extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return(
      <div style={{fontSize:14}}>
        <Table responsive bordered size='sm'>
          <thead>
            <tr>
              <th className="boom">#</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr style={{height:'145/455%'}}>
              <th scope="row">2</th>
              <td>Table cell</td>
              <td style={{height:'145/455%'}}>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}


export default ResSchedule