// packages/app/src/update.ts
import { Auth, Update } from "@calpoly/mustang";
import type { Msg } from "./messages";
import type { Model } from "./model";
import { Player } from "server/models";

/**
 * The update function receives:
 *  - message: one of the Msg tuples from messages.ts
 *  - apply:    a function that lets us update the Model atomically
 *  - user:     the current Auth.User (or an unauthenticated user) from mu-auth
 */
export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  const [tag, payload] = message;

  switch (tag) {
    // ───────────────────────────────────────────────────────────────
    // 1) LOAD A LIST OF PLAYERS (men or women)
    // ───────────────────────────────────────────────────────────────
    case "players/load": {
      const { gender } = payload;

      console.log("DISPATCHED players/load for gender →", gender);


      fetch(`/api/players/${gender}`, {
        // Must use the auth token if the endpoint is protected:
        headers: Auth.headers(user)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          return res.json();
        })
        .then((playersList: unknown) => {
          // We trust that the server returned Player[]:

          console.log("FETCHED playersList →", playersList); 

          apply((model) => ({
            ...model,
            playersList: playersList as any // cast to Player[]
          }));
          // Optionally, you could also dispatch a "players/loadSuccess" Msg,
          // but since we already know the data, we can just store it directly.
        })
        .catch((err: Error) => {
          console.error("Failed to load players:", err);
          apply((model) => ({
            ...model
            // you could also store an 'error' field in the model if desired
          }));
        });
      break;
    }

    // ───────────────────────────────────────────────────────────────
    // 2) SELECT A SINGLE PLAYER (e.g. to show details)
    // ───────────────────────────────────────────────────────────────
    case "player/select": {
      const { name } = payload;
      apply((model) => {
        // Find the player from the current playersList in the Model
        const found = model.playersList?.find((p) => p.name === name);
        return {
          ...model,
          selectedPlayer: found
        };
      });
      break;
    }

    // If you ever want a "clear selected player" operation:
    case "player/clear": {
      apply((model) => ({
        ...model,
        selectedPlayer: undefined
      }));
      break;
    }

    // player/save
    case "player/save": {
        const {
          name,
          points,
          year, // this might be undefined if user left the “year” input blank
          onSuccess,
          onFailure,
        } = payload as {
          name: string;
          points: number;
          year?: string;
          onSuccess?: () => void;
          onFailure?: (err: Error) => void;
        };
  
        // Build a “updates” object that only includes fields actually passed in:
        const updates: Partial<{ points: number; year: string }> = { points };
        if (typeof year === "string" && year.trim() !== "") {
          updates.year = year.trim();
        }
  
        fetch(`/api/players/${encodeURIComponent(name)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user),
          },
          body: JSON.stringify(updates),
        })
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
          .then((updatedPlayer: Player) => {
            // Re‐rank locally (though GET /api/players will do it too next time):
            apply((model) => {
              const oldList = model.playersList ?? [];
              const patchedList = oldList.map((p) =>
                p.name === name
                  ? { ...p, points: updatedPlayer.points, year: updatedPlayer.year }
                  : p
              );
              // Resort by points descending
              patchedList.sort((a, b) => b.points - a.points);
              // Re‐assign ranks
              const reRanked: Player[] = patchedList.map((p, i) => ({
                ...p,
                rank: i + 1,
              }));
  
              return {
                ...model,
                playersList: reRanked,
                selectedPlayer: reRanked.find((p) => p.name === name),
              };
            });
  
            if (onSuccess) onSuccess();
          })
          .catch((err: Error) => {
            console.error("Failed to save player:", err);
            if (onFailure) onFailure(err);
          });
        break;
      }

      case "player/create": {
        const {
          name,
          year,
          gender,
          onSuccess,
          onFailure,
        } = payload as {
          name: string;
          year: string;
          gender: "men" | "women";
          onSuccess?: () => void;
          onFailure?: (err: Error) => void;
        };
  
        fetch(`/api/players`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user),
          },
          body: JSON.stringify({ name, year, gender }),
        })
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
          .then((newPlayer: Player) => {
            // After we create, immediately reload the entire list so it arrives sorted+ranked
            fetch(`/api/players/${gender}`, {
              headers: Auth.headers(user),
            })
              .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
              })
              .then((playersList: Player[]) => {
                apply((model) => ({
                  ...model,
                  playersList,
                }));
                if (onSuccess) onSuccess();
              })
              .catch((err: Error) => {
                console.error("Error after create, reloading list:", err);
                if (onFailure) onFailure(err);
              });
          })
          .catch((err: Error) => {
            console.error("Failed to create player:", err);
            if (onFailure) onFailure(err);
          });
        break;
      }
      
      
      
      

    // ───────────────────────────────────────────────────────────────
    // 3) AUTHENTICATION (login/logout)
    // ───────────────────────────────────────────────────────────────
    case "auth/login": {
      const { username, password } = payload;
      fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })
        .then((res) => {
          if (!res.ok) throw new Error("Login failed");
          return res.json();
        })
        .then((json: any) => {
          // We expect the server to return { token: string, username, ... }
          const credential = json as any; // or cast to Credential if that matches
          // Update the model’s credential field:
          apply((model) => ({
            ...model,
            credential
          }));
        })
        .catch((err: Error) => {
          console.error("Login error:", err);
          // You could set an 'authError' in the Model if you want to show it in the UI
          apply((model) => ({
            ...model
            // maybe: authError: err.message
          }));
        });
      break;
    }

    case "auth/logout": {
      // Simply clear out the stored credential
      apply((model) => ({
        ...model,
        credential: undefined
      }));
      break;
    }

    default:
      // If you add more Msg variants later, handle them here.
      throw new Error(`Unhandled message type: ${tag}`);
  }
}
