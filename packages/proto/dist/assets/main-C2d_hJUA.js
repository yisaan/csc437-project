import{i as b,x as d,r as g,a as f,n as l,O as w,b as $,d as _,c as B}from"./reset.css--le21iDY.js";var z=Object.defineProperty,p=(o,t,r,x)=>{for(var e=void 0,s=o.length-1,n;s>=0;s--)(n=o[s])&&(e=n(t,r,e)||e);return e&&z(t,r,e),e};const y=class y extends b{constructor(){super(...arguments),this.rank=0,this.year="",this.points=0}render(){return d`
            <td class="rank">${this.rank}</td>
            <td><slot></slot></td>
            <td class="year">${this.year}</td>
            <td class="points">${this.points}</td>
        `}};y.styles=[g.styles,f`
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
          }
      
          td.year {
            color: #555;
            text-align: right;
          }
      
          td.points {
            font-weight: 700;
            text-align: right;
          }
      
          :host(:hover) {
            background-color: #f1f5f9;
          }
        `];let a=y;p([l({type:Number})],a.prototype,"rank");p([l({type:String})],a.prototype,"year");p([l({type:Number})],a.prototype,"points");var L=Object.defineProperty,m=(o,t,r,x)=>{for(var e=void 0,s=o.length-1,n;s>=0;s--)(n=o[s])&&(e=n(t,r,e)||e);return e&&L(t,r,e),e};const u=class u extends b{constructor(){super(...arguments),this.src="",this.players=[],this._authObserver=new w(this,"blazing:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{this._user=t.user,this.src&&this.hydrate(this.src)})}get authorization(){var t;if((t=this._user)!=null&&t.authenticated)return{Authorization:`Bearer ${this._user.token}`}}async hydrate(t){try{const r=await fetch(t,{headers:this.authorization});if(!r.ok)throw new Error(`HTTP ${r.status}`);this.players=await r.json()}catch(r){console.error("Failed to load player data:",r)}}render(){return d`
      <table>
        <thead>
          <tr>
            <th>Rank</th><th>Name</th><th>Year</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          ${this.players.map(t=>d`
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
    `}};u.styles=[g.styles,f` 
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
    `];let i=u;m([l({type:String})],i.prototype,"src");m([$()],i.prototype,"players");_({"player-table":i,"mu-auth":B.Provider,"player-ranking":a});const h=document.getElementById("showMen"),c=document.getElementById("showWomen"),v=document.getElementById("menTable"),k=document.getElementById("womenTable");h.addEventListener("click",()=>{v.style.display="block",k.style.display="none",h.classList.add("active"),c.classList.remove("active")});c.addEventListener("click",()=>{v.style.display="none",k.style.display="block",c.classList.add("active"),h.classList.remove("active")});
