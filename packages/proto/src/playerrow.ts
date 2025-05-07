import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

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

            td.rank {
                width: 4ch;
                text-align: center;
                font-weight: bold;
                color: #1e88e5;
                font-size: 15px;
            }

            td.year {
                text-align: center;
                color: #555;
            }
            td.points {
                text-align: center;
                font-weight: 600;
            }

            td {
                padding: 10px 20px;
                border-bottom: 1px solid #ddd;
            }


            :host(:hover) {
                background-color: #e2e8f0;
            }

            td:nth-child(2) {
                font-weight: 600;
            }
        `
    ];
}