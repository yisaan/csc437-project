import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { View } from "@calpoly/mustang";
import type { Msg } from "../messages";
import type { Model } from "../model";
import "../components/playertable"; 

@customElement("home-view")
export class HomeView extends View<Model, Msg> {
    @state() private showMen = true;

    constructor() {
        // “app:store” must match the provides on your <mu-store> in index.html
        super("app:model");
    }

    override firstUpdated() {
        // When the view first appears, dispatch a load for men’s list:
        this.dispatchMessage(["players/load", { gender: "men" }]);
      }
    
      private showMenTable() {
        this.showMen = true;
        this.dispatchMessage(["players/load", { gender: "men" }]);
      }
    
      private showWomenTable() {
        this.showMen = false;
        this.dispatchMessage(["players/load", { gender: "women" }]);
      }

    static styles = css`
        .content {
        padding: 15px; 
        }
        
        .filter-bar button {
            padding: 10px 16px;
            margin-right: 8px;
            font-weight: bold;
            border: 2px solid #1e2b4e;
            background: white;
            color: #1e2b4e;
            cursor: pointer;
            border-radius: 6px;
            font-family: "Bebas Neue", sans-serif;
            font-size: larger;
        }
        
        .filter-bar button.active {
            background: #1e2b4e;
            color: white;
        }

        .filter-bar {
            display: flex;
            margin-bottom: 16px;
            justify-content: center;
            gap: 12px;
        }
    `;

    override render() {

        const list = this.model.playersList ?? [];
        console.log("home-view render sees list:", list);
        return html`
        <div class="content">
            <section class="filter-bar">
            <button
                class=${this.showMen ? "active" : ""}
                @click=${this.showMenTable}
            >
                Men’s Rankings
            </button>
            <button
                class=${!this.showMen ? "active" : ""}
                @click=${this.showWomenTable}
            >
                Women’s Rankings
            </button>
            </section>

            <section>
            ${this.showMen
                ? html`<player-table .players=${list}></player-table>`
                : html`<player-table .players=${list}></player-table>`}
            </section>
        </div>
        `;
    }
}
