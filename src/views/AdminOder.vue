<template>
	<VueLoading :active="isLoading" :z-index="1060" />
	<table class="table mt-4">
		<thead>
			<tr>
				<th>購買時間</th>
				<th>Email</th>
				<th>購買款項</th>
				<th>應付金額</th>
				<th>是否付款</th>
				<th>編輯</th>
			</tr>
		</thead>
		<tbody>
			<template v-for="item in orders" :key="item.id">
				<tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
					<td>{{ $filters.date(item.create_at) }}</td>
					<td><span v-text="item.user.email" v-if="item.user"></span></td>
					<td>
						<ul class="list-unstyled">
							<li v-for="product in item.products" :key="product.id">
								{{ product.product.title }} 數量：{{ product.qty }}
								{{ product.product.unit }}
							</li>
						</ul>
					</td>
					<td class="text-right">{{ item.total }}</td>
					<td>
						<div class="form-check form-switch">
							付款狀態
							<input
								class="form-check-input"
								type="checkbox"
								:id="`paidSwitch${item.id}`"
								v-model="item.is_paid"
								@change="updatePaid(item)"
							/>
							<!-- 在這邊＠cahnge監聽如果有修改就起動更新 -->
							<label class="form-check-label" :for="`paidSwitch${item.id}`">
								<span v-if="item.is_paid">已付款</span>
								<span v-else>未付款</span>
							</label>
						</div>
					</td>
					<td>
						<div class="btn-group">
							<button
								class="btn btn-outline-primary btn-sm"
								type="button"
								@click="openModal(item)"
							>
								檢視
							</button>
							<button
								@click="openDelOrderModal(item)"
								class="btn btn-outline-danger btn-sm"
								type="button"
							>
								刪除
							</button>
						</div>
					</td>
				</tr>
			</template>
		</tbody>
	</table>
	<OrderModal
		:order="tempOrder"
		ref="ordermodal"
		@update-paid="updatePaid"
	></OrderModal>
	<DelModal
		@del-item="delOrder"
		ref="delbox"
		:item="tempOrder"
		@update="getOrder"
	></DelModal>
	<pagination :pages="pagination" @emit-pages="getOrder"></pagination>
</template>

<script>
import { mapActions } from "pinia";
import { useToastMessageStore } from "@/stores/toastMessage";

import DelModal from "@/components/DelModal.vue";
import OrderModal from "@/components/OrderModal.vue";
import Pagination from "@/components/Pagination.vue";
export default {
	data() {
		return {
			orders: {},
			tempOrder: {},
			pagination: {},
			isLoading: false,
			currentPage: 1,
		};
	},
	methods: {
		...mapActions(useToastMessageStore, ["pushMessage"]),
		getOrder(currentPage = 1) {
			const api = `${import.meta.env.VITE_API}api/${
				import.meta.env.VITE_APIPATH
			}/admin/orders?page=${currentPage}`;
			this.isLoading = true;
			this.$http
				.get(api)
				.then((res) => {
					this.orders = res.data.orders;
					this.pagination = res.data.pagination;
					this.isLoading = false;
				})
				.catch((error) => {
					this.pushMessage({
						style: "danger",
						title: "錯誤訊息",
						content: error.response.data.message,
					});
					this.isLoading = false;
				});
		},
		openModal(item) {
			this.$refs.ordermodal.openOderModal();
			this.tempOrder = { ...item };
		},
		openDelOrderModal(item) {
			this.tempOrder = { ...item }; //這邊選定了itemn所以跟預覽那邊依樣要複製一份到tempOder借此下方的刪除才有id近API
			this.$refs.delbox.openModal();
		},
		delOrder() {
			const url = `${import.meta.env.VITE_API}api/${
				import.meta.env.VITE_APIPATH
			}/admin/order/${this.tempOrder.id}`;
			this.$http.delete(url).then((res) => {
				this.$refs.delbox.hideModal();
				this.getOrder();
			});
		},
		updatePaid(item) {
			//更新付款狀態
			const api = `${import.meta.env.VITE_API}api/${
				import.meta.env.VITE_APIPATH
			}/admin/order/${item.id}`;

			const paid = {
				is_paid: item.is_paid,
			}; //這個修改的API取到單一訂單之後paid夾帶這個物件去修改原本裡面的值

			this.$http
				.put(api, { data: paid })
				.then((response) => {
					this.isLoading = false;
					this.$refs.ordermodal.closeOderModal();

					this.pushMessage({
						style: "success",
						title: "更新付款狀態",
						content: response.data.message,
					});

					this.getOrder(); //還沒做根據分頁取資料
				})
				.catch((error) => {
					this.isLoading = false;
					this.pushMessage({
						style: "danger",
						title: "錯誤訊息",
						content: error.response.data.message,
					});
				});
		},
	},
	components: {
		DelModal,
		OrderModal,
		Pagination,
	},
	created() {
		this.getOrder();
	},
};
</script>

<style></style>
