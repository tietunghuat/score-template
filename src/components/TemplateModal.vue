<script setup lang="ts">
import { Popup } from 'vant'

interface Props {
  show: boolean
}
const prop = withDefaults(defineProps<Props>(), {
  show: false
})
</script>

<template>
  <Popup v-model:show="prop.show">
    <div>123</div>
  </Popup>
</template>
<style scoped></style>
