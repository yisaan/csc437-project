import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "../styles/reset.css.ts";

export class PlayerRowElement extends LitElement {
    @property({ type: Number }) rank = 0;
    @property({ type: String }) year = '';
    @property({ type: Number }) points = 0;

    override render() {
        return html`
            <td class="rank">${this.rank}</td>
            <td><slot></slot></td>
            <td class="year">${this.year}</td>
            <td class="points">${this.points}</td>
        `;
    }

    static styles = [
        reset.styles,
        css`
          :host {
            display: table-row;
            transition: background-color 0.15s ease-in-out;
          }
      
          td {
            padding: 14px 20px;
            font-size: large;
            border-bottom: 1px solid #eee;
            vertical-align: middle;
          }
      
          td.rank {
            font-weight: bold;
            color: #007bff;
            text-align: left;
          }
      
          td:nth-child(2) {
            font-weight: 600;
            text-align: left;
            color: rgb(60, 60, 60);
          }
      
          td.year {
            color: rgb(60, 60, 60);
            text-align: right;
          }
      
          td.points {
            font-weight: 700;
            text-align: right;
            color: rgb(60, 60, 60);
          }
      
          :host(:hover) {
            background-color: #f1f5f9;
          }
        `
    ];
      
}