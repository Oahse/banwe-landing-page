import { useState } from "react";
import { Row, Col, Button, Form } from 'react-bootstrap';

export default function FinalStep({onNext}) {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // You can send this email to your backend or waitlist service here
    console.log("User email submitted:", email);
    
    alert("Thank you! We'll keep you updated.");
    onNext(); 
  };

  return (
    <Form onSubmit={handleSubmit} className="text-center">
      <Row>
        
        <Col sm={12} className="mb-3">
          <h2>Welcome to Banwe</h2>
          <p>
            Thank you for joining our wait list! <br />
            You will be notified with all updates as we get ready to launch a revolutionary platform for fresh food products.
          </p>
        </Col>

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

        <Col className="mb-3">
          <Button
            type="submit"
            className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center"
          >
            Stay Tuned
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
