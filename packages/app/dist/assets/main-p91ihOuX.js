import{i as m,O as $,x as l,a as g,r as b,b as P,n as f,c as M,V as z,d as C,s as j,_ as S,h as T}from"./reset.css-DlEgl60R.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=o=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};var E=Object.defineProperty,y=(o,e,a,n)=>{for(var t=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(t=s(e,a,t)||t);return t&&E(e,a,t),t};const k=class k extends m{constructor(){super(...arguments),this._authObserver=new $(this,"app:auth"),this._authenticated=!1,this._darkMode=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var a,n;this._authenticated=!!((a=e.user)!=null&&a.authenticated),this._username=(n=e.user)==null?void 0:n.username})}_toggleDark(e){const a=e.target.checked;this._darkMode=a,document.body.classList.toggle("dark-mode",a)}_onSignOut(){this.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]}))}render(){const e=this._darkMode?"icon-lightmode":"icon-darkmode";return l`
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
            <li><a href="log.html"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-log"></use></svg></a></li>
            <li><a href="calendar.html"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-calender"></use></svg></a></li>
            <li><a href="notifications.html"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-notifications"></use></svg></a></li>
            <div class="auth-control">
            ${this._authenticated?l`<button @click=${this._onSignOut}>Sign Out (${this._username})</button>`:l`<a href="/login.html">Sign In</a>`}
            </div>
          </ul>
        </nav>
      </header>
    `}};k.styles=g`
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
  `;let h=k;y([b()],h.prototype,"_authenticated");y([b()],h.prototype,"_username");y([b()],h.prototype,"_darkMode");var N=Object.defineProperty,w=(o,e,a,n)=>{for(var t=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(t=s(e,a,t)||t);return t&&N(e,a,t),t};const x=class x extends m{constructor(){super(...arguments),this.rank=0,this.year="",this.points=0}render(){return l`
            <td class="rank">${this.rank}</td>
            <td><slot></slot></td>
            <td class="year">${this.year}</td>
            <td class="points">${this.points}</td>
        `}};x.styles=[P.styles,g`
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
        `];let d=x;w([f({type:Number})],d.prototype,"rank");w([f({type:String})],d.prototype,"year");w([f({type:Number})],d.prototype,"points");var B=Object.defineProperty,L=(o,e,a,n)=>{for(var t=void 0,r=o.length-1,s;r>=0;r--)(s=o[r])&&(t=s(e,a,t)||t);return t&&B(e,a,t),t};const _=class _ extends m{constructor(){super(...arguments),this.players=[],this._authObserver=new $(this,"app:auth")}get authorization(){var e;if((e=this._user)!=null&&e.authenticated)return{Authorization:`Bearer ${this._user.token}`}}render(){return l`
      <table>
        <thead>
          <tr>
            <th>Rank</th><th>Name</th><th>Year</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          ${this.players.map(e=>l`
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
    `}};_.styles=[P.styles,g` 
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
    `];let p=_;L([f({type:Array})],p.prototype,"players");const A={};function I(o,e,a){const[n,t]=o;switch(n){case"players/load":{const{gender:r}=t;console.log("DISPATCHED players/load for gender →",r),fetch(`/api/players/${r}`,{headers:M.headers(a)}).then(s=>{if(!s.ok)throw new Error(`HTTP ${s.status}`);return s.json()}).then(s=>{console.log("FETCHED playersList →",s),e(i=>({...i,playersList:s}))}).catch(s=>{console.error("Failed to load players:",s),e(i=>({...i}))});break}case"player/select":{const{name:r}=t;e(s=>{var c;const i=(c=s.playersList)==null?void 0:c.find(v=>v.name===r);return{...s,selectedPlayer:i}});break}case"player/clear":{e(r=>({...r,selectedPlayer:void 0}));break}case"auth/login":{const{username:r,password:s}=t;fetch("/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r,password:s})}).then(i=>{if(!i.ok)throw new Error("Login failed");return i.json()}).then(i=>{const c=i;e(v=>({...v,credential:c}))}).catch(i=>{console.error("Login error:",i),e(c=>({...c}))});break}case"auth/logout":{e(r=>({...r,credential:void 0}));break}default:throw new Error(`Unhandled message type: ${n}`)}}var V=Object.defineProperty,W=Object.getOwnPropertyDescriptor,O=(o,e,a,n)=>{for(var t=n>1?void 0:n?W(e,a):e,r=o.length-1,s;r>=0;r--)(s=o[r])&&(t=(n?s(e,a,t):s(t))||t);return n&&t&&V(e,a,t),t};let u=class extends z{constructor(){super("app:model"),this.showMen=!0}firstUpdated(){this.dispatchMessage(["players/load",{gender:"men"}])}showMenTable(){this.showMen=!0,this.dispatchMessage(["players/load",{gender:"men"}])}showWomenTable(){this.showMen=!1,this.dispatchMessage(["players/load",{gender:"women"}])}render(){const o=this.model.playersList??[];return l`
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
            ${this.showMen?l`<player-table .players=${o}></player-table>`:l`<player-table .players=${o}></player-table>`}
            </section>
        </div>
        `}};u.styles=g`
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
    `;O([b()],u.prototype,"showMen",2);u=O([D("home-view")],u);const F=[{auth:"protected",path:"/app",view:()=>l`<home-view></home-view>`},{path:"/",redirect:"/app"}];C({"mu-auth":M.Provider,"mu-history":T.Provider,"app-header":h,"player-ranking":d,"player-table":p,"mu-switch":class extends S.Element{constructor(){super(F,"app:history","app:auth")}},"mu-store":class extends j.Provider{constructor(){super(I,A,"app:auth")}}});
