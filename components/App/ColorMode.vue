
<script setup>
const mode = useColorMode()
const iconName = computed(() => mode.value == 'dark' ? 'material-symbols:dark-mode-outline' : 'material-symbols-light:light-mode-outline')
const switchColorMode = () => mode.value = mode.value === 'dark' ? 'light' : 'dark';
</script>
<template>
  <div class="flex items-center h-[20px] w-[20px] justify-center cursor-pointer">
    <ClientOnly>
      <template v-slot:placeholder>
        ...
      </template>
      <Icon size="20" @click="switchColorMode" :name="iconName" />
    </ClientOnly>
  </div>

</template>

<style lang="scss" scoped></style>
