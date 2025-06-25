import React from 'react'
import Header from "../components/Header";
import { Container, Row, Col } from 'react-bootstrap';
import CoverPhoto from "../assets/cover-photo.jpg";

function AboutPage() {
  return (
    <div>
        <div className="cover-video-wrapper">
            <img src={CoverPhoto} alt="Cover" className="cover-video" />
        
            <div className="overlay" />
            <Header />
            <Container>
                <Row>
                    <Col>
                        <h1 className="mt-5" >Rediscover Africa, One Product at a Time</h1> 

                        <p className='mt-3'>
                            At Banwe, we bring the soul of Africa to your doorstep. <br />
                            Our mission is to connect you with authentic African products that celebrate the continent’s rich heritage. <br /> 
                            From the rich earth of the savannahs to the skilled hands of local artisans, <br />
                            every product we offer is a tribute to the continent’s vibrant culture, timeless traditions, and untamed beauty. <br />
                            Whether it's handcrafted decor, natural skincare, or heritage-rich delicacies, we don’t just deliver goods — we deliver stories. <br />
                            No matter where you are in the world, Banwe connects you to the essence of Africa, wrapped in authenticity and powered by purpose.
                        </p>

                        <div>
                            <h2 className='mt-5'>Follow our Story Social Media</h2>
                            
                        </div>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    </div>
  )
}

export default AboutPage