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
  },
};
