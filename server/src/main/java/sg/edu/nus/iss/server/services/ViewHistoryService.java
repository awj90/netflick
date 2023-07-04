package sg.edu.nus.iss.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.server.models.ViewHistory;
import sg.edu.nus.iss.server.repositories.ViewHistoryRepository;

import java.util.Optional;

@Service
public class ViewHistoryService {
    @Autowired
    private ViewHistoryRepository viewHistoryRepository;

    public boolean upsert(ViewHistory viewHistory) throws DataAccessException {
        Optional<Integer> opt = this.viewHistoryRepository.getIdByEmailAndMovieId(viewHistory.getEmail(), viewHistory.getMovieId());
        if (opt.isEmpty()) {
            // insert a new row
            return this.viewHistoryRepository.insertViewHistory(viewHistory);
        } else {
            // update an existing row
            return this.viewHistoryRepository.updateViewHistoryById(viewHistory.getTimeElapsed(), opt.get());
        }
    }
}
