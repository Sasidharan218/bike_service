import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, FormControl, FormLabel, Navbar, NavbarBrand } from "react-bootstrap";

function Edit(){
    const [newservice, setNewservice] = useState('')

    const handleEditService =async (e) => {
        e.preventDefault()
        try{
            let id = window.sessionStorage.getItem("login_id")
            const response = await axios.put('http://localhost:8080/edit-service/'+id,{newservice})
            setNewservice(response.data)
            console.log(id)
        }catch(err) {
            console.log(err)
        }
    }

    return(
        <div>
             <Navbar className="shadow p-3 mb-3 bg-white">
        <Container>
          <NavbarBrand>Service center</NavbarBrand>
        </Container>
      </Navbar>
        <div className="col-4 form">
        <h4>Edit Service</h4>
    <Form>
        <FormLabel>New Service</FormLabel>
        <FormControl size="sm" type="text" name="service" value={newservice} onChange={(e)=>setNewservice(e.target.value)} placeholder="Enter Service"/>
        <Button className="service-btn" onClick={handleEditService}>Update</Button>
    </Form>
    </div>
    </div>
    )
}  


export default Edit;