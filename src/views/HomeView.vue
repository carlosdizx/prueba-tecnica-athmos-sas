<template>
  <div class="home">
    <AppBar />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "@/components/AppBar.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "HomeView",
  components: {
    AppBar,
  },
});
</script>
