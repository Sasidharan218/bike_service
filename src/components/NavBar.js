import React from "react";
import { Container,  Nav, NavLink, Navbar, NavbarBrand } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function NavBar(){
 
  const navigate = useNavigate()

  const handleStatusPage = () => {
    navigate('/viewstatus')
} 

    return(
        <div>
             <Navbar bg="transparent" className="shadow p-3 mb-3 bg-body"  data-bs-theme="dark">
        <Container>
          <NavbarBrand >Service center</NavbarBrand>
          <Nav style={{border:'solid 1px white',borderRadius:'60px'}}>
             <NavLink style={{padding:'10px'}} onClick={handleStatusPage}>View Booking Status</NavLink>
          </Nav>
        </Container>
      </Navbar>
        </div>
    )
}

export default NavBar;