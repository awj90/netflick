package sg.edu.nus.iss.server.repositories;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.exceptions.DatabaseException;
import sg.edu.nus.iss.server.models.ViewHistory;

@Repository
public class ViewHistoryRepository {

    @Autowired
    @Qualifier("view-history")
    private RedisTemplate<String, String> redisTemplate;

    public void upsertViewHistory(ViewHistory viewHistory) throws DatabaseException {
        try {
            redisTemplate.opsForHash().put(viewHistory.getEmail(), viewHistory.getMovieId().toString(), viewHistory.getTimeElapsed().toString());
        } catch (Exception ex) {
            throw new DatabaseException("Error saving progress of watched movie.\nUser: %s\nMovieId: %s".formatted(viewHistory.getEmail(), viewHistory.getMovieId()));
        }
    }

    public String getElapsedTimeByEmailAndMovieId(String email, Integer movieId) throws DatabaseException {
        try {
            return (String) redisTemplate.opsForHash().get(email, movieId.toString());
        } catch (Exception ex) {
            throw new DatabaseException("Error fetching progress of watched movie.\nUser: %s\nMovieId: %s".formatted(email, movieId));
        }
    }

    public Set<Object> getWatchedMovies(String email) throws DatabaseException {
        try {
            return redisTemplate.opsForHash().keys(email);
        } catch (Exception ex) {
            throw new DatabaseException("Error fetching watched movies.\nUser: %s".formatted(email));
        }
    }
}
