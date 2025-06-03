import {
    Auth,
    define,
    History,
    Switch
  } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { AppHeader } from "./components/header";
import { PlayerTableElement } from "./components/playertable";
import { PlayerRowElement } from "./components/playerrow";

import "./views/home-view";

const routes: Switch.Route[] = [
    {
        auth: "protected",
        path: "/app",
        view: () => html`<home-view></home-view>`
    },
    {
        path: "/",
        redirect: "/app"
    }
];

define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "app-header": AppHeader,
    "player-ranking": PlayerRowElement,
    "player-table": PlayerTableElement,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "app:history", "app:auth");
        }
    }
});