<template>
	<NavbarLayout></NavbarLayout>
	<router-view></router-view>
	<ToastMessages />
</template>

<script>
import ToastMessages from "@/components/ToastMessages.vue";
import NavbarLayout from "@/components/NavbarLayout.vue";
export default {
	methods: {
		checklogin() {
			const api = `${import.meta.env.VITE_API}api/user/check`;
			this.$http
				.post(api)
				.then((res) => {
					console.log(res.data.success);
				})
				.catch((err) => {
					alert(err.response.data.message);
					this.$router.push("/");
				});
		},
	},
	components: {
		NavbarLayout,
		ToastMessages,
	},
	mounted() {
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)fabio20token\s*=\s*([^;]*).*$)|^.*$/,
			"$1"
		);
		this.$http.defaults.headers.common.Authorization = token;
		this.checklogin();
	},
};
</script>

<style></style>
