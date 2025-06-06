// packages/app/src/views/announcements-view.ts

import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { View } from "@calpoly/mustang";
import type { Msg } from "../messages";
import type { Model } from "../model";

// Ensure that <announcement-list> is defined somewhere ahead of time:
import "../components/announcement-list.js";

/**
 * AnnouncementsView
 * -----------------
 * A simple Mustang View that renders our <announcement-list> component.
 */
@customElement("announcements-view")
export class AnnouncementsView extends View<Model, Msg> {
  constructor() {
    // Pass in the store token if you use a Mustang store; otherwise “unknown” is fine
    super("app:model");
  }

  // You can add any local styles if you’d like:
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    h2 {
      text-align: center;
      font-family: Poppins, sans-serif;
      color: rgba(0, 56, 49, 1);
      margin-bottom: 1rem;
    }
  `;

  // The render() method returns a Lit template:
  override render() {
    return html`
      <h2>Announcements</h2>
      <!-- This custom element was already defined in ../components/announcement-list.js -->
      <announcement-list></announcement-list>
    `;
  }
}
