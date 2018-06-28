const util = require('util')

module.exports = {
  alg: optimizer
}

function optimizer (classThings) {
  let groupsArray  = []
  let groupsOrgArr = []
  //Se crea recursivamente un arreglo multidimensional con todos los grupos. El
  //número de dimensiones equivale al número de clases. El número de arreglos en
  //el último nivel sale del número de posibles combinaciones de los horarios en
  //cada clase
  groupsArray = groupsArrayCre(0, classThings[0].schedules.length, groupsArray)
  let tots = classThings.length
  //Teniendo el arreglo recursivo, se usa para llenar un nuevo arreglo con todas
  //las posibles combinaciones de horarios que no resultan en intersecciones.
  //El nuevo arreglo es groupsOrgArr, que tiene alcance general, y se manipula
  //en la función
  groupsArray = recurFill(0, tots, groupsArray, [])
  return {groups: groupsOrgArr}


  function groupsArrayCre(count, tot, arr) {
    //count va aumentando con la dimensión del arreglo que se va añadiendo
    count = count + 1
    for(let i=0; i<tot; i++) {
      arr.push([])
      //Precisamente, la recursividad se detiene cuando count se hace igual al
      //número de clases
      if(count !== classThings.length) {
        //En cada subnivel se añade un número de arreglos igual al número de horarios
        //que tiene la clase correspondiente a dicho subnivel
        arr[i] = groupsArrayCre(count, classThings[count].schedules.length, arr[i])
      }
    }
    return arr
  }

  function recurFill(count, tot, arr, arr2) {
    //Mismo principio que la groupsArrayCre, pero esta vez la recursividad se usa para
    //llenar los arreglos del último nivel del arreglo anterior, llenarlos con un arreglo
    //con los índices correspondiente en el nivel horarios respectivos en respectivas
    //clases.

    //También se llena el arreglo principal groupsOrgArr usando las iteraciones del con
    //los índices en el anterior
    if(arr.length>0) {
      for(let i=0; i<arr.length; i++) {
        //Se hace una copia de arr2, para que no se modifique con cada iteración del for
        let arr2p = JSON.parse(JSON.stringify(arr2))
        //arr2p se llena con las interaciones, que corresponde al índice del horario en la
        //respectiva clase
        arr2p.push(i)
        //se itera hasta llegar al último nivel deseado, en el cual los arreglos no tienen
        //más subarreglos y el if del principio no se cumple
        arr[i] = recurFill(count+1, tot, arr[i], arr2p)
      }
    } else if(count===tot) {
      //Cuando se llega al último nivel, se usa esta función que recibe el arreglo con los
      //índices y compara las tablas de tiempo de cada horario correspondiente a cada índice
      //en cada clase. Si no encuentra intersecciones entre horarios, retObj.done será true
      //y devolverá un arreglo con los horarios para esa respectiva iteración, el cual se
      //introduce a groupsOrgArr
      let retObj = compAndRetSches(arr2)
      if(retObj.done) {
        groupsOrgArr.push(retObj.arr)
      }
      arr = arr2
    }
    //este return realmente no es tan importante. Sólo llena el último nivel de
    //groupsArray, pero el que importa ahora es groupsOrgArr
    return arr
  }
  
  //Compare and return schedules
  function compAndRetSches(indsArr) {
    //Y aquí se comparan los horarios correspondientes al arreglo de índices
    //que entra
    let schedsArray = []
    for(let i=0; i<indsArr.length; i++) {
      //lolz name
      himArr = classThings[i].schedules[indsArr[i]]
      himArr.className = classThings[i].name
      himArr.classId = classThings[i].id
      schedsArray.push(himArr)
    }
  
    let match = false
  
    //Para los arreglos se compara sus tablas de tiempo. Si se encuentra
    //alguna interesección, match se vuelve true, y con eso se decide qué se
    //devuelve.
    for(let e=0; e<schedsArray.length; e++) {
      for(let o=e+1; o<schedsArray.length; o++) {
        for(let c=0; c<schedsArray[e].timetables.length; c++) {
          for(let d=0; d<schedsArray[o].timetables.length; d++) {
            let timetable1 = schedsArray[e].timetables[c]
            let timetable2 = schedsArray[o].timetables[d]
            //Horas como strings se pasan a números
            let ini1 = parseInt(timetable1.hours.ini.substr(0,5).replace(':',''))
            let end1 = parseInt(timetable1.hours.end.substr(0,5).replace(':',''))
            let ini2 = parseInt(timetable2.hours.ini.substr(0,5).replace(':',''))
            let end2 = parseInt(timetable2.hours.end.substr(0,5).replace(':',''))
            for(let b=0; b<timetable1.days.length; b++) {
              for(let d=0; d<timetable2.days.length; d++) {
                if(timetable1.days[b] === timetable2.days[d]) {
                  //Horas estén intersectada unas con otras
                  if((ini1>=ini2 && ini1<=end2) || (end1<=end2 && end1>=ini2)) {
                    match = true
                  }
                }
              }
            }
          }
        } 
      }
    }
    if(!match) {
      return {done: true, arr: schedsArray}
    }
    return {done: false, arr: []}
  }
}

