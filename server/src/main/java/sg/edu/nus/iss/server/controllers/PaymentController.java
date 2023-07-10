package sg.edu.nus.iss.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import jakarta.json.Json;
import sg.edu.nus.iss.server.models.Payment;
import sg.edu.nus.iss.server.services.PaymentService;

@RestController
@RequestMapping(path="/api")
@CrossOrigin(origins="*")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;

    // POST /api/donate/payment-intent
    @PostMapping(path="/donate/payment-intent", produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createPaymentIntent(@RequestBody Payment payment) throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(payment);

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(paymentIntent.toJson());
    }

    // POST/api/donate
    @PostMapping(path="/donate", produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveDonation(@RequestBody String jsonString) {

         try {
            String transactionId = paymentService.saveDonation(jsonString);
            return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(Json.createObjectBuilder().add("transaction_id", transactionId).build().toString());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
								.contentType(MediaType.APPLICATION_JSON)
								.body(Json.createObjectBuilder().add("error", ex.getMessage())
																.build().toString());
        }
    }
}
