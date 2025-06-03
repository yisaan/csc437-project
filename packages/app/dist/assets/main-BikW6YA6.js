import{i as u,O as w,x as n,a as g,r as d,b as x,n as b,d as M,_ as O,h as z,c as P}from"./reset.css-C-Iyd-rE.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=r=>(t,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var j=Object.defineProperty,f=(r,t,s,i)=>{for(var e=void 0,a=r.length-1,o;a>=0;a--)(o=r[a])&&(e=o(t,s,e)||e);return e&&j(t,s,e),e};const y=class y extends u{constructor(){super(...arguments),this._authObserver=new w(this,"app:auth"),this._authenticated=!1,this._darkMode=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{var s,i;this._authenticated=!!((s=t.user)!=null&&s.authenticated),this._username=(i=t.user)==null?void 0:i.username})}_toggleDark(t){const s=t.target.checked;this._darkMode=s,document.body.classList.toggle("dark-mode",s)}_onSignOut(){this.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]}))}render(){const t=this._darkMode?"icon-lightmode":"icon-darkmode";return n`
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
                  <use href="/icons/organization.svg#${t}"></use>
                </svg>
              </label>
            </li>
            <li><a href="log.html"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-log"></use></svg></a></li>
            <li><a href="calendar.html"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-calender"></use></svg></a></li>
            <li><a href="notifications.html"><svg class="icon"><use xlink:href="/icons/organization.svg#icon-notifications"></use></svg></a></li>
            <div class="auth-control">
            ${this._authenticated?n`<button @click=${this._onSignOut}>Sign Out (${this._username})</button>`:n`<a href="/login.html">Sign In</a>`}
            </div>
          </ul>
        </nav>
      </header>
    `}};y.styles=g`
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
  `;let l=y;f([d()],l.prototype,"_authenticated");f([d()],l.prototype,"_username");f([d()],l.prototype,"_darkMode");var S=Object.defineProperty,v=(r,t,s,i)=>{for(var e=void 0,a=r.length-1,o;a>=0;a--)(o=r[a])&&(e=o(t,s,e)||e);return e&&S(t,s,e),e};const m=class m extends u{constructor(){super(...arguments),this.rank=0,this.year="",this.points=0}render(){return n`
            <td class="rank">${this.rank}</td>
            <td><slot></slot></td>
            <td class="year">${this.year}</td>
            <td class="points">${this.points}</td>
        `}};m.styles=[x.styles,g`
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
        `];let h=m;v([b({type:Number})],h.prototype,"rank");v([b({type:String})],h.prototype,"year");v([b({type:Number})],h.prototype,"points");var N=Object.defineProperty,_=(r,t,s,i)=>{for(var e=void 0,a=r.length-1,o;a>=0;a--)(o=r[a])&&(e=o(t,s,e)||e);return e&&N(t,s,e),e};const k=class k extends u{constructor(){super(...arguments),this.src="",this.players=[],this._authObserver=new w(this,"app:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{this._user=t.user,this.src&&this.hydrate(this.src)})}get authorization(){var t;if((t=this._user)!=null&&t.authenticated)return{Authorization:`Bearer ${this._user.token}`}}async hydrate(t){try{const s=await fetch(t,{headers:this.authorization});if(!s.ok)throw new Error(`HTTP ${s.status}`);this.players=await s.json()}catch(s){console.error("Failed to load player data:",s)}}render(){return n`
      <table>
        <thead>
          <tr>
            <th>Rank</th><th>Name</th><th>Year</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          ${this.players.map(t=>n`
              <player-ranking
                rank="${t.rank}"
                year="${t.year}"
                points="${t.points}"
              >
                ${t.name}
              </player-ranking>
            `)}
        </tbody>
      </table>
    `}};k.styles=[x.styles,g` 
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
    `];let c=k;_([b({type:String})],c.prototype,"src");_([d()],c.prototype,"players");var B=Object.defineProperty,D=Object.getOwnPropertyDescriptor,$=(r,t,s,i)=>{for(var e=i>1?void 0:i?D(t,s):t,a=r.length-1,o;a>=0;a--)(o=r[a])&&(e=(i?o(t,s,e):o(e))||e);return i&&e&&B(t,s,e),e};let p=class extends u{constructor(){super(...arguments),this.showMen=!0}showMenTable(){this.showMen=!0}showWomenTable(){this.showMen=!1}render(){return n`
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
          <player-table
            src="/api/players/men"
            style="display: ${this.showMen?"block":"none"};"
          ></player-table>
          <player-table
            src="/api/players/women"
            style="display: ${this.showMen?"none":"block"};"
          ></player-table>
        </section>
      </div>
    `}};p.styles=g`
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
  `;$([d()],p.prototype,"showMen",2);p=$([C("home-view")],p);const T=[{auth:"protected",path:"/app",view:()=>n`<home-view></home-view>`},{path:"/",redirect:"/app"}];M({"mu-auth":P.Provider,"mu-history":z.Provider,"app-header":l,"player-ranking":h,"player-table":c,"mu-switch":class extends O.Element{constructor(){super(T,"app:history","app:auth")}}});
