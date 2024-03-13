// HELLO 0% COVERAGE TALAGA ITO SO MUKHANG MALI YUNG GINAWA KO HAHAHA
// NEED DAW MAGMOCK NG REQUEST PERO IM NOOB SO IDK HOW TO DO THAT
// Figure it out na lang by yourselves na lang sorry sorry :(((

const request = require('supertest')
const data = require('./data/employees.js')
const app = require('./app.js');

describe('employeeRouter', () => {
    it('should return the details for all employees for the request GET /employees', async () => {
       // Arrange
       const resExpected = data.employees;

       // Act
        const res = await request(app)
            .get('/employees')

       // Assert
       expect(res.body).toEqual(resExpected);
  
    }),
    it('should return all employees in IT department for the request GET /employees?department=IT when the department query is valid', async () => {
        // Arrange
        const resExpected = data.employees.filter(employees=>employees.department ==="IT");
 
        // Act
         const res = await request(app)
             .get('/employees?department=IT')
 
        // Assert
        expect(res.body).toEqual(resExpected);
   
     }),
     it('should return an empty list for the request GET /employees?department=IT when the department query is not valid', async () => {
        // Arrange
        const resExpected = [];
 
        // Act
         const res = await request(app)
             .get('/employees?department=ITs')
 
        // Assert
        expect(res.body).toEqual(resExpected);
   
     }),
     it('should return the detail of Employee ID 1 for the request GET /employees/1', async () => {
        // Arrange
        const resExpected = data.employees.find(employee => parseInt(employee.id) === 1);
 
        // Act
         const res = await request(app)
             .get('/employees/1')
 
        // Assert
        expect(res.body).toEqual(resExpected);
   
     }),
     it('should return an empty object for the request GET /employees/111', async () => {
        // Arrange
        const resExpected = {};
 
        // Act
         const res = await request(app)
             .get('/employees/11')
 
        // Assert
        expect(res.body).toEqual(resExpected);
     });
  });