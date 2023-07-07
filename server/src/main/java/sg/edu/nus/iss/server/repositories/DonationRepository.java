package sg.edu.nus.iss.server.repositories;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.models.Donation;
import sg.edu.nus.iss.server.models.Donor;

import static sg.edu.nus.iss.server.repositories.DBQueries.*;

@Repository
public class DonationRepository {
    @Autowired 
    private JdbcTemplate jdbcTemplate;

    public Optional<Integer> getDonorIdByEmail(String email) throws DataAccessException {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_DONOR_ID_BY_EMAIL, email);
        if (!rs.next()) {
            return Optional.empty();
        }
        return Optional.of(rs.getInt("id"));
    }

    public boolean insertDonor(Donor donor) throws DataAccessException{
        Integer inserted = jdbcTemplate.update(SQL_INSERT_NEW_DONOR, donor.getFirstName(), donor.getLastName(), donor.getEmail());
        return inserted > 0;
    }

    public boolean insertDonation(Donation donation) throws DataAccessException{
        Integer inserted = jdbcTemplate.update(SQL_INSERT_NEW_DONATION, donation.getAmount(), donation.getWishlist(), donation.getTransactionId(), new Date(donation.getTimestamp()), donation.getDonor_id());
        return inserted > 0;
    }
}
