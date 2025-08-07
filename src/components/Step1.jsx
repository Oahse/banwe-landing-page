import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { getNames } from "country-list";


export default function Step1({ onNext, onBack }) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const countries = getNames(); // Get all country names

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCountry) {
      onNext({residence_country:selectedCountry});
    } else {
      alert("Please select a country.");
    }
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
                  What is your Country of residence
                </h4>

                <Form.Select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  required
                >
                  <option value="">-- Select a country --</option>
                  {countries.map((country, i) => (
                    <option key={i} value={country}>
                      {country}
                    </option>
                  ))}
                </Form.Select>
                          
            </Col>

            <Col sm={12} md={12} lg={12}>
                  <Button as="input" type="submit" value="Continue" className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center" />
    
            </Col>
        </Row>
      
      
    </Form>
  );
}
