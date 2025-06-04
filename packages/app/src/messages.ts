import { Player, Credential } from "server/models";

export type Msg =
  // ─────────── Player list loading ───────────
  | ["players/load",    { gender: Player["gender"] }]
  | ["players/loadSuccess", { players: Player[] }]
  | ["players/loadFailure", { error: string }]

  // ───────────── Player selection ─────────────
  | ["player/select",   { name: string }]
  | ["player/clear",    {}]

  // ─────────────── Auth messages ───────────────
  | ["auth/login",      { username: string; password: string }]
  | ["auth/logout",     {}]
  | ["auth/loginSuccess", { credential: Credential }]
  | ["auth/loginFailure", { error: string }];
