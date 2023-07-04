package sg.edu.nus.iss.server.repositories;

public class DBQueries {
    
    // movies table
    public static final String SQL_SELECT_ALL_MOVIES = "select movies.id, movies.title, movies.description, movies.video_id, languages.language_name, movies.video_duration, movies.genre from movies join languages on movies.language_id = languages.id limit ? offset ?";
    public static final String SQL_SELECT_MOVIE_BY_ID = "select movies.id, movies.title, movies.description, movies.video_id, languages.language_name, movies.video_duration, movies.genre from movies join languages on movies.language_id = languages.id where movies.id = ?";

    // view_history table
    public static final String SQL_INSERT_VIEW_HISTORY = "insert into view_history (email, movie_id, time_elapsed) values (?, ?, ?)";
    public static final String SQL_UPDATE_VIEW_HISTORY_BY_ID = "update view_history set time_elapsed = ? where id = ?";
    public static final String SQL_SELECT_ID_BY_EMAIL_AND_MOVIE_ID = "select id from view_history where email = ? and movie_id = ?";
}
