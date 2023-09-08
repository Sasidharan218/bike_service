import React, { useState } from "react";
import { Button, Card, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './component.css';
import axios from "axios";

function Login(){
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    //fetch login API. handleLogin function check role with email and password and navigate to user or admin page 
    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const loginresponse = await axios.post("http://localhost:8080/login",{email,password})
            window.sessionStorage.setItem("login_id",loginresponse.data[0].id);
            const role = loginresponse.data[0].role
            if(role === 'admin'){                   //(email:"admin@gmail.com"; password: "admin") for admin home page
                navigate('/adminhome')
                console.log(role)
            }else if (role === 'user'){             //user your registered email and password for user's home page
                navigate('/home')
                console.log(role)
            } else {
                alert('Incorrect Email or Password')
            }
        }catch(err){ 
            console.log(err)
        }
       
    }

    return(
       <div className="page-body">
            <div className="container">
            <Card className="login-page">
                <div className="heading">
                    <h3>Login</h3>
                </div>
            <Form onSubmit={handleLogin}>
                <FormGroup className="formgroup">
                    <FormLabel>Email</FormLabel>
                    <FormControl value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    size="sm" type="text"/>
                </FormGroup>
                <FormGroup className="formgroup">
                    <FormLabel>Password</FormLabel>
                    <FormControl value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     size="sm" type="password"/>
                </FormGroup>
                <div className="login-btn">
                <Button type="submit">Login</Button>
                </div>
                <p>Don't have an Account? <Link to={'/'} style={{textDecoration: "none"}}>Register</Link></p>
            </Form>
           
            
            </Card>
            </div>
            </div>
    )
}

export default Login;