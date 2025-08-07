import React, { useState } from "react";
import { Form, Button, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";

export default function Step7({ onNext, onBack }) {
  const options = [
    "Buying from local African stores in your area",
    "Sourcing directly from your home country If the overall cost was way cheaper.",
    "Other",
  ];

  const [selected, setSelected] = useState("");
  const [otherText, setOtherText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      alert("Please select an option.");
      return;
    }
    if (selected === "Other" && otherText.trim() === "") {
      alert("Please specify your preference.");
      return;
    }
    // Pass data upward if needed:
    const preference = selected === "Other" ? otherText : selected;
    onNext({shoppingmethod:preference}); 
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

        <Col sm={12} className="mb-3">
          <h2 className="step-header">
            Would you prefer:
          </h2>

          <ButtonGroup vertical>
            {options.map((option, idx) => (
              <ToggleButton
                key={idx}
                id={`toggle-${idx}`}
                type="radio"
                name="preference"
                value={option}
                checked={selected === option}
                variant={selected === option ? "dark" : "outline-secondary"}
                onChange={(e) => setSelected(e.currentTarget.value)}
                className="mb-2"
              >
                {option}
              </ToggleButton>
            ))}
          </ButtonGroup>

          {selected === "Other" && (
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Please specify"
              
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              className="mt-3"
              required
            />
          )}
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
