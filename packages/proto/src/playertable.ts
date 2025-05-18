import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import reset from './styles/reset.css.ts';
import './playerrow.ts';  

interface Player {
  name:   string;
  rank:   number;
  year:   string;
  points: number;
}

export class PlayerTableElement extends LitElement {
  @property({ type: String }) src = '';

  @state() private players: Player[] = [];

  static styles = [
    reset.styles,
    css` 
      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      }
  
      th {
        padding: 14px 20px;
        font-size: 14px;
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
  

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  private async hydrate(src: string) {
    try {
      const res = await fetch(src);
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

import { define } from '@calpoly/mustang';
define({ 'player-table': PlayerTableElement });