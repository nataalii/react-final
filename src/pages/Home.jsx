import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Badge,
} from "react-bootstrap";
import "../styles/Home.css";

const TMDB_API_KEY = "ba8d2b6b13422b52e5b0b21b9eded9a9";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (query = "avengers") => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${TMDB_BASE_URL}/search/movie`,
        {
          params: {
            api_key: TMDB_API_KEY,
            query,
          },
        }
      );

      if (response.data.results.length === 0) {
        setError("🎬 No movies found. Try something else!");
        setMovies([]);
      } else {
        setMovies(response.data.results);
      }
    } catch (err) {
      console.error(err);
      setError("🚨 Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies(searchQuery.trim() || "avengers");
  };

  return (
    <Container className="home-container">
      <h1 className="text-center mb-4">🎬 TMDB Movies</h1>

      <Form onSubmit={handleSearchSubmit} className="search-form mb-4">
        <Form.Control
          type="text"
          placeholder="🔍 Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button type="submit" variant="primary" className="search-button mt-2">
          Search
        </Button>
      </Form>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p className="text-center text-danger fs-5">{error}</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="movie-card h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={
                    movie.poster_path
                      ? `${TMDB_IMAGE_URL}${movie.poster_path}`
                      : "https://via.placeholder.com/300x445?text=No+Image"
                  }
                  alt={movie.title}
                  className="movie-poster"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">
                    {movie.title}
                  </Card.Title>
                  <Badge bg="secondary" className="mb-2 align-self-start">
                    {movie.release_date?.split("-")[0] || "N/A"}
                  </Badge>
                  <Button
                    as={Link}
                    to={`/movie/${movie.id}`}
                    variant="outline-primary"
                    className="mt-auto"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
