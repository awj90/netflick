package sg.edu.nus.iss.server.repositories;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.models.Movie;
import static sg.edu.nus.iss.server.repositories.DBQueries.*;

@Repository
public class MovieRepository {
    
    @Autowired 
    private JdbcTemplate jdbcTemplate;
    
    public List<Movie> getAllMovies(Integer limit, Integer offset) throws DataAccessException {
        List<Movie> movies = new LinkedList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_ALL_MOVIES, limit, offset);

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
    
}
