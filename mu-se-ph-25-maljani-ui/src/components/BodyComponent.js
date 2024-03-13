import Container from 'react-bootstrap/Container';
import EmployeeList from './EmployeeList';

const BodyComponent = () => {
  
  return (
    <div>
      <Container>
            <EmployeeList />
      </Container>
      <br />
    </div>
  );
}
export default BodyComponent;