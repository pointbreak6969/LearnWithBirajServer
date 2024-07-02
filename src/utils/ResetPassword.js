function getResetPasswordToken() {
    // Generate a random token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Store the token in a database or any other storage mechanism
    
    return token;
}