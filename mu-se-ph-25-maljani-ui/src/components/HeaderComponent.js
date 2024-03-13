import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';

const HeaderComponent = () => {
  
  return (
    <div>
      <Navbar className='border-bottom border-body' data-bs-theme="dark" bg='navBar'>
        <Container>
          <Navbar.Brand href="#">Employee</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
    </div>
  );
}
export default HeaderComponent;