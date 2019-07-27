module.exports = {
  alg: optimizer
}

/*
  Este código es el que genera todas las posibles combinaciones de los horarios.

  - La entrada que recibe es los cursos, en donde cada uno tiene los diferentes ho-
    rarios disponibles en forma de arreglo.
  - La salida es todas las posibles combinaciones de dichos cursos que no generan
    intersecciones.

  Para hacer esto el proceso tiene tres etapas:

  1. Se desea poder acceder a todas las posibles combinaciones de estos cursos 
     (todas sin excepción, se intersecten o no). Para esto se crea de forma recur-
     siva el arreglo multi-dimensional indsRecurArray, en donde el número de dimen-
     siones equivale al número de cursos, y el número de elementos en cada arreglo 
     de cada dimensión equivale al número de horarios del curso correspondiente a
     dicha dimensión.

  2. Teniendo este arreglo ahora se llena la última dimensión con los arreglos de
     índices que representan todas las posibles combinaciones de los cursos. Los
     índices siendo aquellos que identifican a los horarios en cada curso.
     
  3. Finalmente se usa un nuevo arreglo goodCombs, que se llena a medida que se
     va llenado la última dimensión del anterior, en el que se usan los índices
     para comprobar si hay intersecciones entre cada uno de los horarios corres-
     pondientes a dichos índices, que se hace comparando cada uno a fuerza bruta.
     Si no se encuentra una intersección, esta combinación de horarios es buena
     y se añade a goodCombs.

  Seguro hay otras formas de hacer esto pero esta es la primera que se me ocurrió.
*/

function optimizer (courses) {
  let indsRecurArray = []
  let goodCombs      = []
  let numCourses = courses.length
  indsRecurArray = recurCreation(0, courses[0].schedules.length, indsRecurArray)
  indsRecurArray = recurFill(0, numCourses, indsRecurArray, [])

  return {combs: goodCombs}

  // Parte 1: creación recursiva de arreglo a ser llenado con índices
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
    /* Parte 2: se cargan los índices en cada dimensión hasta llegar
       a la última, en donde finalmente se rellenan los arreglos con los
       mismos */
    if (currDimInRecurArr.length > 0) {
      for(let i = 0; i < currDimInRecurArr.length; i++) {
        let indsArrCopy = JSON.parse(JSON.stringify(indsArr))
        indsArrCopy.push(i)
        currDimInRecurArr[i] = recurFill(count + 1, totDims, currDimInRecurArr[i], indsArrCopy)
      }
    /* Parte 3: si ya se llegó a la última dimensión usar el arreglo de
       índices para hacer las comparaciones entre los horarios */
    } else if (count === totDims) {
      let retObj = compareAndReturnComb(indsArr)
      if(retObj.isGoodComb) {
        goodCombs.push(retObj.comb)
      }
      currDimInRecurArr = indsArr
    }

    return currDimInRecurArr
  }

  // Comprobación de intersecciones
  function compareAndReturnComb(indsArr) {
    // Encontrar los arreglos en cada curso correspondiente a los índices
    let schedsArray = []
    for(let i = 0; i < indsArr.length; i++) {
      let schedule = {}
      schedule = courses[i].schedules[indsArr[i]]
      schedule.className = courses[i].name
      schedule.classId   = courses[i].id
      delete schedule.id
      schedsArray.push(schedule)
    }
    
    // Comprobar intersecciones a fuerza bruta con cada horario
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