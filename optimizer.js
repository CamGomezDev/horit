module.exports = {
  alg: optimizer
}

/*
  This code is the one that generates all possible general schedules as a combina-
  tion of courses' schedules.

  - The input it receives is the courses, where each one has the different availa-
    ble timeframes in the form of an array.
  - The output is all the possible combinations from said courses that don't have
    intersections.

  To do this the process has three stages:

  1. We first want to create all possible combinations of these courses (intersec-
     ting or not). For this, the multi-dimensional array indsRecurArray is created
     recursively, where the number of dimensions is equal to the number of cour-
     ses, and the number of elements in each array in each dimension is equal to
     the number of schedules of the course corresponding to said dimension. Think
     of it like a tree configuration.

  2. Having this array, the last dimension is filled with the arrays of indices
     that represent all possible combinations of the courses. The indices are still
     those that identify the schedules of each course.
     
  3. Finally a new array goodCombs is used, that is filled alongside the last di-
     mension of the previous array, where the indices are used to check if there
     are intersections between each of the schedules corresponding to said indi-
     ces, which is done comparing each one with brute force. IF an intersection
     is not found, this combination of schedules is considered good and added to
     goodCombs.

  There are surely other better ways to do this but this is the first one I came
  up with.
*/

function optimizer (courses) {
  let indsRecurArray = []
  let goodCombs      = []
  let numCourses = courses.length
  indsRecurArray = recurCreation(0, courses[0].schedules.length, indsRecurArray)
  indsRecurArray = recurFill(0, numCourses, indsRecurArray, [])

  return {combs: goodCombs}

  // Part 1: recursive creation of the array to be filled with indices
  function recurCreation(count, totDims, arrToFill) {
    count++
    for(let i = 0; i < totDims; i++) {
      arrToFill.push([])
      if(count !== courses.length) {
        arrToFill[i] = recurCreation(count, courses[count].schedules.length, arrToFill[i])
      }
    }
    return arrToFill
  }

  function recurFill(count, totDims, currDimInRecurArr, indsArr) {
    /* Part 2: the indices are "carried" through each dimension until
       reaching the las one, where the arrays are finally filled with
       them */
    if (currDimInRecurArr.length > 0) {
      for(let i = 0; i < currDimInRecurArr.length; i++) {
        let indsArrCopy = JSON.parse(JSON.stringify(indsArr))
        indsArrCopy.push(i)
        currDimInRecurArr[i] = recurFill(count + 1, totDims, currDimInRecurArr[i], indsArrCopy)
      }
    /* Part 3: if last dimension is reached use the array of indices
       to make comparissons between schedules. */
    } else if (count === totDims) {
      let retObj = compareAndReturnComb(indsArr)
      if(retObj.isGoodComb) {
        goodCombs.push(retObj.comb)
      }
      currDimInRecurArr = indsArr
    }

    return currDimInRecurArr
  }

  // Intersection checking of all schedules in a single possible general schedule
  function compareAndReturnComb(indsArr) {
    // Find the arrays in each course corresponding to the indices
    let schedsArray = []
    for(let i = 0; i < indsArr.length; i++) {
      let schedule = {}
      schedule = courses[i].schedules[indsArr[i]]
      schedule.className = courses[i].name
      schedule.classId   = courses[i].id
      delete schedule.id
      schedsArray.push(schedule)
    }
    
    // Check intersections by brute fource
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
      return {isGoodComb: true, comb: schedsArray}
    }
    return {isGoodComb: false}
  }
}