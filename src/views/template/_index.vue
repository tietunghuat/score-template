<script setup lang="ts">
import { onMounted } from 'vue'

const templateArr: { img: string }[] = [
  {
    img: '/assets/image/template/score-template-1.png'
  },
  {
    img: '/assets/image/template/score-template-2.png'
  }
]

function draw() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  var img = new Image()
  canvas.height = 600
  canvas.width = 350
  img.src = 'https://a.espncdn.com/i/headshots/nba/players/full/6430.png'
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    var merge = new Image()
    merge.src = '/assets/image/template/score-template-1.png'
    merge.onload = () => {
      ctx.drawImage(merge, 0, 0, canvas.width, canvas.height)
      const link = document.createElement('a')
      link.download = 'image.png'
      link.click()
    }
  }
}
onMounted(() => {
  draw()
})
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full flex items-center justify-center">
      <canvas id="canvas" class="w-fit h-fit"></canvas>
    </div>
  </div>
</template>
<style scoped></style>
