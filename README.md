# Web app for schedules combination

This application is written in Node.js, its server works with Express.js and its front-end works with ReactJS and reactstrap (Bootstrap for React). With it you can create all possible combinations of schedules based on a set of initial possible timeframes for different classes. It's available here: https://horit.herokuapp.com/ (may take a couple of seconds loading).

![alt text](https://github.com/dokasov/horit/blob/master/img/horit.png)

You can press the Test button and then Ready to see how it works, the array at the right of each class can be used to expand its possible schedules.

I coded this because I wanted to design a more efficient and fast way to create schedules for university. The main algorithm is in the file `optimizer.js` and all of the React code is inside `client`.
