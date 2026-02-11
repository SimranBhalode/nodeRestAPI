// User Model
class User {
  constructor(id, username, email, role = 'user') {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.created = new Date();
    this.lastLogin = null;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  validateEmail() {
    // Simple email validation - no null check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  updateLastLogin() {
    this.lastLogin = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role,
      created: this.created,
      lastLogin: this.lastLogin
    };
  }
}

module.exports = User;
