package sg.edu.nus.iss.server.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObjectBuilder;

public class Movie {
    private Integer id;
    private String title;
    private String description;
    private String videoId;
    private String languageName;
    private String videoDuration;
    private String genre;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getVideoId() {
        return videoId;
    }
    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }
    public String getLanguageName() {
        return languageName;
    }
    public void setLanguageName(String languageName) {
        this.languageName = languageName;
    }
    public String getVideoDuration() {
        return videoDuration;
    }
    public void setVideoDuration(String videoDuration) {
        this.videoDuration = videoDuration;
    }
    public String getGenre() {
        return genre;
    }
    public void setGenre(String genre) {
        this.genre = genre;
    }

    public static Movie create(SqlRowSet rs) {
        Movie movie = new Movie();
        movie.setId(rs.getInt("id"));
        movie.setTitle(rs.getString("title"));
        movie.setDescription(rs.getString("description"));
        movie.setVideoId(rs.getString("video_id"));
        movie.setLanguageName(rs.getString("language_name"));
        movie.setVideoDuration(rs.getString("video_duration"));
        movie.setGenre(rs.getString("genre"));
        return movie;
    }

    public JsonObjectBuilder toJson() {
        return Json.createObjectBuilder().add("id", this.getId())
                                        .add("title", this.getTitle())
                                        .add("description", this.getDescription())
                                        .add("video_id", this.getVideoId())
                                        .add("language_name", this.getLanguageName())
                                        .add("video_duration", this.getVideoDuration())
                                        .add("genre", this.getGenre());
                                        
    }
}
