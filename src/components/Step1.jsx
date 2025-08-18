import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";


export default function Step1({ onNext, onBack }) {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // You can send this email to your backend or waitlist service here
    console.log("User email submitted:", email);
    
    // onNext({email:email}); 
    onNext(email);
  };
  
  
  return (
    <Form
      onSubmit={handleSubmit}
      className="text-center"
    >
      <Row>
            <Col sm={12} md={12} lg={12} className="text-start">
                <Button type="button" onClick={onBack} className="rounded-5" variant="outline-light">
                    <i class="bi bi-arrow-90deg-left"></i>
                </Button>
            </Col>

            <Col sm={12} md={12} lg={12} className="mb-3">
                <h4 className="step-header">
                  What is your Email
                </h4>

                <Col sm={12} className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-3"
                  required
                />
              </Col>
                          
            </Col>

            <Col sm={12} md={12} lg={12}>
                  <Button as="input" type="submit" value="Continue" className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center" />
    
            </Col>
        </Row>
      
      
    </Form>
  );
}
