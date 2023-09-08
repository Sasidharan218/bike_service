import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, NavLink, Navbar, NavbarBrand, Table } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";

function OwnerTable() {
    const [customers,setCustomers] = useState([])
    const navigate = useNavigate()


    //fetch all booking details from database
    useEffect(()=> {
        const fetchUser = async () => {
            try{
                const res = await axios.get("http://localhost:8080/admin-booking-details")
                setCustomers(res.data)
            }catch(err){
                console.log(err)    
            }
        }
        fetchUser();
    },[])

    //set booking status to "ready to take" and user will get mail from admin

    const handleReadyToTake = async (e) => {
        e.preventDefault()
        try{
            let id = window.sessionStorage.getItem("login_id")
            const response = await axios.put('http://localhost:8080/status-ready/'+id)
            setCustomers(response.data)
            console.log(id)
        }catch (err) {
            console.log(err)
        }
    }

        //set booking status to "completed" and user will get mail from admin


    const handleSetCompleted = async () => {
        try{
            let id = window.sessionStorage.getItem("login_id")
            const response = await axios.put('http://localhost:8080/status-complete/'+id)
            
            console.log(response.data)
        }catch (err){
            console.log(err)
        }
    }

    //it will fillter only pending services and show them

    const handlePendings = async () => {
        try{
            const response = await axios.get('http://localhost:8080/admin-booking-details-pending')
            setCustomers(response.data)
        } catch(err){
            console.log(err)
        }
    }

    const handleService = () =>{
        navigate('/services')
    }

    return(
        <div>
            <Navbar className="shadow p-3 mb-3 bg-white">
            <Container>
          <NavbarBrand>Service center</NavbarBrand>
          <Nav>
             <NavLink onClick={handleService}>Edit Available Services</NavLink>
          </Nav>
        </Container>
      </Navbar>
            
            <div className="container">
                <h4>Booking Status</h4>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Service Type</th>
                            <th>Bike Details</th>
                            <th>Service Date</th>
                            <th>Service Status</th>
                            <th><Button onClick={handlePendings}>Pendings</Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.service_type}</td>
                                    <td>{data.bike}</td>
                                    <td>{data.date}</td>
                                    <td>{data.status}</td>
                                    <td><Button onClick={handleReadyToTake}>ReadyToTake</Button></td>
                                    <td><Button onClick={handleSetCompleted}>Completed</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default OwnerTable;