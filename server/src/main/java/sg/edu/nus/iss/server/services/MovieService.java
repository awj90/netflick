package sg.edu.nus.iss.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.server.models.Genre;
import sg.edu.nus.iss.server.models.Movie;
import sg.edu.nus.iss.server.repositories.MovieRepository;

@Service
public class MovieService {
    
    @Autowired
    private MovieRepository movieRepository;

    public List<Genre> getAllGenres() throws DataAccessException {
        return movieRepository.getAllGenres();
    }

    public List<Movie> getMoviesByGenre(String genre) throws DataAccessException {
        return this.movieRepository.getMoviesByGenre(genre);
    }

    public Optional<Movie> getMovieById(Integer id) throws DataAccessException {
        return this.movieRepository.getMovieById(id);
    }
}
