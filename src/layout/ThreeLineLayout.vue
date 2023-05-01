<template>
  <div class="three-line-container">
      <aside class="three-line-aside"><slot name="left"/></aside>
      <main><slot name="main"/></main>
      <aside class="three-line-aside"><slot name="right"/></aside>
  </div>
</template>

<style scoped lang="less">
.three-line-container {
  height: 100%;
  display: flex;
}

.three-line-aside {
  flex: 0 0 15%;
}

main {
  flex: 1;
}
</style>
