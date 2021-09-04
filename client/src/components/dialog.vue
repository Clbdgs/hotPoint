<template>
  <div class="dialog-img" v-show="isShow">
    <span class="delete-btn" @click="handleIshow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </span>

    <div class="image-viewer">
      <img id="imgScale" :src="src" alt="" />
    </div>
    <div class="image-mask"></div>
  </div>
</template>
<script>
export default {
  name: "dialog-modal",
  data() {
    return {};
  },
  props: ["src", "isShow"],
  methods: {
    handleIshow() {
      this.$emit("update:isShow", false);
    },
  },
};
</script>
<style scoped lang="scss">
@media (max-width: 700px) {
  .delete-btn {
    transform: scale(2) !important;
  }
  .image-viewer{    
    width:90%;
  }
}
.dialog-img {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  .image-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
    background: #000;
    z-index: 1;
  }
  .image-viewer {
    z-index: 2;
  }
  .delete-btn {
    position: absolute;
    top: 5rem;
    right: 2rem;
    color: #fff;
    cursor: pointer;
    transform: scale(3);
    margin-right: 2px;
    z-index: 2;
  }
}
</style>