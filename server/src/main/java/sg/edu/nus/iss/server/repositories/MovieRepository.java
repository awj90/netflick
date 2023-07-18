package sg.edu.nus.iss.server.repositories;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.models.Genre;
import sg.edu.nus.iss.server.models.Movie;
import static sg.edu.nus.iss.server.repositories.DBQueries.*;

@Repository
public class MovieRepository {
    
    @Autowired 
    private JdbcTemplate jdbcTemplate;

    public List<Genre> getAllGenres() throws DataAccessException {
        List<Genre> genres = new LinkedList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_ALL_GENRES);

        while (rs.next()) {
            genres.add(Genre.create(rs));
        }
        return genres;
    }
    
    public List<Movie> getMoviesByGenre(String genre) throws DataAccessException {
        List<Movie> movies = new LinkedList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_MOVIES_BY_GENRE, new Object[] {"%" + genre + "%"});

        while (rs.next()) {
            movies.add(Movie.create(rs));
        }
        return movies;
    }

    public Optional<Movie> getMovieById(Integer id) throws DataAccessException {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_MOVIE_BY_ID, id);
        if (!rs.next()) {
            return Optional.empty();
        }
        return Optional.of(Movie.create(rs));
    }

    public List<Movie> searchMoviesByKeyword(String keyword) throws DataAccessException {
        List<Movie> movies = new LinkedList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_MOVIES_BY_SEARCH_KEY, new Object[] {"%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%"});

        while (rs.next()) {
            movies.add(Movie.create(rs));
        }
        return movies;
    }
}
