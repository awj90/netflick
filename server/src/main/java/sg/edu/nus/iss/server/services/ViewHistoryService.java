package sg.edu.nus.iss.server.services;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.server.exceptions.DatabaseException;
import sg.edu.nus.iss.server.models.Movie;
import sg.edu.nus.iss.server.models.ViewHistory;
import sg.edu.nus.iss.server.repositories.MovieRepository;
import sg.edu.nus.iss.server.repositories.ViewHistoryRepository;

@Service
public class ViewHistoryService {
    
    @Autowired
    private ViewHistoryRepository viewHistoryRepository;

    @Autowired
    private MovieRepository movieRepository;

    public void upsertViewHistory(ViewHistory viewHistory) throws DatabaseException {
        viewHistoryRepository.upsertViewHistory(viewHistory);
    }

    public String getElapsedTimeByEmailAndMovieId(String email, Integer movieId) throws DatabaseException {
        return viewHistoryRepository.getElapsedTimeByEmailAndMovieId(email, movieId);
    }

    public List<Movie> getWatchedMovies(String email) throws DatabaseException {
        try {
            Set<Object> videoIds = viewHistoryRepository.getWatchedMovies(email);
            List<Movie> watchedMovies = new LinkedList<>();
            for (Object videoId: videoIds) {
                String id = (String) videoId;
                Optional<Movie> opt = movieRepository.getMovieById(Integer.parseInt(id));
                if (!opt.isEmpty()) {
                    watchedMovies.add(opt.get());
                }
            }
            return watchedMovies;
        } catch (DatabaseException | DataAccessException ex) {
            throw new DatabaseException(ex.getMessage());
        }
    }
}
