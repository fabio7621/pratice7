<template>
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
          <!-- <td>{{ $filters.date(item.create_at) }}</td> -->
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
              <button class="btn btn-outline-danger btn-sm" type="button">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :temp-order="tempOrder" ref="ordermodal"></OrderModal>
</template>

<script>
import DelModal from "@/components/DelModal.vue";
import OrderModal from "@/components/OrderModal.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      orders: {},
      tempOrder: {},
    };
  },
  methods: {
    getOrder() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_APIPATH
      }/admin/orders`;
      this.$http
        .get(api)
        .then((res) => {
          this.orders = res.data.orders;
        })
        .catch((err) => {
          alert("找不到資訊");
        });
    },
    openModal(item) {
      this.$refs.ordermodal.openOderModal();
      this.tempOrder = { ...item };
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
