<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="less">
body {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
}

ul {
  padding: 0;
  list-style: none;
}

a {
  color: black;
  text-decoration: none;
}
</style>
