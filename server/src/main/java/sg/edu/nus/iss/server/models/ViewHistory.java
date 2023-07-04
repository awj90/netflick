package sg.edu.nus.iss.server.models;

public class ViewHistory {
    private Integer id;
    private String email;
    private Integer movieId;
    private Integer timeElapsed;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Integer getMovieId() {
        return movieId;
    }
    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }
    public Integer getTimeElapsed() {
        return timeElapsed;
    }
    public void setTimeElapsed(Integer timeElapsed) {
        this.timeElapsed = timeElapsed;
    }
}
