package cooking.idea.idea_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JwtAuthResponse {
    @JsonProperty("access_token")
    private String accessToken;
    
    @JsonProperty("token_type")
    private String tokenType = "Bearer";
    
    @JsonProperty("expires_in")
    private Long expiresIn;
    
    // Getters and Setters
    public String getAccessToken() {
        return accessToken;
    }
    
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    
    public String getTokenType() {
        return tokenType;
    }
    
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
    
    public Long getExpiresIn() {
        return expiresIn;
    }
    
    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }
    
    // Builder pattern methods
    public static JwtAuthResponseBuilder builder() {
        return new JwtAuthResponseBuilder();
    }
    
    public static class JwtAuthResponseBuilder {
        private String accessToken;
        private String tokenType = "Bearer";
        private Long expiresIn;
        
        public JwtAuthResponseBuilder accessToken(String accessToken) {
            this.accessToken = accessToken;
            return this;
        }
        
        public JwtAuthResponseBuilder tokenType(String tokenType) {
            this.tokenType = tokenType;
            return this;
        }
        
        public JwtAuthResponseBuilder expiresIn(Long expiresIn) {
            this.expiresIn = expiresIn;
            return this;
        }
        
        public JwtAuthResponse build() {
            JwtAuthResponse response = new JwtAuthResponse();
            response.setAccessToken(accessToken);
            response.setTokenType(tokenType);
            response.setExpiresIn(expiresIn);
            return response;
        }
    }
    
    public static JwtAuthResponse of(String token, Long expiresIn) {
        return new JwtAuthResponseBuilder()
                .accessToken(token)
                .expiresIn(expiresIn)
                .build();
    }
}
