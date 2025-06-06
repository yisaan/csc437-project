// packages/app/src/components/announcement-list.ts

import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";

export interface Announcement {
  content: string;
  date: string;      // ISO‐string format from server
  createdAt: string; // ISO‐string format
  createdBy: string;
}

export class AnnouncementListElement extends LitElement {
  // Add explicit types to each @state
  @state()
  announcements: Announcement[] = []; // array of Announcement

  @state()
  newContent: string = ""; // the textarea’s content

  @state()
  newDate: string = ""; // the date chosen (YYYY-MM-DD)

  @state()
  errorMsg: string = "";

  get canPost(): boolean {
    return (
      this.newContent.trim().length > 0 && this.newDate.trim().length > 0
    );
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.fetchAnnouncements();
  }

  private async fetchAnnouncements(): Promise<void> {
    try {
      const res = await fetch("/api/announcements", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const data: Announcement[] = await res.json();
      this.announcements = data;
    } catch (err) {
      console.error("Error fetching announcements:", err);
      this.errorMsg = "Could not load announcements.";
    }
  }

  // Cast e.target to HTMLTextAreaElement
  private handleContentInput(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    this.newContent = target.value;
  }

  // Cast e.target to HTMLInputElement
  private handleDateInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.newDate = target.value; // e.g. "2025-06-15"
  }

  private async handlePost(e: Event): Promise<void> {
    e.preventDefault();
    this.errorMsg = "";

    const token = localStorage.getItem("token") || "";

    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          content: this.newContent.trim(),
          date: this.newDate       // exactly “YYYY-MM-DD”
        })
      });

      if (res.status === 401) {
        throw new Error("You must be logged in to post.");
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error: ${text || res.status}`);
      }
      // Success: clear form and reload
      this.newContent = "";
      this.newDate = "";
      await this.fetchAnnouncements();
    } catch (err: any) {
      console.error("Error posting announcement:", err);
      this.errorMsg = err.message || "Post failed";
    }
  }

  override render() {
    return html`
      <form @submit=${this.handlePost}>
        <label>
          <textarea
            placeholder="Type your announcement here..."
            rows="3"
            @input=${this.handleContentInput}
            .value=${this.newContent}
            style="width: 100%; padding:0.5rem; border-radius:4px; border:1px solid #ccc;"
          ></textarea>
        </label>

        <label style="margin-top: 0.5rem;">
          <input
            type="date"
            @input=${this.handleDateInput}
            .value=${this.newDate}
            style="padding:0.5rem; border-radius:4px; border:1px solid #ccc; width: 100%;"
          />
        </label>

        <button
          type="submit"
          ?disabled=${!this.canPost}
          style="
            background: rgba(0, 56, 49, 1);
            color: white;
            border: none;
            border-radius: 0.5rem;
            padding: 0.75rem 1.5rem;
            margin-top: 0.5rem;
            cursor: pointer;
          "
        >
          Post Announcement
        </button>
        <p class="error">${this.errorMsg}</p>
      </form>

      <hr style="margin: 1.5rem 0;" />

      <div>
        ${this.announcements.length === 0
          ? html`<p>No announcements yet.</p>`
          : html`
              <ul style="list-style: none; padding: 0;">
                ${this.announcements.map(
                  (a) => html`
                    <li
                      style="
                        background: #f8f8f8;
                        padding: 1rem;
                        border-radius: 0.5rem;
                        margin-bottom: 0.75rem;
                      "
                    >
                      <p style="margin: 0 0 0.5rem;">
                        ${a.content}
                      </p>
                      <small style="color: #666;">
                        <strong>Date:</strong>
                        ${new Date(a.date).toLocaleDateString()} &mdash;
                        <strong>Posted by:</strong> ${a.createdBy}
                      </small>
                    </li>
                  `
                )}
              </ul>
            `}
      </div>
    `;
  }

  static styles = css`
    :host {
        display: block;
        box-sizing: border-box;

        max-width: 800px;
        margin: 0 auto;

        padding: 0 1rem;
    }
    .error {
      color: red;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
  `;
}

customElements.define("announcement-list", AnnouncementListElement);
