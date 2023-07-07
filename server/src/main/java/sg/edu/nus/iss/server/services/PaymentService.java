package sg.edu.nus.iss.server.services;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import sg.edu.nus.iss.server.models.Donation;
import sg.edu.nus.iss.server.models.Donor;
import sg.edu.nus.iss.server.models.Payment;
import sg.edu.nus.iss.server.repositories.DonationRepository;

@Service
public class PaymentService {
    private static final String CREDIT_CARD_STATEMENT_DISPLAY = "NETFLICK DONATION";
    private final List<String> AVAILABLE_PAYMENT_METHODS = new ArrayList<>(Arrays.asList("card"));
    private DonationRepository donationRepository;

    public PaymentService(DonationRepository donationRepository, @Value("${stripe.secret.key}") String stripeSecretKey) {
        this.donationRepository = donationRepository;
        Stripe.apiKey = stripeSecretKey; // initialize external Stripe API
    }

    public PaymentIntent createPaymentIntent(Payment payment) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("amount", payment.getAmount());
        params.put("currency", payment.getCurrency());
        params.put("payment_method_types", AVAILABLE_PAYMENT_METHODS);
        params.put("description", CREDIT_CARD_STATEMENT_DISPLAY);
        params.put("receipt_email", payment.getReceiptEmail());
        return PaymentIntent.create(params);
    }

    public Optional<Integer> getDonorIdByEmail(String email) throws DataAccessException {
        return this.donationRepository.getDonorIdByEmail(email);
    }

    public boolean insertDonor(Donor donor) throws DataAccessException{
        return this.donationRepository.insertDonor(donor);
    }

    @Transactional
    public String saveDonation(String jsonString) throws Exception {

         try (InputStream is = new ByteArrayInputStream(jsonString.getBytes())) {
			JsonReader reader = Json.createReader(is);
			JsonObject jsonObject = reader.readObject();

			Donor donor = new Donor();
            JsonObject donorObject = jsonObject.getJsonObject("donor");
            donor.setFirstName(donorObject.getString("firstName"));
            donor.setLastName(donorObject.getString("lastName"));
            donor.setEmail(donorObject.getString("email"));

            Integer donorId = null;
            Optional<Integer> opt = this.donationRepository.getDonorIdByEmail(donor.getEmail());
            if (opt.isEmpty()) {
                this.donationRepository.insertDonor(donor);
                donorId = this.donationRepository.getDonorIdByEmail(donor.getEmail()).get();
            } else {
                donorId = opt.get();
            }

            Donation donation = new Donation();
            donation.setDonor_id(donorId);
            donation.setAmount(jsonObject.getInt("amount"));
            donation.setWishlist(jsonObject.getString("wishlist"));
            donation.setTransactionId(jsonObject.getString("transaction_id"));
            donation.setTimestamp(new Date().getTime());
            this.donationRepository.insertDonation(donation);
            return donation.getTransactionId();
        } catch (IOException | DataAccessException ex) {
            throw new Exception(ex.getMessage());
        }
    }
}
