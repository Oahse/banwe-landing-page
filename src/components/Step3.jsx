import React, { useState } from "react";
import { Form, Button, Row, Col, ToggleButton, ButtonGroup } from "react-bootstrap";

export default function Step2({ onBack, onSubmit }) {
  // Change to array for multiple selections
  const [selected, setSelected] = useState([]);

  // Helper to toggle selection
  const handleToggle = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(selected); // Pass selected items
      }}
    >
      <Row>
        <Col sm={12} md={12} lg={12} className="text-start">
          <Button type="button" onClick={onBack} className="rounded-5" variant="outline-light">
             <i className="bi bi-arrow-90deg-left"></i>
          </Button>
        </Col>

        <Col sm={12} md={12} lg={12} className="mb-3">
          <h1 className="">What are you more interested in</h1>
          <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-emeka-ai"
              type="checkbox" // Change to checkbox
              variant="outline-secondary"
              checked={selected.includes("Emeka AI")}
              value="Emeka AI"
              onChange={() => handleToggle("Emeka AI")}
            >
              Emeka AI
            </ToggleButton>
          </ButtonGroup>
          <br />
          <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-organic-foodstuff"
              type="checkbox" // Change to checkbox
              variant="outline-secondary"
              checked={selected.includes("Organic Foodstuff")}
              value="Organic Foodstuff"
              onChange={() => handleToggle("Organic Foodstuff")}
            >
              Organic Foodstuff
            </ToggleButton>
          </ButtonGroup>
          <br />
          <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-supply-store"
              type="checkbox" // Change to checkbox
              variant="outline-secondary"
              checked={selected.includes("Supply Store")}
              value="Supply Store"
              onChange={() => handleToggle("Supply Store")}
            >
              Supply Store
            </ToggleButton>
          </ButtonGroup>
          <br />
          <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-african-products"
              type="checkbox" // Change to checkbox
              variant="outline-secondary"
              checked={selected.includes("African Products")}
              value="African Products"
              onChange={() => handleToggle("African Products")}
            >
              African Products
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
