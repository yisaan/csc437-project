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
      }

      caption {
        caption-side: top;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      th {
        padding: 10px 20px;
        text-align: left;
        border-bottom: 2px solid #ccc;
      }

      tbody tr:nth-child(even) {
        background: #fafafa;
      }

      tbody tr:hover {
        background: #e3f2fd;
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