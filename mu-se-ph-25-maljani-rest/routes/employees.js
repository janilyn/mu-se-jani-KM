  var express = require('express');
  const employeesController = require('../controllers/employeesController');

  // function returns the created express router for /employees
  // NOTE: pinaghiwalay ko lang yung routes and controllers for readability
        // I did it like this kasi nahihilo ako and naooverwhelm sa long blocks of code
        // which makes me miss some details and baka prone to errors (it's a me problem)
        // In reality kasi, you'll have more HTTP methods that what's specified below
        // and if pinagsama-sama mo lahat dito yung routing and the functions,
        // mahihirapan kang basahin at idebug tong file na to (idk baka it's just me) 
        // Agin, you dont need to do it like this. It's just a personal preference :)))
  // ALTERNATIVE: you can also directly put the functions ../controllers/employeesController here
        // See this example:
            // employeeRouter.route('/')
            //   .get( function (req, res) {
            //       const department = req.query.department;
            //       try {
            //           let employeeList = Employee
            //           if (department) {
            //               employeeList = Employee.filter(employee => employee.department === department);
            //           }
            //           if(employeeList){
            //               return res.status(200).json(employeeList);
            //           }
            //           return res.status(404).json(`No employees under the ${department} Department.`)
            //       } catch (e) {
            //           res.status(400).send(e);
            //       }
            //     }
            //   );

  // Notice how this function needs an Employee param.
  // In this implementation, we loaded the data in app.js and we just passed it to the routes and controllers
  // I did it that way because it's based on our pet project wherein we separated the post contents and the vote numbers (upvote/downvote)
  // That approach is a little different from the labs na dito sa routes mismo yung pag-import ng data
  // Ok ang hirap iexplain neto as someone na may skill issue sa words so just ask me personally if u wanna know more abt my reason hehe
  function routes (Employee) {
    var employeeRouter = express.Router();
    const controller = employeesController(Employee);

    // kaya .route('/') lang siya and not .route('/employees') is bc you already assigned 
    // this route to /employees in app.js (refer to ../app.js Line 31)
    // NOTE: Dun sa controller._____ the blank part corresponds to the function inside the controller
          // that contains your code for the http method
    employeeRouter.route('/')
      .get(controller.get);             // defines what the GET /employees method does

    // NOTE: I used _id to get the parameters of /employees so if I want to get the employee ID 
          // from the link, then _id gagamitin ko for this.
          // In the labs we always named it as id so baka malito kayo. Technically, you can name the params
          // by anything. Just remember to use that name to get the params :)))
          // This is useful for the controllers part of my code hehehe
      employeeRouter.route('/:_id')
      .get(controller.getById);         // defines what the GET /employees/_id method does

    return employeeRouter;
  }
  // });
  module.exports = routes;
  