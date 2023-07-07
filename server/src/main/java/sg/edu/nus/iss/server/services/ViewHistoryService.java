package sg.edu.nus.iss.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.server.models.ViewHistory;
import sg.edu.nus.iss.server.repositories.ViewHistoryRepository;

@Service
public class ViewHistoryService {
    
    @Autowired
    private ViewHistoryRepository viewHistoryRepository;

    public void upsertViewHistory(ViewHistory viewHistory) {
        viewHistoryRepository.upsertViewHistory(viewHistory);
    }

    public String getElapsedTimeByEmailAndMovieId(String email, Integer movieId) {
        return viewHistoryRepository.getElapsedTimeByEmailAndMovieId(email, movieId);
    }
}
