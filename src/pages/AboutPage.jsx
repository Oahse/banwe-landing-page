import React from 'react'
import Header from "../components/Header";
import { Container, Row, Col, Button } from 'react-bootstrap';
import CoverPhoto from "../assets/cover-photo.jpg";
import { Link } from 'react-router';

function AboutPage() {
  return (
    <div>
        <div className="cover-video-wrapper">
            <img src={CoverPhoto} alt="Cover" className="cover-video" />
        
            <div className="overlay" />
            <Header />
            <Container>
                <Row>
                    <Col className='pt-3' lg={12} md={12} sm={12} xs={12}>
                        <h1 className="mt-5" >Rediscover Africa, One Product at a Time</h1> 

                        <p className='mt-3'>
                            At Banwe, we bring the soul of Africa to your doorstep.
                            Our mission is to connect you with authentic African products that celebrate the continent’s rich heritage. 
                            From the rich earth of the savannahs to the skilled hands of local artisans,
                            every product we offer is a tribute to the continent’s vibrant culture, timeless traditions, and untamed beauty.
                            Whether it's handcrafted decor, natural skincare, or heritage-rich delicacies, we don’t just deliver goods — we deliver stories.
                            No matter where you are in the world, Banwe connects you to the essence of Africa, wrapped in authenticity and powered by purpose.
                        </p>
                    </Col>

                    <Col className='mt-3' lg={12} md={12} sm={12} xs={12}>
                        
                        <Button as={Link} to='/'  variant='success' className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center"> Let's get you started</Button>
                    </Col>
                    
                </Row>
            </Container>
        </div>
        <div className='about-body my-5 '>
            <Container>
                <Row>
                    <Col sm={12} md={6} lg={6} className=''>
                        <h2 className='mt-5'>Our Story</h2>
                        <p className='mt-3'>
                            Banwe was born out of a passion for Africa’s diverse cultures and the desire to share its treasures with the world. 
                            Our founder, inspired by the vibrant markets and the warmth of African communities, envisioned a platform that would not only showcase authentic products but also empower local artisans and businesses.
                            Today, Banwe stands as a bridge between Africa’s rich heritage and global consumers, ensuring that every purchase supports sustainable practices and uplifts communities.
                        </p>
                    </Col>
                    <Col sm={12} md={6} lg={6} className='text-center mt-5 d-none d-md-block'>
                        <div> <img src={CoverPhoto} alt="Cover" width='100%'/></div>  
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col sm={12} md={6} lg={6} className='text-center'>
                        <div> <img src={CoverPhoto} alt="Cover" width='100%'/></div>  
                    </Col>

                    <Col sm={12} md={6} lg={6}>
                        <h2 className='mt-5'>Our Mission</h2>
                        <p className='mt-3'>
                            At Banwe, our mission is to create a global marketplace that celebrates Africa’s rich cultural heritage while empowering local artisans and communities. 
                            We strive to provide a platform where authenticity meets quality, ensuring that every product tells a story and contributes to the sustainable development of the continent.
                            By choosing Banwe, you’re not just buying a product; you’re supporting a movement that values heritage, craftsmanship, and community empowerment.
                        </p>
                    </Col> 
                </Row>

                <Row className='my-5 text-center'>
                    <Col sm={12} md={12} lg={12}>
                        <h2 className='mt-5 text-center'>Follow us on our Journey</h2>
                        <p className='mt-3 text-center'>Connect with us on social media  </p>
                    </Col>

                    <Col sm={12} md={12} lg={12} className='mt-3 '>
                        <Button href='https://www.facebook.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'><i class="bi bi-facebook"></i></Button>
                        <Button as={Link} to='https://www.instagram.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'><i class="bi bi-instagram"></i></Button>
                        <Button as={Link} to='https://www.linkedin.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'><i class="bi bi-linkedin"></i></Button>
                        <Button as={Link} to='https://www.x.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'><i class="bi bi-twitter-x"></i></Button>
                        <Button href='https://www.tiktok.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'>
                            <i className="bi bi-tiktok"></i>
                        </Button>
                        {/* <Button href='https://www.youtube.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'>
                            <i className="bi bi-youtube"></i>
                        </Button>
                        <Button href='https://wa.me/1234567890' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'>
                            <i className="bi bi-whatsapp"></i>
                        </Button>
                        <Button href='https://t.me/yourchannel' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'>
                            <i className="bi bi-telegram"></i>
                        </Button> */}


                    </Col>
                </Row>
            </Container>
        </div>
        <div className="footer">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p className="mt-3">© 2025 Banwee. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
  )
}

export default AboutPage