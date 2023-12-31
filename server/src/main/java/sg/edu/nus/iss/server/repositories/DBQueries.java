package sg.edu.nus.iss.server.repositories;

public class DBQueries {
    
    // genres table
    public static final String SQL_SELECT_ALL_GENRES = "select * from genres";

    // movies table
    public static final String SQL_SELECT_MOVIES_BY_GENRE = "select movies.id, movies.title, movies.description, movies.video_id, languages.language_name, movies.video_duration, movies.genre from movies join languages on movies.language_id = languages.id where movies.genre like ?";
    public static final String SQL_SELECT_MOVIE_BY_ID = "select movies.id, movies.title, movies.description, movies.video_id, languages.language_name, movies.video_duration, movies.genre from movies join languages on movies.language_id = languages.id where movies.id = ?";
    public static final String SQL_SELECT_MOVIES_BY_SEARCH_KEY = "select movies.id, movies.title, movies.description, movies.video_id, languages.language_name, movies.video_duration, movies.genre from movies join languages on movies.language_id = languages.id where movies.title like ? or movies.description like ? or movies.genre like ?";

    // countries and states table
    public static final String SQL_SELECT_ALL_COUNTRIES = "select * from countries";
    public static final String SQL_SELECT_STATES_BY_COUNTRY_CODE = "select * from states inner join countries on states.country_id = countries.id where countries.code = ?";

    // donors and donations table
    public static final String SQL_SELECT_DONOR_ID_BY_EMAIL = "select id from donors where email = ?";
    public static final String SQL_INSERT_NEW_DONOR = "insert into donors (first_name, last_name, email) values (?, ?, ?)";
    public static final String SQL_INSERT_NEW_DONATION = "insert into donations (amount, wishlist, transaction_id, timestamp, donor_id) values (?, ?, ?, ?, ?)";
}
