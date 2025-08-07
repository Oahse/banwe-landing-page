import { useState } from "react";
import { Form, Button, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";

export default function Step8({ onNext, onBack }) {
  const options = ["Yes", "No", "Maybe"];
  const [selected, setSelected] = useState("");

  const handleToggle = (value) => {
    setSelected(value);
  };

  
  const handleSubmit = (e) => {
      e.preventDefault();
      if (!selected) {
        alert("Please select an option.");
        return;
      }
      onNext({shoppinplatform_preference:selected}); // or pass selected via onSubmit(selected)
    };

  return (
    <Form onSubmit={handleSubmit} className="text-center">
      <Row>
        <Col sm={12} className="text-start mb-3">
          <Button
            type="button"
            onClick={onBack}
            className="rounded-5"
            variant="outline-light"
          >
            <i className="bi bi-arrow-90deg-left"></i>
          </Button>
        </Col>

        <Col sm={12} className="mb-4">
          <p className="step-header">
            If there was a platform that gives you the opportunity to get culturally specific products from Africa, <br/> 
            maintaining their authenticity and delivered with cheaper logistics, would you be interested in using it?
          </p>

          {options.map((option, idx) => (
            <ButtonGroup key={idx} className="mb-2 me-2">
              <ToggleButton
                id={`toggle-${idx}`}
                type="radio"
                variant={selected === option ? "dark" : "outline-secondary"}
                name="interest"
                value={option}
                checked={selected === option}
                onChange={() => handleToggle(option)}
              >
                {option}
              </ToggleButton>
            </ButtonGroup>
          ))}
        </Col>

        <Col sm={12}>
          <Button
            as="input"
            type="submit"
            value="Continue"
            className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center"
          />
        </Col>
      </Row>
    </Form>
  );
}