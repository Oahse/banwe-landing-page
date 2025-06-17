import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function Step2({onBack, setCurrentComponent }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentComponent("FinalStep"); // Switch to FinalStep component
      };
  return (
    <Form
    onSubmit={handleSubmit}
    >
          <Row>
            <Col sm={12} md={12} lg={12} className="text-start">
                <Button type="button" onClick={onBack} className="rounded-5" variant="outline-light">
                     <i class="bi bi-arrow-90deg-left"></i>
                </Button>
            </Col>

            <Col sm={12} md={12} lg={12} className="mb-3">
                <h1 className="">Let's get you started</h1>
                <Form.Select aria-label="" className="mb-3">
                    <option>Select Region</option>
                    <option value="1">Canada</option>
                    <option value="2">Nigeria</option>
                    <option value="3">Ireland</option>
                    <option value="4">UK</option>
                    <option value="4">USA</option>
                </Form.Select>
                <Form.Control type="text" size="md" placeholder="Enter Access Code"  required className="mb-3"/>
                
            </Col>

            <Col sm={12} md={12} lg={12}>
                <Button as="input" type="submit" value="Continue" />
            </Col>
        </Row>
    </Form>
  );
}
