import{i as _,O as q,x as i,a as f,r as u,b as H,n as P,c as v,V as M,d as V,f as U,h as O,s as W,_ as Y}from"./reset.css-DIuvxJHl.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=a=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)};var R=Object.defineProperty,T=(a,e,n,s)=>{for(var t=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(t=o(e,n,t)||t);return t&&R(e,n,t),t};const N=class N extends _{constructor(){super(...arguments),this._authObserver=new q(this,"app:auth"),this._authenticated=!1,this._darkMode=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var n,s;this._authenticated=!!((n=e.user)!=null&&n.authenticated),this._username=(s=e.user)==null?void 0:s.username})}_toggleDark(e){const n=e.target.checked;this._darkMode=n,document.body.classList.toggle("dark-mode",n)}_onSignOut(){this.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]}))}render(){const e=this._darkMode?"icon-lightmode":"icon-darkmode";return i`
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
            <li><a href="/app/announcements"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-notifications"></use></svg></a></li>
            <div class="auth-control">
            ${this._authenticated?i`<button @click=${this._onSignOut}>Sign Out (${this._username})</button>`:i`<a href="/login.html">Sign In</a>`}
            </div>
          </ul>
        </nav>
      </header>
    `}};N.styles=f`
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
  `;let b=N;T([u()],b.prototype,"_authenticated");T([u()],b.prototype,"_username");T([u()],b.prototype,"_darkMode");var G=Object.defineProperty,j=(a,e,n,s)=>{for(var t=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(t=o(e,n,t)||t);return t&&G(e,n,t),t};const F=class F extends _{constructor(){super(...arguments),this.rank=0,this.year="",this.points=0}render(){return i`
            <td class="rank">${this.rank}</td>
            <td><slot></slot></td>
            <td class="year">${this.year}</td>
            <td class="points">${this.points}</td>
        `}};F.styles=[H.styles,f`
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
        `];let y=F;j([P({type:Number})],y.prototype,"rank");j([P({type:String})],y.prototype,"year");j([P({type:Number})],y.prototype,"points");var K=Object.defineProperty,Q=(a,e,n,s)=>{for(var t=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(t=o(e,n,t)||t);return t&&K(e,n,t),t};const B=class B extends _{constructor(){super(...arguments),this.players=[],this._authObserver=new q(this,"app:auth")}get authorization(){var e;if((e=this._user)!=null&&e.authenticated)return{Authorization:`Bearer ${this._user.token}`}}render(){return i`
      <table>
        <thead>
          <tr>
            <th>Rank</th><th>Name</th><th>Year</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          ${this.players.map(e=>i`
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
    `}};B.styles=[H.styles,f` 
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
    `];let $=B;Q([P({type:Array})],$.prototype,"players");var X=Object.defineProperty,C=(a,e,n,s)=>{for(var t=void 0,r=a.length-1,o;r>=0;r--)(o=a[r])&&(t=o(e,n,t)||t);return t&&X(e,n,t),t};const I=class I extends _{constructor(){super(...arguments),this.announcements=[],this.newContent="",this.newDate="",this.errorMsg=""}get canPost(){return this.newContent.trim().length>0&&this.newDate.trim().length>0}connectedCallback(){super.connectedCallback(),this.fetchAnnouncements()}async fetchAnnouncements(){try{const e=await fetch("/api/announcements",{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Failed to load (${e.status})`);const n=await e.json();this.announcements=n}catch(e){console.error("Error fetching announcements:",e),this.errorMsg="Could not load announcements."}}handleContentInput(e){const n=e.target;this.newContent=n.value}handleDateInput(e){const n=e.target;this.newDate=n.value}async handlePost(e){e.preventDefault(),this.errorMsg="";const n=localStorage.getItem("token")||"";try{const s=await fetch("/api/announcements",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+n},body:JSON.stringify({content:this.newContent.trim(),date:this.newDate})});if(s.status===401)throw new Error("You must be logged in to post.");if(!s.ok){const t=await s.text();throw new Error(`Error: ${t||s.status}`)}this.newContent="",this.newDate="",await this.fetchAnnouncements()}catch(s){console.error("Error posting announcement:",s),this.errorMsg=s.message||"Post failed"}}render(){return i`
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
        ${this.announcements.length===0?i`<p>No announcements yet.</p>`:i`
              <ul style="list-style: none; padding: 0;">
                ${this.announcements.map(e=>i`
                    <li
                      style="
                        background: #f8f8f8;
                        padding: 1rem;
                        border-radius: 0.5rem;
                        margin-bottom: 0.75rem;
                      "
                    >
                      <p style="margin: 0 0 0.5rem;">
                        ${e.content}
                      </p>
                      <small style="color: #666;">
                        <strong>Date:</strong>
                        ${new Date(e.date).toLocaleDateString()} &mdash;
                        <strong>Posted by:</strong> ${e.createdBy}
                      </small>
                    </li>
                  `)}
              </ul>
            `}
      </div>
    `}};I.styles=f`
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
  `;let g=I;C([u()],g.prototype,"announcements");C([u()],g.prototype,"newContent");C([u()],g.prototype,"newDate");C([u()],g.prototype,"errorMsg");customElements.define("announcement-list",g);const Z={};function ee(a,e,n){const[s,t]=a;switch(s){case"players/load":{const{gender:r}=t;console.log("DISPATCHED players/load for gender →",r),fetch(`/api/players/${r}`,{headers:v.headers(n)}).then(o=>{if(!o.ok)throw new Error(`HTTP ${o.status}`);return o.json()}).then(o=>{console.log("FETCHED playersList →",o),e(l=>({...l,playersList:o}))}).catch(o=>{console.error("Failed to load players:",o),e(l=>({...l}))});break}case"player/select":{const{name:r}=t;e(o=>{var d;const l=(d=o.playersList)==null?void 0:d.find(h=>h.name===r);return{...o,selectedPlayer:l}});break}case"player/clear":{e(r=>({...r,selectedPlayer:void 0}));break}case"player/save":{const{name:r,points:o,year:l,onSuccess:d,onFailure:h}=t,p={points:o};typeof l=="string"&&l.trim()!==""&&(p.year=l.trim()),fetch(`/api/players/${encodeURIComponent(r)}`,{method:"PUT",headers:{"Content-Type":"application/json",...v.headers(n)},body:JSON.stringify(p)}).then(c=>{if(!c.ok)throw new Error(`HTTP ${c.status}`);return c.json()}).then(c=>{e(x=>{const A=(x.playersList??[]).map(m=>m.name===r?{...m,points:c.points,year:c.year}:m);A.sort((m,E)=>E.points-m.points);const L=A.map((m,E)=>({...m,rank:E+1}));return{...x,playersList:L,selectedPlayer:L.find(m=>m.name===r)}}),d&&d()}).catch(c=>{console.error("Failed to save player:",c),h&&h(c)});break}case"player/create":{const{name:r,year:o,gender:l,onSuccess:d,onFailure:h}=t;fetch("/api/players",{method:"POST",headers:{"Content-Type":"application/json",...v.headers(n)},body:JSON.stringify({name:r,year:o,gender:l})}).then(p=>{if(!p.ok)throw new Error(`HTTP ${p.status}`);return p.json()}).then(p=>{fetch(`/api/players/${l}`,{headers:v.headers(n)}).then(c=>{if(!c.ok)throw new Error(`HTTP ${c.status}`);return c.json()}).then(c=>{e(x=>({...x,playersList:c})),d&&d()}).catch(c=>{console.error("Error after create, reloading list:",c),h&&h(c)})}).catch(p=>{console.error("Failed to create player:",p),h&&h(p)});break}case"auth/login":{const{username:r,password:o}=t;fetch("/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r,password:o})}).then(l=>{if(!l.ok)throw new Error("Login failed");return l.json()}).then(l=>{const d=l;e(h=>({...h,credential:d}))}).catch(l=>{console.error("Login error:",l),e(d=>({...d}))});break}case"auth/logout":{e(r=>({...r,credential:void 0}));break}default:throw new Error(`Unhandled message type: ${s}`)}}var te=Object.defineProperty,re=Object.getOwnPropertyDescriptor,J=(a,e,n,s)=>{for(var t=s>1?void 0:s?re(e,n):e,r=a.length-1,o;r>=0;r--)(o=a[r])&&(t=(s?o(e,n,t):o(t))||t);return s&&t&&te(e,n,t),t};let k=class extends M{constructor(){super("app:model"),this.showMen=!0}firstUpdated(){this.dispatchMessage(["players/load",{gender:"men"}])}showMenTable(){this.showMen=!0,this.dispatchMessage(["players/load",{gender:"men"}])}showWomenTable(){this.showMen=!1,this.dispatchMessage(["players/load",{gender:"women"}])}render(){const a=this.model.playersList??[];return console.log("home-view render sees list:",a),i`
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
            ${this.showMen?i`<player-table .players=${a}></player-table>`:i`<player-table .players=${a}></player-table>`}
            </section>
        </div>
        `}};k.styles=f`
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
    `;J([u()],k.prototype,"showMen",2);k=J([S("home-view")],k);var ne=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,z=(a,e,n,s)=>{for(var t=s>1?void 0:s?ae(e,n):e,r=a.length-1,o;r>=0;r--)(o=a[r])&&(t=(s?o(e,n,t):o(t))||t);return s&&t&&ne(e,n,t),t};V({"mu-form":U.Element});let w=class extends M{constructor(){super("app:model"),this.editError=null,this.createError=null}handleEditSubmit(a){a.preventDefault();const e=a.detail,{name:n,points:s,year:t}=e;this.dispatchMessage(["player/save",{name:n,points:s,year:t,onSuccess:()=>{O.dispatch(this,"history/navigate",{href:"/app"})},onFailure:r=>{this.editError=`Failed to save: ${r.message}`}}])}handleCreateSubmit(a){a.preventDefault();const e=a.detail,{name:n,year:s,gender:t}=e;this.dispatchMessage(["player/create",{name:n,year:s,gender:t,onSuccess:()=>{O.dispatch(this,"history/navigate",{href:"/app"})},onFailure:r=>{this.createError=`Failed to create: ${r.message}`}}])}render(){return i`
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


            ${this.editError?i`<div class="error">${this.editError}</div>`:""}
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

            ${this.createError?i`<div class="error">${this.createError}</div>`:""}
          </mu-form>
        </div>
      </div>
    `}};w.styles=f`
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
  `;z([u()],w.prototype,"editError",2);z([u()],w.prototype,"createError",2);w=z([S("player-edit-view")],w);var oe=Object.getOwnPropertyDescriptor,se=(a,e,n,s)=>{for(var t=s>1?void 0:s?oe(e,n):e,r=a.length-1,o;r>=0;r--)(o=a[r])&&(t=o(t)||t);return t};let D=class extends M{constructor(){super("app:model")}render(){return i`
      <h2>Announcements</h2>
      <!-- This custom element was already defined in ../components/announcement-list.js -->
      <announcement-list></announcement-list>
    `}};D.styles=f`
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
  `;D=se([S("announcements-view")],D);const ie=[{auth:"protected",path:"/app",view:()=>i`<home-view></home-view>`},{auth:"protected",path:"/app/announcements",view:()=>i`<announcements-view></announcements-view>`},{auth:"protected",path:"/app/edit",view:()=>i`<player-edit-view></player-edit-view>`},{path:"/",redirect:"/app"}];V({"mu-auth":v.Provider,"mu-history":O.Provider,"app-header":b,"player-ranking":y,"player-table":$,"announcement-list":g,"mu-switch":class extends Y.Element{constructor(){super(ie,"app:history","app:auth")}},"mu-store":class extends W.Provider{constructor(){super(ee,Z,"app:auth")}}});
