# App web de combinación de horarios

Esta aplicación escrita en Node.js, cuyo servidor funciona con Express.js y su front-end funciona con ReactJS y reactstrap (Bootstrap para React), sirve para crear todas las posibles combinaciones de horarios posibles con base en un grupo de horarios iniciales. Se puede encontrar aquí: https://horit.herokuapp.com/ (tal vez tarde unos segundos en cargar).

![alt text](https://github.com/dokasov/horit/blob/master/img/horit.png)

Se puede presionar el botón Prueba y después Listo para ver cómo funciona, las flechas a la derecha de cada clase sirven para desplegar sus posibles horarios. Video en el que explico mejor cómo funciona: https://www.facebook.com/camilogozp/videos/2603947522948856/

La programé porque quería diseñar una forma más eficiente y rápida de crear mis horarios para la universidad. El algoritmo principal está en el archivo `optimizer.js` y todo el código de React está en `client`.
