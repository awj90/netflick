package sg.edu.nus.iss.server.controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import sg.edu.nus.iss.server.models.Movie;
import sg.edu.nus.iss.server.models.ViewHistory;
import sg.edu.nus.iss.server.services.MovieService;
import sg.edu.nus.iss.server.services.ViewHistoryService;

@Controller
@RequestMapping(path="/api", produces=MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private ViewHistoryService viewHistoryService;

    @GetMapping(path="/movies", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getAllMovies(@RequestParam(required = false, defaultValue= "10") String limit, @RequestParam(required = false, defaultValue = "0") String offset) {
        List<Movie> movies = this.movieService.getAllMovies(Integer.parseInt(limit), Integer.parseInt(offset));
		JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
		for (Movie movie: movies) {
            if (movie != null) {
                jsonArrayBuilder.add(movie.toJson());
            }
		}
		return ResponseEntity.status(HttpStatus.OK)
							.contentType(MediaType.APPLICATION_JSON)
							.body(jsonArrayBuilder.build().toString());
    }

    @GetMapping(path="/movie/{id}", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getMovieById(@PathVariable Integer id) {
        Optional<Movie> opt = this.movieService.getMovieById(id);
        return ResponseEntity.status(HttpStatus.OK)
							.contentType(MediaType.APPLICATION_JSON)
							.body(opt.get().toJson().build().toString());

    }

    @PutMapping(path="/save-view-history", produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> saveViewHistory(@RequestBody String jsonString) {
        try (InputStream is = new ByteArrayInputStream(jsonString.getBytes())) {
			JsonReader reader = Json.createReader(is);
			JsonObject jsonObject = reader.readObject();
			ViewHistory viewHistory = new ViewHistory();
			viewHistory.setEmail(jsonObject.getString("email"));
			viewHistory.setMovieId(jsonObject.getString("movie_id"));
			viewHistory.setTimeElapsed(jsonObject.getString("time_elapsed"));
		
			viewHistoryService.upsertViewHistory(viewHistory);

			return ResponseEntity.status(HttpStatus.OK)
								.contentType(MediaType.APPLICATION_JSON)
								.body(Json.createObjectBuilder()
											.build()
											.toString());
		
		} catch (IOException ex){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
								.contentType(MediaType.APPLICATION_JSON)
								.body(Json.createObjectBuilder().add("error", ex.getMessage())
																.build().toString());
		}
    }

    @GetMapping(path="/get-view-history", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getViewHistory(@RequestParam(required = true) String email, @RequestParam(required = true) Integer movieId) {
        String result = viewHistoryService.getElapsedTimeByEmailAndMovieId(email, movieId);
        if (result != null) {
            return ResponseEntity.status(HttpStatus.OK)
								.contentType(MediaType.APPLICATION_JSON)
								.body(Json.createObjectBuilder()
                                            .add("elapsed_time", result)
											.build()
											.toString());
        } 
        return ResponseEntity.status(HttpStatus.OK)
								.contentType(MediaType.APPLICATION_JSON)
								.body(Json.createObjectBuilder()
                                            .add("elapsed_time", 0)
											.build()
											.toString());
        
    }
}
