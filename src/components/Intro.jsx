import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Intro({ onNext }) {
    const [index, setIndex] = useState(0);
    const words = ["Organic", "Cultural", "Authentic"];
    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000); // Change every 2 seconds
        return () => clearInterval(interval);
    }, []);

    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="text-center"
      >
          
        <h3 className="step-header mb-4">
          Home to
          <span className="vertical-text-wrapper mx-2 d-inline-block" style={{ height: "1.2em", overflow: "hidden" }}>
            <span
              className="vertical-text d-block"
              style={{
                transform: `translateY(-${index * 1.2}em)`,
                transition: "transform 0.8s ease-in-out",
              }}
            >
              {words.map((word, i) => (
                <div key={i} className="word">{word}</div>
              ))}
            </span>
          </span>
          African Products
        </h3>

        <p className="lead mb-4">
          
          We’re doing a short survey to learn how people in the African diaspora
          stay connected to their roots and find cultural products they love.
          <br />
          Your responses will help shape a platform that better serves your cultural and logistical needs.
        </p>

        
        <Button
          type="submit"
          className="tf-btn radius-3 btn-fill animate-hover-btn"
        >
          Continue
        </Button>
      </Form>
    );
}
