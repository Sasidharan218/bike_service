import React, { useEffect, useState } from "react";
import { Button, Container, Navbar, NavbarBrand, Table } from "react-bootstrap";
import axios from "axios";

function ViewStatus() {
    const [user,setUser] = useState([])
   
    //getting id's booking details for user
    useEffect(()=> {
        
        const fetchUser = async () => {
           
            try{
                let id = window.sessionStorage.getItem("login_id")
                const res = await axios.get('http://localhost:8080/booking-details-pending/'+id)
                console.log(res)
                setUser(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchUser();
    },[])

    const handleCompleted =async (e) => {
        e.preventDefault()
        try{
            let id = window.sessionStorage.getItem("login_id")
            const response = await axios.get('http://localhost:8080/booking-details-complete/'+id)
            setUser(response.data)
        }catch(err){
            console.log(err)
        }
    }

    const handleHistory =async (e) => {
        e.preventDefault()
        try{
            let id = window.sessionStorage.getItem("login_id")
            const response = await axios.get('http://localhost:8080/booking-details-history/'+id)
            setUser(response.data)
        }catch(err){
            console.log(err)
        }
    }


    return(
        <div>
            <div>
            <Navbar className="shadow p-3 mb-3 bg-white">
        <Container>
          <NavbarBrand href="/">Service center</NavbarBrand>
        </Container>
      </Navbar>
            </div>
            
            <div className="container mt-5">
                <h4>Booking Status</h4>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Service Type</th>
                            <th>Bike Details</th>
                            <th>Service Date</th>
                            <th>Service Status</th>
                            <th><Button onClick={handleCompleted}>Completed</Button></th>
                            <th><Button onClick={handleHistory}>History</Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((user, i) => (
                                <tr key={i}>
                                    <td>{user.service_type}</td>
                                    <td>{user.bike}</td>
                                    <td>{user.date}</td>
                                    <td>{user.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ViewStatus;