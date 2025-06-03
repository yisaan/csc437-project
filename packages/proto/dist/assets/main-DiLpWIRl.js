import{i as b,x as i,r as _,a as f,n as h,O as w,b as g,d as B,c as C}from"./reset.css--le21iDY.js";var P=Object.defineProperty,y=(n,t,e,d)=>{for(var a=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(a=r(t,e,a)||a);return a&&P(t,e,a),a};const m=class m extends b{constructor(){super(...arguments),this.rank=0,this.year="",this.points=0}render(){return i`
            <td class="rank">${this.rank}</td>
            <td><slot></slot></td>
            <td class="year">${this.year}</td>
            <td class="points">${this.points}</td>
        `}};m.styles=[_.styles,f`
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
        `];let o=m;y([h({type:Number})],o.prototype,"rank");y([h({type:String})],o.prototype,"year");y([h({type:Number})],o.prototype,"points");var L=Object.defineProperty,$=(n,t,e,d)=>{for(var a=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(a=r(t,e,a)||a);return a&&L(t,e,a),a};const k=class k extends b{constructor(){super(...arguments),this.src="",this.players=[],this._authObserver=new w(this,"blazing:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{this._user=t.user,this.src&&this.hydrate(this.src)})}get authorization(){var t;if((t=this._user)!=null&&t.authenticated)return{Authorization:`Bearer ${this._user.token}`}}async hydrate(t){try{const e=await fetch(t,{headers:this.authorization});if(!e.ok)throw new Error(`HTTP ${e.status}`);this.players=await e.json()}catch(e){console.error("Failed to load player data:",e)}}render(){return i`
      <table>
        <thead>
          <tr>
            <th>Rank</th><th>Name</th><th>Year</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          ${this.players.map(t=>i`
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
    `}};k.styles=[_.styles,f` 
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
    `];let c=k;$([h({type:String})],c.prototype,"src");$([g()],c.prototype,"players");var I=Object.defineProperty,v=(n,t,e,d)=>{for(var a=void 0,s=n.length-1,r;s>=0;s--)(r=n[s])&&(a=r(t,e,a)||a);return a&&I(t,e,a),a};const x=class x extends b{constructor(){super(...arguments),this._authObserver=new w(this,"blazing:auth"),this._authenticated=!1,this._darkMode=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{var e,d;this._authenticated=!!((e=t.user)!=null&&e.authenticated),this._username=(d=t.user)==null?void 0:d.username})}_toggleDark(t){const e=t.target.checked;this._darkMode=e,document.body.classList.toggle("dark-mode",e)}_onSignOut(){this.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]}))}render(){const t=this._darkMode?"icon-lightmode":"icon-darkmode";return i`
      <header>
        <nav>
          <ul>
            <div class="home">
                <a href="/index.html">Cal Poly Pickleball</a>
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
            ${this._authenticated?i`<button @click=${this._onSignOut}>Sign Out (${this._username})</button>`:i`<a href="/login.html">Sign In</a>`}
            </div>
          </ul>
        </nav>
      </header>
    `}};x.styles=f`
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
  `;let l=x;v([g()],l.prototype,"_authenticated");v([g()],l.prototype,"_username");v([g()],l.prototype,"_darkMode");B({"player-table":c,"mu-auth":C.Provider,"player-ranking":o,"app-header":l});const u=document.getElementById("showMen"),p=document.getElementById("showWomen"),z=document.getElementById("menTable"),O=document.getElementById("womenTable");u.addEventListener("click",()=>{z.style.display="block",O.style.display="none",u.classList.add("active"),p.classList.remove("active")});p.addEventListener("click",()=>{z.style.display="none",O.style.display="block",p.classList.add("active"),u.classList.remove("active")});
