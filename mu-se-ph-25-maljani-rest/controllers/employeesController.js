function employeesController(Employee) {

    // connected to GET /employees request thru ../routes/employees.js Line 46
    // This function first gets the department query then filters the employee list by department
    function get(req, res) {
        const department = req.query.department;                                                        // gets the department query
        try {
            let employeeList = Employee                                                                 // employee data (array of objects)

            // This if statement determines if the client specified a query in the request
            // We only have one query option (dept) so I only have one if condition but if there's multiple query options, 
            // then multiple ifs (NOT IF-ELSE) yan heheh
            // if true, it just filters the whole employeeList by the dept
            // if not, then employeeList is still the original data
            if (department) {
                employeeList = employeeList.filter(employee => employee.department === department);
            }

            // checks if there are still elements left in employeeList after the query
            // kapag kasi wala nang natira and Employee is not empty, then 404 (??? not sure with status codes)
            // if may laman pa, then successful query tapos return niya lang:
                    // if may query: the filtered version
                    // if wala:      the full list 
            if(employeeList){
                return res.status(200).json(employeeList);
            }

            // BUG: kapag originally empty yung dataset then nag GET /employees ka without the dept query,
                // mali yung ilabas na message. You can put an if statement after line 8 to determine this
                // then send another response with a different message as below 
                // bc that assumes wala natira bc of the query
            return res.status(404).json(`No employees under the ${department} Department.`)
        } catch (e) {
            res.status(400).send(e);
        }
    }

    // connected to GET /employees/_id request thru ../routes/employees.js Line 54
    function getById(req, res) {
        try {
            const id = parseInt(req.params._id);                                                // NOTE: we specified during routing na _id yung name ng params (refer to Lines 48-54 ng router) 
            const employee = Employee.find(employee => parseInt(employee.id) === id);           // gets the specific employee

            // ASSUMPTION: Employee is not empty :)))
            // Checks if there exists an employee with an id === req.params._id
            if (employee) {
                return res.status(200).json(employee);
            }

            // If there is no employee with that id then return error
            return res.status(404).send(`There is no employee with an id of ${id}.`)
        } catch (e) {
            res.status(400).send(e);
        }
    }
    return { get, getById }
  }

module.exports = employeesController;