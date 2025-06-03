import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../components/playertable"; 

@customElement("home-view")
export class HomeView extends LitElement {
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

  @state() private showMen = true;

  private showMenTable() {
    this.showMen = true;
  }

  private showWomenTable() {
    this.showMen = false;
  }

  override render() {
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
          <player-table
            src="/api/players/men"
            style="display: ${this.showMen ? "block" : "none"};"
          ></player-table>
          <player-table
            src="/api/players/women"
            style="display: ${this.showMen ? "none" : "block"};"
          ></player-table>
        </section>
      </div>
    `;
  }
}
