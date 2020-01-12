import { Injectable } from '@angular/core';

const credentialsKey = 'credentials';
@Injectable()
export class LoginService {
  private _credentials: LoginCredentials | null = null;
  constructor() {
    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
   }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this._credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): LoginCredentials | null {
    return this._credentials;
  }

    /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: LoginCredentials) {
    this._credentials = credentials || null;
    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
  removeCredentials() {
    localStorage.removeItem(credentialsKey);
    this._credentials = null;
  }
  checkIfAdmin() {
    if (this._credentials.username === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}

export class LoginCredentials {
  username: string;
  password: string;
}

