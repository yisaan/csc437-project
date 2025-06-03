import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.js";

interface LoginFormData {
  username?: string;
  password?: string;
}

export class LoginFormElement extends LitElement {

  @state()
  formData: LoginFormData = {};

  @property()
  api?: string;

  @property()
  redirect: string = "/";

  @state()
  error?: string;

  get canSubmit(): boolean {
    return Boolean(this.api && this.formData.username &&
      this.formData.password);
  }

  handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target?.name;
    const value = target?.value;
    const prevData = this.formData;
  
    switch (name) {
      case "username":
        this.formData = { ...prevData, username: value };
        break;
      case "password":
        this.formData = { ...prevData, password: value };
        break;
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();

    if (this.canSubmit) {
      fetch(
        this?.api || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.formData)
        }
      )
      .then((res) => {
        if (res.status !== 200)
          throw "Login failed";
        else return res.json();
      })
      .then((json: object) => {
          const { token } = json as { token: string };
          const customEvent = new CustomEvent(
          'auth:message', {
          bubbles: true,
          composed: true,
          detail: [
              'auth/signin',
              { token, redirect: this.redirect }
          ]
          });
          console.log("dispatching message", customEvent);
          this.dispatchEvent(customEvent);
      })
      .catch((error: Error) => {
          console.log(error);
          this.error = error.toString();
      });
    }
  }

  override render() {
    return html`
            <form
                @input=${(e: InputEvent) => this.handleChange(e)}
                @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
            >
                <h2>LOGIN</h2>
                <slot></slot>
                <slot name="button">
                <button
                    ?disabled=${!this.canSubmit}
                    type="submit">
                    GO
                </button>
                </slot>
                <p class="error">${this.error}</p>
                <a class="register" href="newuser.html">Sign up as a new user</a>
            </form>
    `;
  }

  static styles = [
    reset.styles,
    css`
        :host {
            display: block;
            max-width: 360px;
            margin: 3rem auto;
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            font-family: 'Poppins', sans-serif;
        }

        h2 {
            margin: 0 0 1.5rem;
            color: rgba(0, 56, 49, 1);
            font-size: 1.5rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-align: center;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        button {
            margin-top: 1rem;
            background: rgba(0, 56, 49, 1);
            color: #fff;
            border: none;
            border-radius: 2rem;
            padding: 0.75rem;
            font-size: 1rem;
            text-transform: uppercase;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(0, 56, 50, 0.22);
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .error:not(:empty) {
            margin-top: 1rem;
            color: red;
            border: 1px solid red;
            padding: 0.5rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-family: "Poppins", sans-serif;
        }

        .register {
            display: block;
            margin-top: 1rem;
            text-align: center;
            font-size: 0.85rem;
            color: #555;
            text-decoration: none;
        }

        .register:hover {
            text-decoration: underline;
        }
    `
  ];


  // more to come...
}