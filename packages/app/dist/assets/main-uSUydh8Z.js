import{i as E,O as D,x as d,a as v,r as m,b as F,n as $,c as b,V as L,d as B,f as I,h as P,s as A,_ as U}from"./reset.css-DIuvxJHl.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=a=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)};var V=Object.defineProperty,O=(a,e,o,n)=>{for(var t=void 0,r=a.length-1,s;r>=0;r--)(s=a[r])&&(t=s(e,o,t)||t);return t&&V(e,o,t),t};const z=class z extends E{constructor(){super(...arguments),this._authObserver=new D(this,"app:auth"),this._authenticated=!1,this._darkMode=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var o,n;this._authenticated=!!((o=e.user)!=null&&o.authenticated),this._username=(n=e.user)==null?void 0:n.username})}_toggleDark(e){const o=e.target.checked;this._darkMode=o,document.body.classList.toggle("dark-mode",o)}_onSignOut(){this.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]}))}render(){const e=this._darkMode?"icon-lightmode":"icon-darkmode";return d`
      <header>
        <nav>
          <ul>
            <div class="home">
                <a href="/app">Cal Poly Pickleball</a>
            </div>
            <li>
              <label id="darkmode-toggle">
                <input
                  type="checkbox"
                  hidden
                  @change=${this._toggleDark}
                  ?checked=${this._darkMode}
                />
                <svg class="icon" id="theme-icon" xmlns="http://www.w3.org/2000/svg">
                  <use href="/icons/organization.svg#${e}"></use>
                </svg>
              </label>
            </li>
            <li><a href="/app/edit"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-log"></use></svg></a></li>
            <li><a href="calendar.html"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-calender"></use></svg></a></li>
            <li><a href="notifications.html"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-notifications"></use></svg></a></li>
            <div class="auth-control">
            ${this._authenticated?d`<button @click=${this._onSignOut}>Sign Out (${this._username})</button>`:d`<a href="/login.html">Sign In</a>`}
            </div>
          </ul>
        </nav>
      </header>
    `}};z.styles=v`
    header {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: rgba(0, 56, 49, 1);
        color: rgba(255, 227, 149, 1);
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family: 'Poppins', 'Arial Black', 'Impact', sans-serif;
        font-weight: 700;
    }

    nav ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .icon {
        display: inline;
        height: 2em;
        width: 2em;
        vertical-align: top;
        fill: rgba(255, 227, 149, 1);
    }

    .home a, 
    .auth-control a,
    .auth-control button {
      font-family: "Bebas Neue", sans-serif;
      color: rgba(255, 227, 149, 1);
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: none;
      padding: 8px;
      border-radius: 4px;
      transition: background 0.2s;
      font-size: larger;
    }
  `;let f=z;O([m()],f.prototype,"_authenticated");O([m()],f.prototype,"_username");O([m()],f.prototype,"_darkMode");var W=Object.defineProperty,S=(a,e,o,n)=>{for(var t=void 0,r=a.length-1,s;r>=0;r--)(s=a[r])&&(t=s(e,o,t)||t);return t&&W(e,o,t),t};const C=class C extends E{constructor(){super(...arguments),this.rank=0,this.year="",this.points=0}render(){return d`
            <td class="rank">${this.rank}</td>
            <td><slot></slot></td>
            <td class="year">${this.year}</td>
            <td class="points">${this.points}</td>
        `}};C.styles=[F.styles,v`
          :host {
            display: table-row;
            transition: background-color 0.15s ease-in-out;
          }
      
          td {
            padding: 14px 20px;
            font-size: large;
            border-bottom: 1px solid #eee;
            vertical-align: middle;
          }
      
          td.rank {
            font-weight: bold;
            color: #007bff;
            text-align: left;
          }
      
          td:nth-child(2) {
            font-weight: 600;
            text-align: left;
            color: rgb(60, 60, 60);
          }
      
          td.year {
            color: rgb(60, 60, 60);
            text-align: right;
          }
      
          td.points {
            font-weight: 700;
            text-align: right;
            color: rgb(60, 60, 60);
          }
      
          :host(:hover) {
            background-color: #f1f5f9;
          }
        `];let g=C;S([$({type:Number})],g.prototype,"rank");S([$({type:String})],g.prototype,"year");S([$({type:Number})],g.prototype,"points");var J=Object.defineProperty,R=(a,e,o,n)=>{for(var t=void 0,r=a.length-1,s;r>=0;r--)(s=a[r])&&(t=s(e,o,t)||t);return t&&J(e,o,t),t};const T=class T extends E{constructor(){super(...arguments),this.players=[],this._authObserver=new D(this,"app:auth")}get authorization(){var e;if((e=this._user)!=null&&e.authenticated)return{Authorization:`Bearer ${this._user.token}`}}render(){return d`
      <table>
        <thead>
          <tr>
            <th>Rank</th><th>Name</th><th>Year</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          ${this.players.map(e=>d`
              <player-ranking
                rank="${e.rank}"
                year="${e.year}"
                points="${e.points}"
              >
                ${e.name}
              </player-ranking>
            `)}
        </tbody>
      </table>
    `}};T.styles=[F.styles,v` 
      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        font-family: "Bebas Neue", 'Poppins', sans-serif;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      }
  
      th {
        padding: 14px 20px;
        font-size: large;
        color: #666;
        font-weight: 600;
        text-align: left;
        background-color:rgb(233, 233, 233);
        border-bottom: 2px solid #eee;
        color: rgb(100, 100, 100);
      }
  
      th:nth-child(1), th:nth-child(2) {
        text-align: left;
      }
  
      th:nth-child(4), th:nth-child(3) {
        text-align: right;
      }
  
      caption {
        caption-side: top;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
  
      tbody tr:nth-child(even) {
        background-color: #fcfcfc;
      }
    `];let x=T;R([$({type:Array})],x.prototype,"players");const Y={};function G(a,e,o){const[n,t]=a;switch(n){case"players/load":{const{gender:r}=t;console.log("DISPATCHED players/load for gender →",r),fetch(`/api/players/${r}`,{headers:b.headers(o)}).then(s=>{if(!s.ok)throw new Error(`HTTP ${s.status}`);return s.json()}).then(s=>{console.log("FETCHED playersList →",s),e(i=>({...i,playersList:s}))}).catch(s=>{console.error("Failed to load players:",s),e(i=>({...i}))});break}case"player/select":{const{name:r}=t;e(s=>{var c;const i=(c=s.playersList)==null?void 0:c.find(h=>h.name===r);return{...s,selectedPlayer:i}});break}case"player/clear":{e(r=>({...r,selectedPlayer:void 0}));break}case"player/save":{const{name:r,points:s,year:i,onSuccess:c,onFailure:h}=t,p={points:s};typeof i=="string"&&i.trim()!==""&&(p.year=i.trim()),fetch(`/api/players/${encodeURIComponent(r)}`,{method:"PUT",headers:{"Content-Type":"application/json",...b.headers(o)},body:JSON.stringify(p)}).then(l=>{if(!l.ok)throw new Error(`HTTP ${l.status}`);return l.json()}).then(l=>{e(w=>{const j=(w.playersList??[]).map(u=>u.name===r?{...u,points:l.points,year:l.year}:u);j.sort((u,_)=>_.points-u.points);const N=j.map((u,_)=>({...u,rank:_+1}));return{...w,playersList:N,selectedPlayer:N.find(u=>u.name===r)}}),c&&c()}).catch(l=>{console.error("Failed to save player:",l),h&&h(l)});break}case"player/create":{const{name:r,year:s,gender:i,onSuccess:c,onFailure:h}=t;fetch("/api/players",{method:"POST",headers:{"Content-Type":"application/json",...b.headers(o)},body:JSON.stringify({name:r,year:s,gender:i})}).then(p=>{if(!p.ok)throw new Error(`HTTP ${p.status}`);return p.json()}).then(p=>{fetch(`/api/players/${i}`,{headers:b.headers(o)}).then(l=>{if(!l.ok)throw new Error(`HTTP ${l.status}`);return l.json()}).then(l=>{e(w=>({...w,playersList:l})),c&&c()}).catch(l=>{console.error("Error after create, reloading list:",l),h&&h(l)})}).catch(p=>{console.error("Failed to create player:",p),h&&h(p)});break}case"auth/login":{const{username:r,password:s}=t;fetch("/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r,password:s})}).then(i=>{if(!i.ok)throw new Error("Login failed");return i.json()}).then(i=>{const c=i;e(h=>({...h,credential:c}))}).catch(i=>{console.error("Login error:",i),e(c=>({...c}))});break}case"auth/logout":{e(r=>({...r,credential:void 0}));break}default:throw new Error(`Unhandled message type: ${n}`)}}var K=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,H=(a,e,o,n)=>{for(var t=n>1?void 0:n?Q(e,o):e,r=a.length-1,s;r>=0;r--)(s=a[r])&&(t=(n?s(e,o,t):s(t))||t);return n&&t&&K(e,o,t),t};let k=class extends L{constructor(){super("app:model"),this.showMen=!0}firstUpdated(){this.dispatchMessage(["players/load",{gender:"men"}])}showMenTable(){this.showMen=!0,this.dispatchMessage(["players/load",{gender:"men"}])}showWomenTable(){this.showMen=!1,this.dispatchMessage(["players/load",{gender:"women"}])}render(){const a=this.model.playersList??[];return console.log("home-view render sees list:",a),d`
        <div class="content">
            <section class="filter-bar">
            <button
                class=${this.showMen?"active":""}
                @click=${this.showMenTable}
            >
                Men’s Rankings
            </button>
            <button
                class=${this.showMen?"":"active"}
                @click=${this.showWomenTable}
            >
                Women’s Rankings
            </button>
            </section>

            <section>
            ${this.showMen?d`<player-table .players=${a}></player-table>`:d`<player-table .players=${a}></player-table>`}
            </section>
        </div>
        `}};k.styles=v`
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
    `;H([m()],k.prototype,"showMen",2);k=H([q("home-view")],k);var X=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,M=(a,e,o,n)=>{for(var t=n>1?void 0:n?Z(e,o):e,r=a.length-1,s;r>=0;r--)(s=a[r])&&(t=(n?s(e,o,t):s(t))||t);return n&&t&&X(e,o,t),t};B({"mu-form":I.Element});let y=class extends L{constructor(){super("app:model"),this.editError=null,this.createError=null}handleEditSubmit(a){a.preventDefault();const e=a.detail,{name:o,points:n,year:t}=e;this.dispatchMessage(["player/save",{name:o,points:n,year:t,onSuccess:()=>{P.dispatch(this,"history/navigate",{href:"/app"})},onFailure:r=>{this.editError=`Failed to save: ${r.message}`}}])}handleCreateSubmit(a){a.preventDefault();const e=a.detail,{name:o,year:n,gender:t}=e;this.dispatchMessage(["player/create",{name:o,year:n,gender:t,onSuccess:()=>{P.dispatch(this,"history/navigate",{href:"/app"})},onFailure:r=>{this.createError=`Failed to create: ${r.message}`}}])}render(){return d`
      <div class="container">
        <div class="card">
          <h2>Edit Existing Player</h2>
          <mu-form @mu-form:submit=${a=>this.handleEditSubmit(a)}>
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


            ${this.editError?d`<div class="error">${this.editError}</div>`:""}
          </mu-form>
        </div>

        <div class="card">
          <h2>Create New Player</h2>
          <mu-form @mu-form:submit=${a=>this.handleCreateSubmit(a)}>
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

            ${this.createError?d`<div class="error">${this.createError}</div>`:""}
          </mu-form>
        </div>
      </div>
    `}};y.styles=v`
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
  `;M([m()],y.prototype,"editError",2);M([m()],y.prototype,"createError",2);y=M([q("player-edit-view")],y);const ee=[{auth:"protected",path:"/app",view:()=>d`<home-view></home-view>`},{auth:"protected",path:"/app/edit",view:()=>d`<player-edit-view></player-edit-view>`},{path:"/",redirect:"/app"}];B({"mu-auth":b.Provider,"mu-history":P.Provider,"app-header":f,"player-ranking":g,"player-table":x,"mu-switch":class extends U.Element{constructor(){super(ee,"app:history","app:auth")}},"mu-store":class extends A.Provider{constructor(){super(G,Y,"app:auth")}}});
