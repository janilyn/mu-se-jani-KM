const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001'

const Query = {
    // Get employees details given a employee's id
    employee: async (parent, args, content, info) => {
        const { id } = args;
        const response = await fetch(`${API_URL}/employees/${id}`);
        const data = response.json();
        return data;
    },
    
    // Get list of all employees
    // Checks first if you have a query 
        // if yes, apply query to full employee list
        // if none, return all employees
    // NOTE: You may be wondering why I repeated lines 28-29 and 32-33 if they're doing the same thing for both if statements.
        // Baka isipin niyo why not ilabas na lang sa if statement since it's the same thing 
        // but note na response is defined inside each if statement so yung scope niya ends with the end ng if block na yun
        // meaning, you cant access the value of response outside each if block.
    // ALTERNATIVE: Declare response before the if statement using let para you can just change its value inside the ifs
        // This way, within scope pa rin si response pag nilabas mo ung const data = response.json() and return data;
        //  (This is untested baka di gumana)
    employeeList: async (parent, args, content, info) => {
        const { department } = args;
        if(!department){
            const response = await fetch(`${API_URL}/employees`);
            const data = response.json();
            return data;
        } else {
            const response = await fetch(`${API_URL}/employees?department=${department}`);
            const data = response.json();
            return data;
        }
    },
}

module.exports = { Query };