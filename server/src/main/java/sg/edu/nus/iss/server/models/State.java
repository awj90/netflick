package sg.edu.nus.iss.server.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObjectBuilder;

public class State {
    
    private Integer id;
    private String name;
    private Integer countryId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    public static State create(SqlRowSet rs) {
        State state = new State();
        state.setId(rs.getInt("id"));
        state.setName(rs.getString("name"));
        state.setCountryId(rs.getInt("country_id"));
        return state;
    }

    public JsonObjectBuilder toJson() {
        return Json.createObjectBuilder().add("id", this.getId())
                                        .add("name", this.getName())
                                        .add("country_id", this.getCountryId());
                                        
    }
}
