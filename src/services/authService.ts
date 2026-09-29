import { AuthResponse, DashboardData } from '../types';

// Key for storing JWT token in browser localStorage
const TOKEN_KEY = 'careerpilot_auth_token';

/**
 * Retrieve saved JWT token from localStorage
 */
export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Save JWT token into localStorage
 */
export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Remove JWT token from localStorage
 */
export function removeStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Send user registration request to POST /api/signup
 */
export async function signupUser(name: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.error || 'Signup failed. Please try again.',
        error: data.error || 'Signup failed',
      };
    }

    // Save token if received
    if (data.token) {
      setStoredToken(data.token);
    }

    return data;
  } catch (error: any) {
    return {
      message: 'Network error or server unreachable. Please check your connection.',
      error: error.message || 'Network error',
    };
  }
}

/**
 * Send user login request to POST /api/login
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.error || 'Login failed. Invalid credentials.',
        error: data.error || 'Login failed',
      };
    }

    // Save JWT token in localStorage upon successful authentication
    if (data.token) {
      setStoredToken(data.token);
    }

    return data;
  } catch (error: any) {
    return {
      message: 'Network error or server unreachable. Please check your connection.',
      error: error.message || 'Network error',
    };
  }
}

/**
 * Fetch protected user telemetry data from GET /api/dashboard
 * Requires JWT token passed in Authorization header
 */
export async function getDashboardData(): Promise<{ success: boolean; data?: DashboardData; error?: string }> {
  const token = getStoredToken();

  if (!token) {
    return { success: false, error: 'No authentication token found. Please log in.' };
  }

  try {
    const response = await fetch('/api/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Pass JWT token in Authorization header
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeStoredToken(); // Clear invalid/expired token
      }
      return { success: false, error: data.error || 'Failed to load dashboard data.' };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || 'Error communicating with server.' };
  }
}

/**
 * Log out user by calling server logout endpoint and clearing localStorage token
 */
export async function logoutUser(): Promise<void> {
  try {
    await fetch('/api/logout', { method: 'POST' });
  } catch {
    // Ignore network errors on logout
  } finally {
    removeStoredToken();
  }
}

/**
 * BONUS: Request password reset token via POST /api/forgot-password
 */
export async function requestForgotPassword(email: string): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.error || 'Failed to request password reset.',
        error: data.error || 'Request failed',
      };
    }

    return data;
  } catch (error: any) {
    return {
      message: 'Network error processing forgot password request.',
      error: error.message || 'Network error',
    };
  }
}

/**
 * BONUS: Reset password with code via POST /api/reset-password
 */
export async function resetPasswordWithCode(email: string, resetCode: string, newPassword: string): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, resetCode, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.error || 'Failed to reset password.',
        error: data.error || 'Reset failed',
      };
    }

    return data;
  } catch (error: any) {
    return {
      message: 'Network error resetting password.',
      error: error.message || 'Network error',
    };
  }
}
