import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import reset from '../styles/reset.css.ts';
import './playerrow.ts'; 
import { Auth, Observer } from "@calpoly/mustang";
import { Player } from "server/models";


export class PlayerTableElement extends LitElement {
  @property({ type: Array }) players: Player[] = [];


  _authObserver = new Observer<Auth.Model>(this, "app:auth");
  _user?: Auth.User;


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