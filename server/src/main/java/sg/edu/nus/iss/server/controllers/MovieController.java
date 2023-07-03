package sg.edu.nus.iss.server.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import sg.edu.nus.iss.server.models.Movie;
import sg.edu.nus.iss.server.services.MovieService;

@Controller
@RequestMapping(path="/api", produces=MediaType.APPLICATION_JSON_VALUE)
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping(path="/movies")
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

    @GetMapping(path="/movie/{id}")
    @ResponseBody
    public ResponseEntity<String> getMovieById(@PathVariable Integer id) {
        Optional<Movie> opt = this.movieService.getMovieById(id);
        return ResponseEntity.status(HttpStatus.OK)
							.contentType(MediaType.APPLICATION_JSON)
							.body(opt.get().toJson().build().toString());

    }
}
