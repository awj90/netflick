package sg.edu.nus.iss.server.models;

public class ViewHistory {

    private String email;
    private String movieId;
    private String timeElapsed;

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getMovieId() {
        return movieId;
    }
    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }
    public String getTimeElapsed() {
        return timeElapsed;
    }
    public void setTimeElapsed(String timeElapsed) {
        this.timeElapsed = timeElapsed;
    }
}
