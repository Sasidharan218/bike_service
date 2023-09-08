import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, FormLabel, Navbar, NavbarBrand,  Table } from "react-bootstrap";
import { Link } from "react-router-dom";


function Services() {
    const [services, setServices] = useState([])
    const [service, setService] = useState('')

    useEffect(()=> {
        const fetchUser = async () => {
            
            try{
                let id = window.sessionStorage.getItem("login_id")
                const res = await axios.get("http://localhost:8080/get-service-list/"+id)
                setServices(res.data)
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchUser();
    },[])

    const handleAddService =async (e) => {
        e.preventDefault()
        try{
            let id = window.sessionStorage.getItem("login_id")
            const response = await axios.post('http://localhost:8080/add-service/'+id,{service})
         
            console.log(response.data)
        }catch(err) {
            console.log(err)
        }
    }

    const handleDeleteService =async (e) => {
        e.preventDefault()
        try{
            let id = window.sessionStorage.getItem("login_id")
            const response = await axios.delete('http://localhost:8080/delete-service/'+id)
            setServices(response.data)
            console.log(response.data)
        }catch(err) {
            console.log(err)
        }
    }

    return(
        <div>
            <Navbar className="shadow p-3 mb-3 bg-white">
        <Container>
          <NavbarBrand href="/">Service center</NavbarBrand>
        </Container>
      </Navbar>
        <div className="container"> 
        <div className="row">
            <div className="col-6">
            <Table>
            <thead>
                <tr>
                    <th>Available Services</th>
                </tr>
            </thead>
            <tbody>
                {services.map((service,id)=>(
                    <tr key={id}>
                        <td>{service.service}</td>
                        <td><Button variant="info"><Link to={`/edit/${service.id}`}>Edit</Link> </Button></td>
                        <td><Button variant="danger" onClick={handleDeleteService}>Delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
            </div>
        
        <div className="col-4 form">
            <h4>Add Service</h4>
        <Form>
            <FormLabel>New Service</FormLabel>
            <FormControl size="sm" type="text" name="service" value={service} onChange={(e)=>setService(e.target.value)} placeholder="Enter Service"/>
            <Button className="service-btn" onClick={handleAddService}>Add</Button>
        </Form>
        </div>
        
          </div>  
        </div>
        </div>
    )
}

export default Services;