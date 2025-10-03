import React from 'react'
import Header from "../components/Header";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import heroimage from '../assets/background.png';
import story from '../assets/story.png';
import mission from '../assets/mission.png';
const HeroImage = heroimage;
const StoryImage = story;
const MissionImage = mission;

function AboutPage() {
  return (
    <div>
        <div className="cover-video-wrapper">
            <img src={HeroImage} alt="Cover" className="cover-video" />
        
            <div className="overlay" />
            <Header />
            <Container>
                <Row>
                    <Col className='pt-3' lg={12} md={12} sm={12} xs={12}>
                        <h1 className="mt-5" >Rediscover Africa, One Product at a Time</h1> 

                        <p className='mt-3'>
                            At Banwee, we're passionate about bringing the heart of Africa directly to you. We handpick authentic products that tell a story, celebrating the continent's incredible heritage. Imagine: from the sun-kissed savannahs to the masterful hands of local artisans, each item is a vibrant piece of culture, tradition, and untamed beauty. Whether you're looking for unique handcrafted decor, nourishing natural skincare, or delicious heritage-rich delicacies, we offer more than just goods – we deliver experiences. Wherever you are, Banwee is your personal connection to Africa's soul, brimming with authenticity and driven by purpose.
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
                            Our journey began with a deep love for Africa's incredible diversity and a burning desire to share its hidden gems with everyone. Our founder, captivated by the bustling markets and the heartwarming spirit of African communities, dreamed of a place where authentic products could shine, and local artisans and businesses could thrive. Today, Banwee proudly bridges Africa's rich heritage with global consumers, making sure every single purchase champions sustainable practices and uplifts the very communities that create these beautiful treasures.
                        </p>
                    </Col>
                    <Col sm={12} md={6} lg={6} className='text-center mt-5 d-none d-md-block'>
                        <div> <img src={StoryImage} alt="Cover" width='100%'/></div>  
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col sm={12} md={6} lg={6} className='text-center'>
                        <div> <img src={MissionImage} alt="Cover" width='100%'/></div>  
                    </Col>

                    <Col sm={12} md={6} lg={6}>
                        <h2 className='mt-5'>Our Mission</h2>
                        <p className='mt-3'>
                            At Banwee, our heart beats for a global marketplace that truly celebrates Africa's vibrant cultural tapestry, all while lifting up local artisans and communities. We're dedicated to building a platform where genuine authenticity meets exceptional quality, ensuring that every single product you discover carries a unique story and actively contributes to the sustainable growth of the continent. When you choose Banwee, you're doing more than just making a purchase; you're joining a powerful movement that cherishes heritage, honors craftsmanship, and empowers communities to thrive.
                        </p>
                    </Col> 
                </Row>

                <Row className='my-5 text-center'>
                    <Col sm={12} md={12} lg={12}>
                        <h2 className='mt-5 text-center'>Follow us on our Journey</h2>
                        <p className='mt-3 text-center'>Connect with us on social media  </p>
                    </Col>

                    <Col sm={12} md={12} lg={12} className='mt-3 '>
                        <Button href='https://www.facebook.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'><i class="bi bi-facebook text-white"></i></Button>
                        <Button as={Link} to='https://www.instagram.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'><i class="bi bi-instagram text-white"></i></Button>
                        <Button as={Link} to='https://www.linkedin.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'><i class="bi bi-linkedin text-white"></i></Button>
                        <Button as={Link} to='https://www.x.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'><i class="bi bi-twitter-x text-white"></i></Button>
                        <Button href='https://www.tiktok.com' variant='outline-dark' className='tf-btn radius-3 btn-fill animate-hover-btn justify-content-center me-2' size='lg'>
                            <i className="bi bi-tiktok text-white"></i>
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