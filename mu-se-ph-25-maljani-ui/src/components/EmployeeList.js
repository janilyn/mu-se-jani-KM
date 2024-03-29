import EmployeeItem from "./EmployeeItem";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const GET_EMPLOYEES = gql` # The gql code is generated by the GQL app.
  # copy paste lang from Apollo
  query EmployeeQuery {
  employeeList {
    id
    name
    title
    dob
    department
    avatarUrl
  }
}
`

// Does the filtering and generation of cards for each employee
// NOTE: in this implementation, nagfefetch lang tayo once (GET /employees) since static lang yung data
// im not sure if ang gusto ba nila is dapat magfefetch ka ng GET /employees/id each time names are 
// clicked you can try that as an exercise if trip niyo hehehe
const EmployeeList = () => {
  // gets the query from gql then saves it in data
  // NOTE: the return value is {employeeList: [{employee1}, {employee2},...]}
  // you can check gql output for this
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  // the employees variable will contain the employees to be displayed in the website
  // setEmployess will be the one responsible of changing the value of employees variable
  const [employees, setEmployees] = useState([]);

  // after it loads, sets the value of employee to data.
  useEffect(() => {
    if(!loading)
      setEmployees(data.employeeList)
  }, [data, loading]);

  // We can see sa UI na I used a textbox to get the department the user wants to filter
  // there are other ways to do this but this is the fastest way for me hehehe
  // you can try other ways din as an exercise
  const handleOnFilterButtonClick = () => {
    // document.getElementById('department-filter').value     ==> gets the string the user entered in the textbox
    // Skip this part if u know this na hehhe
          // 'department-filter'    ==>   id we set for the text box (refer to Line 76 of this file)
          // document               ==>   basically the whole page
          // document.getElementById('department-filter')         ==>   gets the textbox object (Line 76)
          // document.getElementById('department-filter').value   ==>   gets the value of the textbox
    // This if statement determines if the textbox is empty.
          // if the textbox is empty (''), then employees variable is set to ALL the employees (no filter)
          // if not, then it filters the whole data and returns employees under the specified dept only
          // REASON WHY I HAD TO USE THIS APPROACH: 
              // kapag kasi nagfilter ka na once, never mo na makikita yung full list ng employees
              // you could still see the other employees by changing the filter value to other depts but that's it
              // i panicked kasi last minute change na ito so baka di elegant yung solution ko dun sa problem sorry
    if (document.getElementById('department-filter').value){
      const employeeList = data.employeeList.filter(employee => employee.department === document.getElementById('department-filter').value)
      setEmployees(employeeList);
    } else {
      setEmployees(data.employeeList);
    }
  }

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error.message}</p>


  // NOTE: You can divide this into two components (Filter and Employee List) but I chose not to kasi at the 
  // time I was doing this, di ko naisip na pwede nga pala ipass na lang as props yung filter button handler
  // you can try that if u want :))))
  return ( 
    <>
      <Form>
          <Row>
              <Col>
                  {/* Textbox: necessary yung id assignment para makuha natin siya by code*/}
                  <Form.Control type="text" placeholder="Department" id="department-filter"/>
              </Col>
              <Col>
                  {/* FIlter Button: calls the handler above */}
                  <Button variant="primary" onClick={handleOnFilterButtonClick}>
                      Filter
                  </Button>
              </Col>
              
          </Row>
      </Form>

      {/* Employee Area 
            Generates one card per employee in employeeList variable
            Rendered horizontally with each column having one card.
            <Row xs={1} md={4} className="g-6">       => you can change md (kinda default in our case) and xs (small screens) value to modify the number of cards displayed per row
            EmployeeItem is a component for each employee card
      */}
      <Row xs={2} md={4} className="g-6">
        {employees.map(employee => 
          <Col key={employee.id}>     
            <EmployeeItem key={employee.id} id={employee.id} 
              name={employee.name} 
              title={employee.title} 
              dob={employee.dob} 
              department = {employee.department}
              avatarUrl={employee.avatarUrl}/>
          </Col>
        )}
      </Row>
    </>
  )
}

export default EmployeeList;