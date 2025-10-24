// Authentication Service
// This is a mock implementation - replace with actual Firebase once installed

class AuthService {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
  }

  // Mock sign in with email and password
  async signInWithEmailAndPassword(email, password) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user object
      const user = {
        uid: 'mock_user_' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
        emailVerified: true
      };
      
      this.currentUser = user;
      this.notifyListeners(user);
      
      return { user };
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  }

  // Mock sign up with email and password
  async createUserWithEmailAndPassword(email, password) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        uid: 'mock_user_' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
        emailVerified: false
      };
      
      this.currentUser = user;
      this.notifyListeners(user);
      
      return { user };
    } catch (error) {
      throw new Error('Failed to create account');
    }
  }

  // Mock sign out
  async signOut() {
    this.currentUser = null;
    this.notifyListeners(null);
  }

  // Mock password reset
  async sendPasswordResetEmail(email) {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Password reset email sent to:', email);
  }

  // Mock auth state listener
  onAuthStateChanged(callback) {
    this.listeners.push(callback);
    
    // Call immediately with current state
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notifyListeners(user) {
    this.listeners.forEach(listener => listener(user));
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

// Export singleton instance
export const auth = new AuthService();

// When you install Firebase, replace this file with:
/*
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
};
*/