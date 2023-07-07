package sg.edu.nus.iss.server.models;

public class Donation {
    private Integer id;
    private Integer amount;
    private String wishlist;
    private String transactionId;
    private Long timestamp;
    private Integer donor_id;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }
    public String getWishlist() {
        return wishlist;
    }
    public void setWishlist(String wishlist) {
        this.wishlist = wishlist;
    }
    public String getTransactionId() {
        return transactionId;
    }
    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
    public Long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
    public Integer getDonor_id() {
        return donor_id;
    }
    public void setDonor_id(Integer donor_id) {
        this.donor_id = donor_id;
    }
}
