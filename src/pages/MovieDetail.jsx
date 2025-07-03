import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Badge,
  Button,
} from "react-bootstrap";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import "../styles/MovieDetails.css";

const API_KEY = "ba8d2b6b13422b52e5b0b21b9eded9a9"; 
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Failed to load movie details.");
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    fetchMovieDetails();
  }, [id]);

  const isFavorite = favorites.some((fav) => fav.id === movie?.id);

  const handleAddFavorite = () => {
    const updated = [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">🚫 {error || "Failed to load movie details."}</Alert>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="movie-details mt-5 pt-4">
      <Row>
        <Col md={4}>
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={8}>
          <h2 className="mb-1">{movie.title}</h2>
          <p className="text-muted fst-italic">{movie.tagline}</p>
          <div className="mb-3 d-flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <Badge key={genre.id} bg="secondary">
                {genre.name}
              </Badge>
            ))}
            <Badge bg="dark">{movie.release_date}</Badge>
            <Badge bg="info">{movie.runtime} min</Badge>
          </div>
          <p>{movie.overview}</p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} / 10 (
            {movie.vote_count} votes)
          </p>
          <p>
            <strong>Status:</strong> {movie.status}
          </p>
          <div className="d-flex gap-3 mt-4">
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>
              <FaArrowLeft className="me-2" />
              Back
            </Button>
            <Button
              variant={isFavorite ? "success" : "warning"}
              disabled={isFavorite}
              onClick={handleAddFavorite}
            >
              <FaHeart className="me-2" />
              {isFavorite ? "Added to Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetails;
