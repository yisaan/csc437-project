import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import reset from './styles/reset.css.ts';
import './playerrow.ts'; 
import { Auth, Observer } from "@calpoly/mustang";

interface Player {
  name:   string;
  rank:   number;
  year:   string;
  points: number;
}

export class PlayerTableElement extends LitElement {
  @property({ type: String }) src = '';

  @state() private players: Player[] = [];

  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this.src) this.hydrate(this.src);
    });
  }

  get authorization() {
    if ( this._user?.authenticated ) 
      return {
        Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      };
    else
      return undefined;
  }

  static styles = [
    reset.styles,
    css` 
      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        font-family: "Bebas Neue", 'Poppins', sans-serif;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      }
  
      th {
        padding: 14px 20px;
        font-size: large;
        color: #666;
        font-weight: 600;
        text-align: left;
        background-color:rgb(233, 233, 233);
        border-bottom: 2px solid #eee;
        color: rgb(100, 100, 100);
      }
  
      th:nth-child(1), th:nth-child(2) {
        text-align: left;
      }
  
      th:nth-child(4), th:nth-child(3) {
        text-align: right;
      }
  
      caption {
        caption-side: top;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
  
      tbody tr:nth-child(even) {
        background-color: #fcfcfc;
      }
    `
  ];

  private async hydrate(src: string) {
    try {
      const res = await fetch(src, { headers: this.authorization });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.players = await res.json();
    } catch (e) {
      console.error('Failed to load player data:', e);
    }
  }

  render() {
    return html`
      <table>
        <thead>
          <tr>
            <th>Rank</th><th>Name</th><th>Year</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          ${this.players.map(
            p => html`
              <player-ranking
                rank="${p.rank}"
                year="${p.year}"
                points="${p.points}"
              >
                ${p.name}
              </player-ranking>
            `
          )}
        </tbody>
      </table>
    `;
  }
}