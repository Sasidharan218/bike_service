import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Navbar, NavbarBrand } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ServiceBooking () {
    const [servicetype, setServicetype] = useState('')
    const [bike, setBike] = useState('')
    const [date, setDate] = useState('')
   const navigate = useNavigate()


   // user can be able book service with their id. id will be getting from session storge
    const handleBooking = async (e) => {
        e.preventDefault();
        try{
            let id = window.sessionStorage.getItem("login_id")
            const response = await axios.post('http://localhost:8080/service-booking/'+id,{servicetype,bike,date})
            console.log(response)
            navigate('/viewstatus')
        }catch (err){
            console.log(err)
        }
    }

    return(
        <div className="page-body">
            
            <div className="container">
            <div className="login-page">
                
            <Form data-aos="fade-left" data-aos-duration="1500" onSubmit={handleBooking}>
                <FormGroup className="formgroup">
                    <FormLabel>Service Type</FormLabel>
                    <FormControl value={servicetype} 
                    onChange={(e)=>setServicetype(e.target.value)}
                    size="sm" type="text"/>
                </FormGroup>
                <FormGroup className="formgroup">
                    <FormLabel>Bike Model</FormLabel>
                    <FormControl value={bike}
                     onChange={(e)=>setBike(e.target.value)}
                     size="sm" type="text"/>
                </FormGroup>
                <FormGroup className="formgroup">
                    <FormLabel>Date</FormLabel>
                    <FormControl value={date}
                     onChange={(e)=>setDate(e.target.value)}
                     size="sm" type="date"/>
                </FormGroup>
                <div className="login-btn">
                <Button type="submit">Book Service</Button>
                </div>
                
            </Form>
        
            
            </div>
            </div>
        </div>
    )
}

export default ServiceBooking;