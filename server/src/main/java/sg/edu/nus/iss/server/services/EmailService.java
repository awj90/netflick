package sg.edu.nus.iss.server.services;

import org.springframework.stereotype.Service;

import sg.edu.nus.iss.server.models.Donation;
import sg.edu.nus.iss.server.models.Donor;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class EmailService {
    
    private JavaMailSender javaMailSender;
    private String senderEmail;

    public EmailService(JavaMailSender javaMailSender, @Value("${spring.mail.username}") String senderEmail) {
        this.javaMailSender = javaMailSender;
        this.senderEmail = senderEmail;
    }

    public String sendDonationReceipt(Donor donor, Donation donation) throws MailException {
        SimpleMailMessage sms = new SimpleMailMessage();
        sms.setFrom(senderEmail);
        sms.setTo(donor.getEmail());
        sms.setSubject(generateEmailSubject(donation));
        sms.setText(generateEmailBody(donor, donation));
        javaMailSender.send(sms);
        return donation.getTransactionId();
    }

    private String generateEmailBody(Donor donor, Donation donation) {
        return "Dear %s,\n\nYour donation has been received :)\n\nTransaction id: %s\nAmount: $%s\nTime of record: %s\nApp wishlist: %s\n\nThank you and have a great day!".formatted(donor.getFirstName(), donation.getTransactionId(), donation.getAmount(), new Date(donation.getTimestamp()).toString(), donation.getWishlist());
    }

    private String generateEmailSubject(Donation donation) {
        return "[DO NOT REPLY] Successful Netflick Donation - Ref: %s".formatted(donation.getTransactionId());
    }
}