<template>
    <div class="main-container">
        <header><slot name="header"/></header>
        <div class="main-center"><slot name="main"/></div>
    </div>
</template>

<style scoped lang="less">
.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.main-center {
    flex: 1;
}
</style>
