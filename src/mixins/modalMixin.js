import BsModal from "bootstrap/js/dist/modal";
//在這邊把Ｍodal本體取出來
export default {
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new BsModal(this.$refs.modal);
  }, //不一定要在data宣告modal,在這邊mounted宣告並直接賦予
  //當然在data也可以先聲明modal只是會多一個步驟
};
