// packages/app/src/views/player-edit-view.ts

import { html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { View, Form, History, define } from "@calpoly/mustang";
import type { Model } from "../model";
import type { Msg } from "../messages";

// First, register <mu-form> so you can use it in your template:
const _uses = define({
  "mu-form": Form.Element,
});

// Now define your custom element:
@customElement("player-edit-view")
export class PlayerEditView extends View<Model, Msg> {
  // “app:model” must match <mu-store provides="app:model"> in index.html
  constructor() {
    super("app:model");
  }

  // If you want to pre-fill the “edit” form with a particular player’s current data,
  // you might use a query parameter (e.g. /app/edit?name=Alon). For simplicity, we’ll just
  // edit any name you type in; no auto‐fill.

  // Local state to hold any error message from create/save
  @state() private editError: string | null = null;
  @state() private createError: string | null = null;

  // ------------------------------------------------------
  // 1) Handler for “Edit Existing Player” form submission
  // ------------------------------------------------------
  private handleEditSubmit(event: Form.SubmitEvent<{ name: string; points: number; year?: string }>) {
    event.preventDefault();
    const formData = event.detail; 
    const { name, points, year } = formData;

    this.dispatchMessage([
      "player/save",
      {
        name,
        points,
        year, // if user left blank, we’ll skip updating
        onSuccess: () => {
          // After successful save, navigate back to /app (rankings page)
          History.dispatch(this, "history/navigate", { href: "/app" });
        },
        onFailure: (err) => {
          this.editError = `Failed to save: ${err.message}`;
        },
      },
    ]);
  }

  // ------------------------------------------------------
  // 2) Handler for “Create New Player” form submission
  // ------------------------------------------------------
  private handleCreateSubmit(event: Form.SubmitEvent<{ name: string; year: string; gender: "men" | "women" }>) {
    event.preventDefault();
    const formData = event.detail;
    const { name, year, gender } = formData;

    this.dispatchMessage([
      "player/create",
      {
        name,
        year,
        gender,
        onSuccess: () => {
          // After successful creation, redirect back to /app
          History.dispatch(this, "history/navigate", { href: "/app" });
        },
        onFailure: (err) => {
          this.createError = `Failed to create: ${err.message}`;
        },
      },
    ]);
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 400px;
      margin: 2rem auto;
      font-family: Poppins, sans-serif;
    }
    .card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: "Bebas Neue", sans-serif;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    label {
      display: flex;
      flex-direction: column;
      font-size: 0.95rem;
      font-weight: 500;
      width: 100%;
    }
    input, select {
      margin: 0.5rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      font-family: "Bebas Neue", sans-serif;
    }

    button {
      background: #1e2b4e;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      width: 120px;
      align-self: flex-start;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    mu-form > form > button[type="submit"] {
    background: #1e2b4e;
    color: white;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
    font-family: Poppins, sans-serif;
    align-self: center;
    transition: background 0.2s ease-in-out;
    }

    mu-form > form > button[type="submit"]:hover {
    background: #2c3e70;
    }


    .error {
      color: red;
      font-size: 0.9rem;
    }
    h2 {
        text-align: center;
        font-family: "Bebas Neue", sans-serif;
        font-size: xx-large;
    }
  `;

  override render() {
    return html`
      <div class="container">
        <div class="card">
          <h2>Edit Existing Player</h2>
          <mu-form @mu-form:submit=${(e: any) => this.handleEditSubmit(e)}>
            <label>
              Player Name
              <input
                name="name"
                type="text"
                placeholder="Current player name"
                .value=${""}
                required
              />
            </label>

            <!-- points (number) -->
            <label>
              Points
              <input
                name="points"
                type="number"
                placeholder="e.g. 5"
                required
              />
            </label>

            <!-- optional year change -->
            <label>
              Year 
              <input
                name="year"
                type="text"
                placeholder="e.g. 3rd"
              />
            </label>


            ${this.editError
              ? html`<div class="error">${this.editError}</div>`
              : ""}
          </mu-form>
        </div>

        <div class="card">
          <h2>Create New Player</h2>
          <mu-form @mu-form:submit=${(e: any) => this.handleCreateSubmit(e)}>
            <!-- name (text) -->
            <label>
              Player Name
              <input
                name="name"
                type="text"
                placeholder="New player name"
                required
              />
            </label>

            <!-- year (text) -->
            <label>
              Year
              <input
                name="year"
                type="text"
                placeholder="e.g. 1st, 2nd, etc."
                required
              />
            </label>

            <!-- gender (select) -->
            <label>
              Gender
              <select name="gender" required>
                <option value="" disabled selected>Select gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </label>

            ${this.createError
              ? html`<div class="error">${this.createError}</div>`
              : ""}
          </mu-form>
        </div>
      </div>
    `;
  }
}
