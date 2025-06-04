import { Player, Credential } from "server/models";

export interface Model {
  playersList?: Player[];

  selectedPlayer?: Player;

  credential?: Credential;
}

export const init: Model = {};
