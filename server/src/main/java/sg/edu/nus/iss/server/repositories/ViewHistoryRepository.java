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
}
