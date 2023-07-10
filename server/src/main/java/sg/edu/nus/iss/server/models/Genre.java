package sg.edu.nus.iss.server.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObjectBuilder;

public class Genre {
    private Integer id;
    private String genre_name;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getGenre_name() {
        return genre_name;
    }
    public void setGenre_name(String genre_name) {
        this.genre_name = genre_name;
    }

    public static Genre create(SqlRowSet rs) {
        Genre genre = new Genre();
        genre.setId(rs.getInt("id"));
        genre.setGenre_name(rs.getString("genre_name"));
        return genre;
    }

     public JsonObjectBuilder toJson() {
        return Json.createObjectBuilder().add("id", this.getId())
                                        .add("genre_name", this.getGenre_name());
                                        
    }
}
