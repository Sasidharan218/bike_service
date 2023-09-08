import React from "react";
import {CardImg, Col , Row, Card} from "react-bootstrap";
import NavBar from "./NavBar";
import './component.css'
import ServiceBooking from "./ServiceBooking";

function Home(){

    return(
        <div>
            <div className="main">
            <NavBar/>
            <br/>
            
             <div className="home-content">
                <h5 data-aos="fade-up" data-aos-duration="1000">Welcome!</h5>
                <h1 data-aos="fade-up" data-aos-duration="1500">
                    Best Bike Service Center 
                </h1>
                <h6 data-aos="fade-up" data-aos-duration="2000" style={{paddingTop:'5px'}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</h6>
             </div>
            </div>
           
            <div className="container service">
           <h3 data-aos="fade-up" data-aos-duration="1000">Services</h3>
            <Row>
            <Col>
            <Card style={{border: 'none'}} data-aos="fade-up" data-aos-duration="2000" className="card-content">
                <h4 data-aos="fade-up" data-aos-duration="1500">General Check-up</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
               
            </Card>
            </Col>
                <Col>
            <Card style={{width: '20rem', border: 'none',paddingLeft:'100px'}} data-aos="fade-up" data-aos-duration="1500">
                <CardImg variant="top"  src="https://static.gobumpr.com/web-app/features/trusted-mechanics.svg" />
                
            </Card>
            </Col>
                </Row>
                <br/><br/><br/>
                <Row className="container rows"> 
                
            <Col>
            <Card style={{width: '25rem', border: 'none'}} data-aos="fade-up" data-aos-duration="1500">
                <CardImg src="https://img.freepik.com/premium-vector/bearded-hipster-guy-motorcycle-customization-service-vector-flat-illustration-mechanic-man-assemble-parts-motorbike-garage-isolated-white-male-biker-enjoying-hobby-work-with-transport_198278-8929.jpg?size=626&ext=jpg&ga=GA1.2.1101872506.1692367417&semt=ais" />
                
            </Card>
            </Col>
            <Col>
            <Card style={{border: 'none'}} data-aos="fade-up" data-aos-duration="2000" className="card-content">
                <h4 data-aos="fade-up" data-aos-duration="1500">Oil Change</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
               
            </Card>
            </Col>
            </Row>
            <br/><br/><br/>
            <Row>
            <Col>
            <Card style={{border: 'none'}} data-aos="fade-up" data-aos-duration="2000" className="card-content">
                <h4 data-aos="fade-up" data-aos-duration="1500">Water Wash</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
               
            </Card>
            </Col>
            <Col>
            <Card style={{width: '25rem', border: 'none'}} data-aos="fade-up" data-aos-duration="1500">
                <CardImg src="https://img.freepik.com/free-vector/man-woman-riding-moped-mountains_74855-10868.jpg?size=626&ext=jpg&ga=GA1.2.1101872506.1692367417&semt=ais" />
                
            </Card>
            </Col>
            
                </Row>
            <br/>
            <br/>

           
            </div>
            <div className="banner">
                <div className="banner-content">
                    <h2>Book Service Soon!</h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
                </div>
            </div>
            <div className="container service">
                <div className="benefits">
                    <Row>
                        <Col className="benefits-column" data-aos="fade-up" data-aos-duration="2000">
                        <CardImg style={{height:'13rem', width:'13rem',}} src="https://www.apnamechanic.com/wp-content/uploads/2022/09/mechanic.png.webp"/>
                        </Col>
                        <Col className="benefits-column" data-aos="fade-up" data-aos-duration="2000">
                        <CardImg style={{height:'13rem', width:'13rem',}}  src="https://www.apnamechanic.com/wp-content/uploads/2022/09/road-side-assistance.png.webp"/>
                        </Col>
                        <Col className="benefits-column" data-aos="fade-up" data-aos-duration="2000">
                        <CardImg style={{height:'13rem', width:'13rem',}} src="https://www.apnamechanic.com/wp-content/uploads/2022/09/warranty.png.webp"/>
                        </Col>
                    </Row>
                    
                </div>
                    <div style={{marginBottom:'60px'}}>
                    <p data-aos="fade-up" data-aos-duration="2500">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                    </p>
                    </div>
            <h3 data-aos="fade-up" data-aos-duration="1000">Book Services</h3>
            <Row>
                <Col className="booking-content">
            <CardImg variant="top" style={{height:'20rem', width:'20rem',}} data-aos="fade-right" data-aos-duration="1500" src="https://img.freepik.com/free-vector/illustration-characters-fixing-cogwheel_53876-40796.jpg?size=626&ext=jpg&ga=GA1.2.1101872506.1692367417&semt=ais" />
            </Col>
        
            <Col>
            <ServiceBooking/>
            </Col>
                </Row>
            <br/>
            <br/>
            
            </div>
            
            
            
        </div>
    )
}

export default Home;