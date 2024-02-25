<template>
	<div class="container">
		<div class="text-end mt-4">
			<button @click="openModal('new')" class="btn btn-primary">
				建立新的產品
			</button>
		</div>
		<table class="table mt-4">
			<thead>
				<tr>
					<th width="120">分類</th>
					<th>產品名稱</th>
					<th width="120">原價</th>
					<th width="120">售價</th>
					<th width="100">是否啟用</th>
					<th width="120">編輯</th>
				</tr>
			</thead>
			<tbody>
				<VueLoading :active="isLoading" :z-index="1060" />
				<tr v-for="item in products" :key="item.id">
					<td>{{ item.category }}</td>
					<td>{{ item.title }}</td>
					<td class="text-end">{{ item.origin_price }}</td>
					<td class="text-end">{{ item.price }}</td>
					<td>
						<span v-if="item.is_enabled" class="text-success">啟用</span>
						<span v-else>未啟用</span>
					</td>
					<td>
						<div class="btn-group">
							<button
								type="button"
								class="btn btn-outline-primary btn-sm"
								@click="openModal('edit', item)"
							>
								編輯
							</button>
							<button
								type="button"
								class="btn btn-outline-danger btn-sm"
								@click="openDelModal(item)"
							>
								刪除
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<pagination :pages="pagination" @emit-pages="getData"></pagination>
		<product-modal
			ref="productbox"
			:product="catchProduct"
			:is-new="isNew"
			@update="getData"
		></product-modal>
		<DelModal
			@del-item="delProduct"
			ref="delbox"
			:item="catchProduct"
			@update="getData"
		></DelModal>
	</div>
</template>

<script>
import { mapActions } from "pinia";
import { useToastMessageStore } from "@/stores/toastMessage";

import Pagination from "@/components/Pagination.vue";
import ProductModal from "@/components/ProductModal.vue";
import DelModal from "@/components/DelModal.vue";
export default {
	data() {
		return {
			products: [],
			catchProduct: {
				imagesUrl: [],
			},
			isNew: false,
			pagination: {},
			isLoading: false,
		};
	},
	methods: {
		...mapActions(useToastMessageStore, ["pushMessage"]),
		getData(page = 1) {
			const api = `${import.meta.env.VITE_API}/api/${
				import.meta.env.VITE_APIPATH
			}/admin/products?page=${page}`;
			this.isLoading = true;
			this.$http
				.get(api)
				.then((res) => {
					const { products, pagination } = res.data;
					this.products = products;
					this.pagination = pagination;
					this.isLoading = false;
					this.pushMessage({
						style: "success",
						title: "成功取得產品資訊",
						content: res.data.message,
					});
				})
				.catch((err) => {
					this.pushMessage({
						style: "danger",
						title: "取得產品資訊失敗",
						content: error.response.data.message,
					});
				});
		},
		openModal(isNew, item) {
			if (isNew === "new") {
				this.catchProduct = {
					imagesUrl: [],
				};
				this.isNew = true;
				this.$refs.productbox.openM();
			} else if (isNew === "edit") {
				this.catchProduct = { ...item };
				this.isNew = false;
				this.$refs.productbox.openM();
			} else if (isNew === "delete") {
				this.catchProduct = { ...item };
				this.$refs.delbox.openCloseModal();
			}
		},
		openDelModal(item) {
			this.catchProduct = { ...item };
			this.$refs.delbox.openModal();
		},
		delProduct() {
			this.$http
				.delete(
					`${import.meta.env.VITE_API}api/${
						import.meta.env.VITE_APIPATH
					}/admin/product/${this.catchProduct.id}`
				)
				.then((res) => {
					this.$refs.delbox.hideModal();
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
	},
	components: {
		Pagination,
		ProductModal,
		DelModal,
	},
	created() {
		this.getData();
	},
};
</script>
