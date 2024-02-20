<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Week7</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link"
              >產品</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/order" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link"
              >優惠卷</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/article" class="nav-link">貼文</router-link>
          </li>
          <li class="nav-item">
            <a @click.prevent="logout()" class="nav-link">登出</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/user/article" class="nav-link">Blog</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/cart" class="nav-link">購物車</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods:{
    logout() {
      const api = `${import.meta.env.VITE_API}logout`;
      this.$http.post(api)
        .then((res) => {
          console.log(res);
          this.$router.push('/');
        }).catch((error) => {
          console.log(error);
        });
    },
  }
  
};
</script>
