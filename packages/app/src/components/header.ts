// proto/src/scripts/header.ts
import { LitElement, html, css } from 'lit';
import { state } from 'lit/decorators.js';
import { Auth, Observer } from '@calpoly/mustang';

/**
 * <app-header>
 * A reusable header component that:
 * - Renders the navigation icons
 * - Observes authentication state under "blazing:auth"
 * - Shows Sign In link or Sign Out button accordingly
 */

export class AppHeader extends LitElement {
  private _authObserver = new Observer<Auth.Model>(this, 'app:auth');

  @state() private _authenticated = false;
  @state() private _username: string | undefined;
  @state() private _darkMode = false;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((model) => {
      this._authenticated = !!model.user?.authenticated;
      this._username = model.user?.username;
    });
  }

  private _toggleDark(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this._darkMode = checked;
    document.body.classList.toggle('dark-mode', checked);
  }

  private _onSignOut() {
    this.dispatchEvent(new CustomEvent('auth:message', {
      bubbles: true,
      composed: true,
      detail: ['auth/signout']
    }));
  }

  render() {
    const icon = this._darkMode ? 'icon-lightmode' : 'icon-darkmode';
    return html`
      <header>
        <nav>
          <ul>
            <div class="home">
                <a href="/app">Cal Poly Pickleball</a>
            </div>
            <li>
              <label id="darkmode-toggle">
                <input
                  type="checkbox"
                  hidden
                  @change=${this._toggleDark}
                  ?checked=${this._darkMode}
                />
                <svg class="icon" id="theme-icon" xmlns="http://www.w3.org/2000/svg">
                  <use href="/icons/organization.svg#${icon}"></use>
                </svg>
              </label>
            </li>
            <li><a href="/app/edit"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-log"></use></svg></a></li>
            <li><a href="calendar.html"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-calender"></use></svg></a></li>
            <li><a href="/app/announcements"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-notifications"></use></svg></a></li>
            <div class="auth-control">
            ${this._authenticated
                ? html`<button @click=${this._onSignOut}>Sign Out (${this._username})</button>`
                : html`<a href="/login.html">Sign In</a>`}
            </div>
          </ul>
        </nav>
      </header>
    `;
  }

  static styles = css`
    header {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: rgba(0, 56, 49, 1);
        color: rgba(255, 227, 149, 1);
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family: 'Poppins', 'Arial Black', 'Impact', sans-serif;
        font-weight: 700;
    }

    nav ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .icon {
        display: inline;
        height: 2em;
        width: 2em;
        vertical-align: top;
        fill: rgba(255, 227, 149, 1);
    }

    .home a, 
    .auth-control a,
    .auth-control button {
      font-family: "Bebas Neue", sans-serif;
      color: rgba(255, 227, 149, 1);
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: none;
      padding: 8px;
      border-radius: 4px;
      transition: background 0.2s;
      font-size: larger;
    }
  `;
}
