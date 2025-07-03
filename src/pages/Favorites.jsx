import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFavorite = (id) => {
    const updated = favorites.filter((movie) => movie.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <Container className="mt-4">
        <h1>Favorites</h1>
        <p>Nothing here yet!</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Favorites</h1>
      <Row>
        {favorites.map((movie) => (
          <Col key={movie.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/300x445?text=No+Image"
                }
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button
                  as={Link}
                  to={`/movie/${movie.id}`}
                  variant="info"
                  className="me-2"
                >
                  Details
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFavorite(movie.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favorites;
