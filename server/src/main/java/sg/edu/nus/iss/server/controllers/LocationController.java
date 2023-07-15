package sg.edu.nus.iss.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import sg.edu.nus.iss.server.models.Country;
import sg.edu.nus.iss.server.models.State;
import sg.edu.nus.iss.server.services.LocationService;

@RestController
@RequestMapping(path="/api")
@CrossOrigin(origins="*")
public class LocationController {
    @Autowired
    private LocationService locationService;

    // GET /api/countries
    @GetMapping(path="/countries", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAllCountries() {
        try {
            List<Country> countries = locationService.getAllCountries();
            JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
            for (Country country: countries) {
                jsonArrayBuilder.add(country.toJson());
            }
            return ResponseEntity.status(HttpStatus.OK)
		    					.contentType(MediaType.APPLICATION_JSON)
		    					.body(jsonArrayBuilder.build().toString());
                            
        } catch (DataAccessException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.contentType(MediaType.APPLICATION_JSON)
							.body(Json.createObjectBuilder().add("error", ex.getMessage()).build().toString());
        }
    }

    // GET /api/states?countryCode=SG
    @GetMapping(path="/states", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getStatesByCountryCode(@RequestParam(required=true) String countryCode) {
        try {
            List<State> states = locationService.getStatesByCountryCode(countryCode);
            JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
            for (State state: states) {
                jsonArrayBuilder.add(state.toJson());
            }
            return ResponseEntity.status(HttpStatus.OK)
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(jsonArrayBuilder.build().toString());

        } catch (DataAccessException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.contentType(MediaType.APPLICATION_JSON)
							.body(Json.createObjectBuilder().add("error", ex.getMessage()).build().toString());
        }
    }
}
