package sg.edu.nus.iss.server.models;

public class Payment {
    private Integer amount; // in cents, not dollars
    private String currency;
    private String receiptEmail; // email address to send receipt to

    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }
    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    public String getReceiptEmail() {
        return receiptEmail;
    }
    public void setReceiptEmail(String receiptEmail) {
        this.receiptEmail = receiptEmail;
    }
}
