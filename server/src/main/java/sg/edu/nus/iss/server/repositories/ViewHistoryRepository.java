package sg.edu.nus.iss.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.models.ViewHistory;

@Repository
public class ViewHistoryRepository {

    @Autowired
    @Qualifier("view-history")
    private RedisTemplate<String, String> redisTemplate;

    public void upsertViewHistory(ViewHistory viewHistory) {
        redisTemplate.opsForHash().put(viewHistory.getEmail(), viewHistory.getMovieId().toString(), viewHistory.getTimeElapsed().toString());
    }

    public String getElapsedTimeByEmailAndMovieId(String email, Integer movieId) {
        return (String) redisTemplate.opsForHash().get(email, movieId.toString());
    }

    // Moved to Redis for faster retrieval
    // @Autowired 
    // private JdbcTemplate jdbcTemplate;

    // public boolean insertViewHistory(ViewHistory viewHistory) throws DataAccessException{
    //     Integer inserted = jdbcTemplate.update(SQL_INSERT_VIEW_HISTORY, viewHistory.getEmail(), viewHistory.getMovieId(), viewHistory.getTimeElapsed());
    //     return inserted > 0;
    // }

    // public boolean updateViewHistoryById(Integer timeElapsed, Integer id) throws DataAccessException{
    //     Integer updated = jdbcTemplate.update(SQL_UPDATE_VIEW_HISTORY_BY_ID, timeElapsed, id);
    //     return updated > 0;
    // }

    // public Optional<Integer> getIdByEmailAndMovieId(String email, Integer movieId) throws DataAccessException {
    //     SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_ID_BY_EMAIL_AND_MOVIE_ID, email, movieId);
    //     if (!rs.next()) {
    //         return Optional.empty();
    //     }
    //     return Optional.of(rs.getInt("id"));
    // }
    
}
