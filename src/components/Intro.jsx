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
          
          We're on a mission to connect the African diaspora with the vibrant culture and authentic products they love. Share your journey in our quick survey – tell us how you stay connected to your roots, from traditions and community to finding the music, food, fashion, and products that feel like home. Your insights will help us create a platform that truly celebrates your cultural identity and makes it easier to access the treasures that keep you connected.
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
