<template>
  <div class="login">
    <AuthLogin />
  </div>
</template>

<script lang="ts">
import AuthLogin from "@/components/AuthLogin.vue";
import Vue from "vue";
export default Vue.extend({
  name: "LoginView",
  components: {
    AuthLogin,
  },
});
</script>

<style scoped></style>
