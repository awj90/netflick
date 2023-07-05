package sg.edu.nus.iss.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
public class LocationController {
    @Autowired
    private LocationService locationService;

    @GetMapping(path="/countries", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAllCountries() {
        List<Country> countries = locationService.getAllCountries();
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for (Country country: countries) {
            jsonArrayBuilder.add(country.toJson());
        }
        return ResponseEntity.status(HttpStatus.OK)
							.contentType(MediaType.APPLICATION_JSON)
							.body(jsonArrayBuilder.build().toString());
    }

     @GetMapping(path="/states", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getStatesByCountryCode(@RequestParam(required=true) String countryCode) {
        List<State> states = locationService.getStatesByCountryCode(countryCode);
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for (State state: states) {
            jsonArrayBuilder.add(state.toJson());
        }
        return ResponseEntity.status(HttpStatus.OK)
							.contentType(MediaType.APPLICATION_JSON)
							.body(jsonArrayBuilder.build().toString());
    }
}
