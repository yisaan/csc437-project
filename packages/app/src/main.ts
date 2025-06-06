import {
    Auth,
    define,
    History,
    Switch,
    Store
  } from "@calpoly/mustang";
import { html } from "lit";
import { AppHeader } from "./components/header";
import { PlayerTableElement } from "./components/playertable";
import { PlayerRowElement } from "./components/playerrow";
import "./components/announcement-list"

import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";

import "./views/home-view";
import "./views/player-edit-view";
import "./views/announcements-view.ts"; 
import { AnnouncementListElement } from "./components/announcement-list";

const routes: Switch.Route[] = [
    {
        auth: "protected",
        path: "/app",
        view: () => html`<home-view></home-view>`
    },
    {   
        auth: "protected",
        path: "/app/announcements", 
        view: () => html`<announcements-view></announcements-view>`
    },
    {
        auth: "protected",
        path: "/app/edit",
        view: () => html`<player-edit-view></player-edit-view>`
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
    "announcement-list": AnnouncementListElement,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "app:history", "app:auth");
        }
    },
    "mu-store": class AppStore
        extends Store.Provider<Model, Msg>
    {
        constructor() {
            super(update, init, "app:auth");
        }
    }
});