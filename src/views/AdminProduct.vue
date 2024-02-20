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
            <tr v-for="item, in products" :key="item.id">
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
                    @click="openModal('delete', item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination :pages="pagination" @emit-pages="getData"></pagination>
      </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
	data() {
    return {
      products: [],
      catchProduct: {
        imagesUrl: [],
      },
      isNew: false,
      pagination: {},
    };
  },
  methods:{
	getData(page = 1) {
    const api =`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_APIPATH}/admin/products?page=${page}`
    this.$http
        .get(api)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert("找不到資訊");
        });
    },
    openModal(isNew, item) {
      if (isNew === "new") {
        //是新的就給予全空的catchProduct
        this.catchProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === "edit") {
        //是既有的就複製catchProduct本身
        this.catchProduct = { ...item };
        this.isNew = false; // 方便去API的時候可以辨別資料要post 還是 put
        productModal.show();
      } else if (isNew === "delete") {
        this.catchProduct = { ...item };
        delProductModal.show();
      }
    },
  },
	components: {
		Pagination
	},
  created() {
    this.getData();
  },
};
</script>


<style></style>
