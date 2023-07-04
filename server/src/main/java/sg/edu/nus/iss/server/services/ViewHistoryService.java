package sg.edu.nus.iss.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.server.repositories.ViewHistoryRepository;

@Service
public class ViewHistoryService {
    @Autowired
    private ViewHistoryRepository viewHistoryRepository;
}
