package sg.edu.nus.iss.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.server.models.Country;
import sg.edu.nus.iss.server.models.State;
import sg.edu.nus.iss.server.repositories.LocationRepository;

@Service
public class LocationService {
    
    @Autowired
    private LocationRepository locationRepository;

     public List<State> getStatesByCountryCode(String countryCode) throws DataAccessException {
        return locationRepository.getStatesByCountryCode(countryCode);
     }

     public List<Country> getAllCountries() throws DataAccessException {
        return locationRepository.getAllCountries();
     }
}
