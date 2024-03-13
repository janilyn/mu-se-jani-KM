import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap/dist/react-bootstrap.min.js'
import { useEffect } from 'react';
import HeaderComponent from './components/HeaderComponent';
import BodyComponent from './components/BodyComponent';

function App() {
  useEffect(() => {
    document.title = "Employees"
  }, []);

  return (
    <>
    {/* Navbar */}
    <HeaderComponent /> 

    {/* Filter form + Cards */}
    <BodyComponent />
    </>
  );
}

export default App;
