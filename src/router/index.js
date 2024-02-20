import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminDashBord.vue"),
      children: [
        {
          path: "products",
          component: () => import("../views/AdminProduct.vue"),
        },
        {
          path: "order",
          component: () => import("../views/AdminOder.vue"),
        },
        {
          path: "coupons",
          component: () => import("../views/CouponsView.vue"),
        },
        {
          path: "article",
          component: () => import("../views/AdminArticle.vue"),
        },
      ],
    },
    {
      path: "/user",
      component: () => import("../views/AdminDashBord.vue"),
      children: [
        {
          path: "article",
          component: () => import("../views/UserArticle.vue"),
        },
        {
          path: "cart",
          component: () => import("../views/UserCart.vue"),
        },
        {
          path: "coupons",
          component: () => import("../views/CouponsView.vue"),
        },
      ],
    },
  ],
});

export default router;
