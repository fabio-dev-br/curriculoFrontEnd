import Vue from "vue";
// import { store } from "./../store";

import Home from "./../components/pages/Home";
import Login from "./../components/pages/Login";
import PortalPessoa from "./../components/pages/PortalPessoa";
import PortalEmpresa from "./../components/pages/PortalEmpresa";
import ChangeMyPass from "./../components/pages/ChangeMyPass";

import VueRouter from "vue-router";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
  { path: "/portal-pessoa", name: "portal-pessoa", component: PortalPessoa },
  { path: "/portal-empresa", name: "portal-empresa", component: PortalEmpresa },
  { path: "/change-my-pass", name: "change-my-pass", component: ChangeMyPass },
];

const router = new VueRouter({
  mode: "history",
  routes
});

Vue.use(VueRouter);

// router.beforeEach((to, from, next) => {
//   switch (to.name) {
//     case "domains":
//     case "aliases":
//     case "emails":
//       if (!store.getters.authToken) {
//         next({ path: "/", replace: true });
//       }
//       break;
//   }
//   next();
// });

export {
  router
};
