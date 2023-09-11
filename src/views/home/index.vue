<script setup lang="ts">
import { onMounted, ref } from 'vue'
const canvasRef = ref<HTMLCanvasElement | null>(null)

const ctx = ref<CanvasRenderingContext2D | null>(null)

const image = new Image()

const userArr = [
  {
    name: 'boat',
    img: 'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    level: 'prev'
  },
  {
    name: 'rocket',
    img: 'https://www.splashlearn.com/math-vocabulary/wp-content/uploads/2022/05/image5-888x1024.jpg',
    level: 'active'
  }
] as const

function draw(src?: string) {
  if (!src) return
  image.src = src

  ctx.value?.drawImage(image, 0, 0, 300, 500)
}

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d')
  }

  requestAnimationFrame(() => {
    draw()
  })
})
</script>

<template>
  <div class="grid place-items-center my-14 rounded-md">
    <canvas ref="canvasRef" class="w-[300px] aspect-[1/2] rounded-md border"></canvas>
    <button
      class="bg-zinc-900 rounded-md px-4 py-2 text-white font-medium"
      @click="draw(userArr[0].img)"
    >
      button
    </button>
  </div>
</template>
<style scoped></style>
