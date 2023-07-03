package sg.edu.nus.iss.server.repositories;

public class DBQueries {
    public static final String SQL_SELECT_ALL_MOVIES = "select movies.id, movies.title, movies.description, movies.video_id, languages.language_name, movies.video_duration, movies.genre from movies join languages on movies.language_id = languages.id limit ? offset ?";
    public static final String SQL_SELECT_MOVIE_BY_ID = "select movies.id, movies.title, movies.description, movies.video_id, languages.language_name, movies.video_duration, movies.genre from movies join languages on movies.language_id = languages.id where movies.id = ?";
}
