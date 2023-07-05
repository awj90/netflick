package sg.edu.nus.iss.server.repositories;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.models.Country;
import sg.edu.nus.iss.server.models.State;

import static sg.edu.nus.iss.server.repositories.DBQueries.*;

@Repository
public class LocationRepository {
    
    @Autowired 
    private JdbcTemplate jdbcTemplate;

    public List<State> getStatesByCountryCode(String countryCode) throws DataAccessException {
        List<State> states = new LinkedList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_STATES_BY_COUNTRY_CODE, countryCode);

        while (rs.next()) {
            states.add(State.create(rs));
        }
        return states;
    }
    
    public List<Country> getAllCountries()  throws DataAccessException {
        List<Country> countries = new LinkedList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_ALL_COUNTRIES);

        while (rs.next()) {
            countries.add(Country.create(rs));
        }
        return countries;
    }
}
