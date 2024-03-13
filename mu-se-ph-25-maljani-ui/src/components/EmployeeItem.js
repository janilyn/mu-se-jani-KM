import { useState } from "react";

import Card from 'react-bootstrap/Card';

const EmployeeItem = (props) => {
  // From the react labs.
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  }
  const { id, name, title, dob, department, avatarUrl} = props;

  return (
    // For this, instead of having a style attrib, you can assign a unique class for Card then edit the css for the styling
    <Card style={{ marginTop: 10, marginBottom: 10 }}>
      {/* Notice how I put a handler for both the image and employee name.
          I want kasi na if you click either the pic or the name, magsshow na yung employee details
       */}
      <Card.Img onClick={handleOnClick} variant="top" src={avatarUrl} />  {/* For the employee picture */}
      
      {/* For the employee details */}
      <Card.Body>
        <Card.Title onClick={handleOnClick}>{name}</Card.Title>           {/* For the employee name */}

        {/* NOTE: You can choose to put all the details below in one <Card.Text>
            I didn't do that bc nakulangan ako sa spacing between lines hehe
          */}
        { isOpen && <>
          <Card.Text>Business Title: {title}</Card.Text>
          <Card.Text>Date of Birth: {dob}</Card.Text>
          <Card.Text>Department: {department}</Card.Text>
        </>}
      </Card.Body>
    </Card>
  )
}

export default EmployeeItem;