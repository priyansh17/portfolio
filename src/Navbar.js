import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function CollapsibleNavBar() {
  return (
    <Navbar style={{ zIndex: '1' }} collapseOnSelect expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to="/mainPage">
            <FontAwesomeIcon style={{ width: 'auto', cursor: 'pointer', color: 'whitesmoke' }} icon={faHome} size={'1x'} />
            &nbsp;HomePage
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{color: '#ffffff'}}>
            <NavDropdown className="dorpdown" title="Pages" style={{ color: '#000000' }} id="collasible-nav-dropdown">
              <Link to="/projects"><NavDropdown.Item href="/projects">Projects</NavDropdown.Item></Link>
              <Link to="/education"><NavDropdown.Item href="/education">Education</NavDropdown.Item></Link>
              <Link to="/career"><NavDropdown.Item href="/career">Experience</NavDropdown.Item></Link>

              <NavDropdown.Divider />

              <Link to="/certifications"><NavDropdown.Item href="/certifications">Certificates</NavDropdown.Item></Link>
              <Link to="/skills"><NavDropdown.Item href="/skills">Skills</NavDropdown.Item></Link>
              <Link to="/awards"><NavDropdown.Item href="/awards">Awards</NavDropdown.Item></Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleNavBar;