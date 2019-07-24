const util = require('util')

module.exports = {
  alg: optimizer
}

function optimizer (classThings) {
  let groupsArray  = []
  let groupsOrgArr = []
  groupsArray = groupsArrayCre(0, classThings[0].schedules.length, groupsArray)
  let tots = classThings.length
  groupsArray = recurFill(0, tots, groupsArray, [])
  return {groups: groupsOrgArr, groupsInd:groupsArray}


  function groupsArrayCre(count, tot, arr) {
    count = count + 1
    for(let i = 0; i < tot; i++) {
      arr.push([])
      if(count !== classThings.length) {
        arr[i] = groupsArrayCre(count, classThings[count].schedules.length, arr[i])
      }
    }
    return arr
  }

  function recurFill(count, tot, arr, arr2) {
    if(arr.length>0) {
      for(let i=0; i<arr.length; i++) {
        let arr2p = JSON.parse(JSON.stringify(arr2))
        arr2p.push(i)
        arr[i] = recurFill(count+1, tot, arr[i], arr2p)
      }
    } else if(count===tot) {
      let retObj = compAndRetSches(arr2)
      if(retObj.done) {
        groupsOrgArr.push(retObj.arr)
      }
      arr = arr2
    }
    return arr
  }
  
  function compAndRetSches(indsArr) {
    let schedsArray = []
    for(let i=0; i<indsArr.length; i++) {
      let himArr = {}
      himArr = classThings[i].schedules[indsArr[i]]
      himArr.className = classThings[i].name
      himArr.classId = classThings[i].id
      schedsArray.push(himArr)
    }
  
    let intersection = false
  
    for(let e = 0; e < schedsArray.length; e++) {
      for(let o = e + 1; o < schedsArray.length; o++) {
        for(let c = 0; c < schedsArray[e].timetables.length; c++) {
          for(let d = 0; d < schedsArray[o].timetables.length; d++) {
            let timetable1 = schedsArray[e].timetables[c]
            let timetable2 = schedsArray[o].timetables[d]
            let ini1 = parseInt(timetable1.hours.ini.substr(0,5).replace(':',''))
            let end1 = parseInt(timetable1.hours.end.substr(0,5).replace(':',''))
            let ini2 = parseInt(timetable2.hours.ini.substr(0,5).replace(':',''))
            let end2 = parseInt(timetable2.hours.end.substr(0,5).replace(':',''))
            for(let b = 0; b < timetable1.days.length; b++) {
              for(let d = 0; d < timetable2.days.length; d++) {
                if(timetable1.days[b] === timetable2.days[d]) {
                  if((ini1 >= ini2 && ini1 < end2) || (end1 <= end2 && end1 > ini2) || (ini1 <= ini2 && end1 >= end2)) {
                    intersection = true
                  }
                }
              }
            }
          }
        } 
      }
    }
    if(!intersection) {
      return {done: true, arr: schedsArray}
    }
    return {done: false, arr: []}
  }
}