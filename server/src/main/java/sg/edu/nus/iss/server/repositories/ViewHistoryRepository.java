package sg.edu.nus.iss.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.models.ViewHistory;
import static sg.edu.nus.iss.server.repositories.DBQueries.*;

@Repository
public class ViewHistoryRepository {

    @Autowired 
    private JdbcTemplate jdbcTemplate;

    public boolean insertViewHistory(ViewHistory viewHistory){
        Integer inserted = jdbcTemplate.update(SQL_INSERT_VIEW_HISTORY, viewHistory.getEmail(), viewHistory.getMovieId(), viewHistory.getTimeElapsed());
        return inserted > 0;
    }

    public boolean updateViewHistoryById(Integer timeElapsed, Integer id){
        Integer updated = jdbcTemplate.update(SQL_UPDATE_VIEW_HISTORY_BY_ID, timeElapsed, id);
        return updated > 0;
    }
}
