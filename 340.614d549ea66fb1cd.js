"use strict";(self.webpackChunkoffer_director=self.webpackChunkoffer_director||[]).push([[340],{3340:(P,g,o)=>{o.r(g),o.d(g,{NavigationModule:()=>I});var p=o(4466),r=o(9808),d=o(5113),f=o(4004),v=o(3151),t=o(5e3),h=o(9886),c=o(4889),l=o(2626),Z=o(4594),u=o(3379),A=o(8099),M=o(7423);const T=function(){return["/login"]};function U(n,a){1&n&&(t.TgZ(0,"a",18)(1,"div",12)(2,"span"),t._uU(3,"Login"),t.qZA(),t._UZ(4,"span",7),t.TgZ(5,"mat-icon",8),t._uU(6,"login"),t.qZA()()()),2&n&&t.Q6J("routerLink",t.DdM(1,T))}function C(n,a){if(1&n){const i=t.EpF();t.TgZ(0,"a",19),t.NdJ("click",function(){return t.CHM(i),t.oxw().logOut()}),t.TgZ(1,"div",12)(2,"span"),t._uU(3,"Logout"),t.qZA(),t._UZ(4,"span",7),t.TgZ(5,"mat-icon",8),t._uU(6,"logout"),t.qZA()()()}}function y(n,a){if(1&n){const i=t.EpF();t.TgZ(0,"button",20),t.NdJ("click",function(){return t.CHM(i),t.oxw(),t.MAs(2).toggle()}),t.TgZ(1,"mat-icon",21),t._uU(2,"menu"),t.qZA()()}}const L=function(){return["home"]},N=function(){return["products"]},x=function(){return["offer"]},O=function(){return["admin"]},J=function(){return["/"]};let m=(()=>{class n{constructor(i,e){this.breakpointObserver=i,this._auth=e,this.isHandset$=this.breakpointObserver.observe(d.u3.Handset).pipe((0,f.U)(s=>s.matches),(0,v.d)())}get isAuthenticated(){return!!localStorage.getItem("token")}logOut(){this._auth.logOut()}}return n.\u0275fac=function(i){return new(i||n)(t.Y36(d.Yg),t.Y36(h.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["od-navigation"]],decls:48,vars:24,consts:[[1,"sidenav-container"],["fixedInViewport","",1,"sidenav","mat-elevation-z2",3,"mode","opened"],["drawer",""],[3,"routerLink"],["color","warning",1,"justify-content-center"],["src","https://nikhilrstg18.github.io/offer_director/assets/logo.png","alt","ATS","width","60%"],["mat-list-item","","title","Manage Products",3,"routerLink"],[1,"flex-expand"],["color","primary"],["mat-list-item","","title","Manage Offer",3,"routerLink"],["mat-list-item","","title","Manage Settings",3,"routerLink"],["mat-list-item","","title","User",3,"routerLink"],[1,"d-flex","w-100"],["mat-list-item","","title","Login",3,"routerLink",4,"ngIf","ngIfElse"],["logout",""],["color","primary",1,"mat-elevation-z4"],["type","button","aria-label","Toggle sidenav","mat-icon-button","",3,"click",4,"ngIf"],["src","https://nikhilrstg18.github.io/offer_director/assets/quality.png","alt","ATS","height","100%",2,"border-bottom-left-radius","30%","border-bottom-right-radius","30%"],["mat-list-item","","title","Login",3,"routerLink"],["mat-list-item","","title","User",3,"click"],["type","button","aria-label","Toggle sidenav","mat-icon-button","",3,"click"],["aria-label","Side nav toggle icon"]],template:function(i,e){if(1&i&&(t.TgZ(0,"mat-sidenav-container",0)(1,"mat-sidenav",1,2),t.ALo(3,"async"),t.ALo(4,"async"),t.ALo(5,"async"),t.TgZ(6,"a",3)(7,"mat-toolbar",4),t._UZ(8,"img",5),t.qZA()(),t.TgZ(9,"mat-nav-list")(10,"a",6)(11,"span"),t._uU(12,"Product"),t.qZA(),t._UZ(13,"span",7),t.TgZ(14,"mat-icon",8),t._uU(15,"store"),t.qZA()(),t.TgZ(16,"a",9)(17,"span"),t._uU(18,"Offer"),t.qZA(),t._UZ(19,"span",7),t.TgZ(20,"mat-icon",8),t._uU(21,"assignment"),t.qZA()(),t.TgZ(22,"a",10)(23,"span"),t._uU(24,"Admin"),t.qZA(),t._UZ(25,"span",7),t.TgZ(26,"mat-icon",8),t._uU(27,"settings"),t.qZA()(),t.TgZ(28,"a",11)(29,"div",12)(30,"span"),t._uU(31,"User"),t.qZA(),t._UZ(32,"span",7),t.TgZ(33,"mat-icon",8),t._uU(34,"account_circle"),t.qZA()()(),t._UZ(35,"span",7),t.YNc(36,U,7,2,"a",13),t.YNc(37,C,7,0,"ng-template",null,14,t.W1O),t.qZA()(),t.TgZ(39,"mat-sidenav-content")(40,"mat-toolbar",15),t.YNc(41,y,3,0,"button",16),t.ALo(42,"async"),t.TgZ(43,"span"),t._uU(44,"Offer Director"),t.qZA(),t._UZ(45,"span",7)(46,"img",17),t.qZA(),t._UZ(47,"router-outlet"),t.qZA()()),2&i){const s=t.MAs(38);t.xp6(1),t.Q6J("mode",t.lcZ(4,13,e.isHandset$)?"over":"side")("opened",!1===t.lcZ(5,15,e.isHandset$)),t.uIk("role",t.lcZ(3,11,e.isHandset$)?"dialog":"navigation"),t.xp6(5),t.Q6J("routerLink",t.DdM(19,L)),t.xp6(4),t.Q6J("routerLink",t.DdM(20,N)),t.xp6(6),t.Q6J("routerLink",t.DdM(21,x)),t.xp6(6),t.Q6J("routerLink",t.DdM(22,O)),t.xp6(6),t.Q6J("routerLink",t.DdM(23,J)),t.xp6(8),t.Q6J("ngIf",!e.isAuthenticated)("ngIfElse",s),t.xp6(5),t.Q6J("ngIf",t.lcZ(42,17,e.isHandset$))}},directives:[c.TM,c.JX,l.yS,Z.Ye,u.Hk,u.Tg,A.Hw,r.O5,c.Rh,M.lW,l.lC],pipes:[r.Ov],styles:[".sidenav-container[_ngcontent-%COMP%]{height:100%}.sidenav[_ngcontent-%COMP%]{width:200px}.sidenav[_ngcontent-%COMP%]   .mat-toolbar[_ngcontent-%COMP%]{background:inherit}.mat-toolbar.mat-primary[_ngcontent-%COMP%]{position:sticky;top:0;z-index:1}.mat-nav-list[_ngcontent-%COMP%]{height:90.5%;display:flex;flex-flow:column nowrap}"]}),n})();const H=[{path:"",component:m,children:[{path:"home",loadChildren:()=>o.e(608).then(o.bind(o,608)).then(n=>n.HomeModule)},{path:"admin",loadChildren:()=>o.e(906).then(o.bind(o,8906)).then(n=>n.AdminModule)},{path:"offer",loadChildren:()=>o.e(234).then(o.bind(o,8234)).then(n=>n.OfferModule)},{path:"products",loadChildren:()=>o.e(901).then(o.bind(o,2901)).then(n=>n.ProductsModule)}]}];let b=(()=>{class n{}return n.components=[m],n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[l.Bz.forChild(H)],l.Bz]}),n})(),I=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[r.ez,p.m,b]]}),n})()}}]);