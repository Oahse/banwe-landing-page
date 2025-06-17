import React, { useState } from "react";
import { Form, Button, Row, Col, ToggleButton, ButtonGroup } from "react-bootstrap";

export default function Step2({ onBack, onSubmit }) {
  const [selected, setSelected] = useState(null); // Track the selected button

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Row>
        <Col sm={12} md={12} lg={12} className="text-start">
          <Button type="button" onClick={onBack} className="rounded-5" variant="outline-light">
             <i class="bi bi-arrow-90deg-left"></i>
          </Button>
        </Col>

        <Col sm={12} md={12} lg={12} className="mb-3">
          <h1 className="">What are you more interested in</h1>
          <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-estimator"
              type="radio" // Use "radio" for single selection
              variant="outline-secondary"
              checked={selected === "Estimator"} // Check if this button is selected
              value="Estimator"
              onChange={(e) => setSelected(e.currentTarget.value)} // Update selected value
            >
              Estimator
            </ToggleButton>
          </ButtonGroup>
          <br />
          <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-generator"
              type="radio" // Use "radio" for single selection
              variant="outline-secondary"
              checked={selected === "Generator"} // Check if this button is selected
              value="Generator"
              onChange={(e) => setSelected(e.currentTarget.value)} // Update selected value
            >
              Generator
            </ToggleButton>
          </ButtonGroup>
          <br />
          <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-supply-store"
              type="radio" // Use "radio" for single selection
              variant="outline-secondary"
              checked={selected === "Supply Store"} // Check if this button is selected
              value="Supply Store"
              onChange={(e) => setSelected(e.currentTarget.value)} // Update selected value
            >
              Supply Store
            </ToggleButton>
          </ButtonGroup>
        </Col>

        <Col sm={12} md={12} lg={12}>
          <Button as="input" type="submit" value="Submit" />
        </Col>
      </Row>
    </Form>
  );
}
