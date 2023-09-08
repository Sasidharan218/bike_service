import React, { useState } from "react";
import './component.css'
import { Button, Card,  Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState(null)
    const [password, setPassword] = useState('')

    //navigation 

    const navigate = useNavigate()

    //fetch register API for user regitration

    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:8080/register",{email, mobile, password})
            navigate('/home')
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="body">
        <div className="container">
        <div className="cards">
            <Card style={{width:'65rem',border: 'none'}}>
                
            
            
            {/* creating from for regitration page */}
            <Form className="register-content">
            <h3 className="heading">Register</h3>
                <FormGroup className="form-group">
                <FormLabel>
                    Email
                </FormLabel>
                <FormControl size="sm" value={email} type="email" placeholder="Enter Email" name="Email" onChange={(e) => setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup className="form-group">
                <FormLabel>
                    Mobile
                </FormLabel>
                <FormControl size="sm" value={mobile} type="number" placeholder="Enter Mobile Number"  name="Mobile" onChange={(e) => setMobile(e.target.value)}/>
                </FormGroup>
                <FormGroup className="form-group">
                <FormLabel>
                    Password
                </FormLabel>
                <FormControl size="sm" value={password} type="password"  placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </FormGroup>
                <Button className="button" type="submit" onClick={handleClick}>Register</Button>
                <p>Already have an Account?<Link to={'/login'} style={{textDecoration: "none"}}>Login</Link></p>
            </Form>
            
            
            
            </Card>
        </div>
        </div>
        </div>
    )
}

export default Register;