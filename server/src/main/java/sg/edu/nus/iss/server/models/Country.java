package sg.edu.nus.iss.server.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObjectBuilder;

public class Country {

    private Integer id;
    private String code;
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static Country create(SqlRowSet rs) {
        Country country = new Country();
        country.setId(rs.getInt("id"));
        country.setCode(rs.getString("code"));
        country.setName(rs.getString("name"));
        return country;
    }

     public JsonObjectBuilder toJson() {
        return Json.createObjectBuilder().add("id", this.getId())
                                        .add("code", this.getCode())
                                        .add("name", this.getName());
                                        
    }
}
