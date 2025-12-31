// Authentication Module
import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Register new user
export async function register(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update user profile with name
    await updateProfile(userCredential.user, {
      displayName: name
    });

    return { success: true, user: userCredential.user };
  } catch (error) {
    let errorMessage = 'Registrasi gagal';

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email sudah terdaftar';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password terlalu lemah (min. 6 karakter)';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Format email tidak valid';
    }

    return { success: false, error: errorMessage };
  }
}

// Login user
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Firebase Login Error:', error.code, error.message);
    let errorMessage = 'Login gagal';

    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      errorMessage = 'Email atau password salah';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Format email tidak valid';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Terlalu banyak percobaan. Coba lagi nanti';
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Koneksi internet bermasalah';
    } else {
      errorMessage = 'Error: ' + error.message;
    }

    return { success: false, error: errorMessage };
  }
}

// Reset password
export async function resetPassword(email) {
  try {
    console.log('Attempting to send reset email to:', email);
    await sendPasswordResetEmail(auth, email);
    console.log('Reset email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Reset Password Error:', error.code, error.message);
    let errorMessage = 'Gagal mengirim email reset';

    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Email tidak terdaftar di sistem';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Format email tidak valid';
    } else {
      errorMessage = 'Error: ' + error.message;
    }

    return { success: false, error: errorMessage };
  }
}

// Google Sign-In
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let errorMessage = 'Login dengan Google gagal';

    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Login dibatalkan';
    } else if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Popup diblokir browser. Izinkan popup untuk login';
    }

    return { success: false, error: errorMessage };
  }
}

// Logout user
export async function logout() {
  try {
    await signOut(auth);
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// Check authentication state
export function checkAuth(callback) {
  onAuthStateChanged(auth, callback);
}

// Get current user
export function getCurrentUser() {
  return auth.currentUser;
}
