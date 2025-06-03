import{i as u,x as l,b as h,a as f,r as p,n as c,d as b,c as g}from"./reset.css-C-Iyd-rE.js";var x=Object.defineProperty,n=(d,r,e,a)=>{for(var t=void 0,o=d.length-1,m;o>=0;o--)(m=d[o])&&(t=m(r,e,t)||t);return t&&x(r,e,t),t};const i=class i extends u{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}handleChange(r){const e=r.target,a=e==null?void 0:e.name,t=e==null?void 0:e.value,o=this.formData;switch(a){case"username":this.formData={...o,username:t};break;case"password":this.formData={...o,password:t};break}}handleSubmit(r){r.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(e=>{if(e.status!==200)throw"Login failed";return e.json()}).then(e=>{const{token:a}=e,t=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:a,redirect:this.redirect}]});console.log("dispatching message",t),this.dispatchEvent(t)}).catch(e=>{console.log(e),this.error=e.toString()})}render(){return l`
            <form
                @input=${r=>this.handleChange(r)}
                @submit=${r=>this.handleSubmit(r)}
            >
                <h2>LOGIN</h2>
                <slot></slot>
                <slot name="button">
                <button
                    ?disabled=${!this.canSubmit}
                    type="submit">
                    GO
                </button>
                </slot>
                <p class="error">${this.error}</p>
                <a class="register" href="newuser.html">Sign up as a new user</a>
            </form>
    `}};i.styles=[h.styles,f`
        :host {
            display: block;
            max-width: 360px;
            margin: 3rem auto;
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            font-family: 'Poppins', sans-serif;
        }

        h2 {
            margin: 0 0 1.5rem;
            color: rgba(0, 56, 49, 1);
            font-size: 1.5rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-align: center;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        button {
            margin-top: 1rem;
            background: rgba(0, 56, 49, 1);
            color: #fff;
            border: none;
            border-radius: 2rem;
            padding: 0.75rem;
            font-size: 1rem;
            text-transform: uppercase;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(0, 56, 50, 0.22);
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .error:not(:empty) {
            margin-top: 1rem;
            color: red;
            border: 1px solid red;
            padding: 0.5rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-family: "Poppins", sans-serif;
        }

        .register {
            display: block;
            margin-top: 1rem;
            text-align: center;
            font-size: 0.85rem;
            color: #555;
            text-decoration: none;
        }

        .register:hover {
            text-decoration: underline;
        }
    `];let s=i;n([p()],s.prototype,"formData");n([c()],s.prototype,"api");n([c()],s.prototype,"redirect");n([p()],s.prototype,"error");b({"mu-auth":g.Provider,"login-form":s});
