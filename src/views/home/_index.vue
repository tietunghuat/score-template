<script setup lang="ts">
import { Popup } from 'vant'
import { ref, onMounted, watch } from 'vue'
import { Swipe, SwipeItem, Uploader, type UploaderFileListItem } from 'vant'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

//是否打開modal
const isShow = ref(true)

const myCarousel = ref(0)

const uploadValue = ref<UploaderFileListItem[]>([])

const userArr = ref<{ name: string; img: string; score: { first: string[]; last: string[] } }[]>([
  {
    name: '用戶1',
    img: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    score: {
      first: ['3', '5', '2', '6', '8', '3', '6', '12', '7'],
      last: ['6', '8', '10', '5', '11', '9', '6', '5', '3']
    }
  },
  {
    name: '用戶2',
    img: 'https://images.unsplash.com/photo-1625517682405-45c4563ad1bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    score: {
      first: ['4', '5', '2', '6', '8', '3', '6', '12', '7'],
      last: ['6', '8', '10', '5', '11', '9', '6', '5', '3']
    }
  },
  {
    name: '用戶3',
    img: 'https://images.unsplash.com/photo-1546546274-1703737efede?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    score: {
      first: ['5', '5', '2', '6', '8', '3', '6', '12', '7'],
      last: ['6', '8', '10', '5', '11', '9', '6', '5', '3']
    }
  }
])

//分數
const score = ref<{ first: string[]; last: string[] }>({
  first: ['3', '5', '2', '6', '8', '3', '6', '12', '7'],
  last: ['6', '8', '10', '5', '11', '9', '6', '5', '3']
})
const currentTemplate = ref<string>('canvas-template-0')

//模板的照片，名稱，座標
const templateArr: {
  img: string
  templateName: string
  coordinate: {
    x: number
    y_one: number
    y_two?: number
  }
}[] = [
  {
    img: '/assets/image/template/score-template-1.png',
    templateName: 'canvas-template-0',
    coordinate: {
      x: 18,
      y_one: 430
    }
  },
  {
    img: '/assets/image/template/score-template-2.png',
    templateName: 'canvas-template-1',
    coordinate: {
      x: 53,
      y_one: 58,
      y_two: 87
    }
  }
]

function openModal() {
  isShow.value = true
}

function onGetCanvasFrame() {
  const initialCoordinate = ref<{ x: number; y: number }>({ x: 50, y: 57.5 })

  //一開始
  function drawCanvas(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const img = new Image()
    img.crossOrigin = 'anonymous'
    canvas.height = 480
    canvas.width = 276
    img.src = userArr.value[0].img
    if (uploadValue.value.length > 0) {
      img.src = uploadValue.value[0].objectUrl!
    }
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const merge = new Image()
      merge.crossOrigin = 'anonymous'
      for (let i = 0; i < templateArr.length; i++) {
        if (currentTemplate.value === templateArr[i].templateName) {
          merge.src = templateArr[i].img
        }
        merge.onload = () => {
          ctx.drawImage(merge, 0, 0, canvas.width, canvas.height)
        }
      }
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bolder 8px Arial'

      const textArray = score.value.first // 您的文字陣列

      const initialX = initialCoordinate.value.x
      const initialY = initialCoordinate.value.y
      const horizontalSpacing = 13 // 水平間距
      templateArr.forEach((template, index) => {
        if (currentTemplate.value === template.templateName) {
          for (let location = 0; location < templateArr.length; location++) {
            if (currentTemplate.value === templateArr[location].templateName) {
              const initialX = templateArr[location].coordinate.x
              const initialY = templateArr[location].coordinate.y_one
              const initialYTwo = templateArr[location].coordinate.y_two
              const spacing = 13
              for (let user = 0; user < userArr.value.length; user++) {
                if (user === myCarousel.value) {
                  for (
                    let userScoreFirst = 0;
                    userScoreFirst < userArr.value[user].score.first.length;
                    userScoreFirst++
                  ) {
                    const myScore = userArr.value[user].score.first[userScoreFirst]
                    const x = initialX + userScoreFirst * spacing // 正確計算 x 座標
                    const y = initialY
                    ctx.fillText(myScore, x, y)
                  }

                  for (
                    let userScoreLast = 0;
                    userScoreLast < userArr.value[user].score.last.length;
                    userScoreLast++
                  ) {
                    const myScore = userArr.value[user].score.last[userScoreLast]
                    const x = initialYTwo
                      ? initialX + userScoreLast * spacing
                      : initialX + 130 + userScoreLast * spacing // 正確計算 x 座標
                    const y = initialYTwo ? initialYTwo : initialY
                    ctx.fillText(myScore, x, y)
                  }
                }
              }
            }
          }
        }
      })
    }
  }

  //上傳照片
  function uploadImage(e: UploaderFileListItem[]) {
    const uploadElement = e
    if (uploadElement.length < userArr.value.length) {
      userArr.value[myCarousel.value].img = uploadElement[myCarousel.value]?.objectUrl!
    }
    if (myCarousel.value > uploadElement.length) {
      userArr.value[myCarousel.value].img = uploadElement[uploadElement.length - 1]?.objectUrl!
    }
    //這裡是如果想要一直重複上傳新的照片，其用戶就會一直得到新的照片
    else {
      userArr.value[myCarousel.value].img = uploadElement[uploadElement.length - 1]?.objectUrl!
    }
    watchCanvas(myCarousel.value)
  }
  //更換模板
  function swapTemplate(params: number | 0) {
    currentTemplate.value = `canvas-template-${params}` as string
    templateArr.forEach((template, index) => {
      const canvas = document.getElementById('canvas-template-' + index) as HTMLCanvasElement
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      const img = new Image()
      img.crossOrigin = 'anonymous'
      canvas.height = 480
      canvas.width = 276
      for (let i = 0; i < userArr.value.length; i++) {
        if (i === myCarousel.value) {
          img.src = userArr.value[i].img
          img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const merge = new Image()
            merge.crossOrigin = 'anonymous'

            for (let aa = 0; aa < templateArr.length; aa++) {
              if (currentTemplate.value === templateArr[aa].templateName) {
                merge.src = templateArr[aa].img
              }
              merge.onload = () => {
                ctx.drawImage(merge, 0, 0, canvas.width, canvas.height)
              }
            }

            //字體
            ctx.fillStyle = '#FFFFFF'
            ctx.font = 'bolder 8px Arial'
            if (currentTemplate.value === template.templateName) {
              for (let location = 0; location < templateArr.length; location++) {
                if (currentTemplate.value === templateArr[location].templateName) {
                  const initialX = templateArr[location].coordinate.x
                  const initialY = templateArr[location].coordinate.y_one
                  const initialYTwo = templateArr[location].coordinate.y_two
                  const spacing = 13
                  for (let user = 0; user < userArr.value.length; user++) {
                    if (user === myCarousel.value) {
                      for (
                        let userScoreFirst = 0;
                        userScoreFirst < userArr.value[user].score.first.length;
                        userScoreFirst++
                      ) {
                        const myScore = userArr.value[user].score.first[userScoreFirst]
                        const x = initialX + userScoreFirst * spacing // 正確計算 x 座標
                        const y = initialY
                        ctx.fillText(myScore, x, y)
                      }

                      for (
                        let userScoreLast = 0;
                        userScoreLast < userArr.value[user].score.last.length;
                        userScoreLast++
                      ) {
                        const myScore = userArr.value[user].score.last[userScoreLast]
                        const x = initialYTwo
                          ? initialX + userScoreLast * spacing
                          : initialX + 130 + userScoreLast * spacing // 正確計算 x 座標
                        const y = initialYTwo ? initialYTwo : initialY
                        ctx.fillText(myScore, x, y)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  }

  //更改用戶的時候
  function watchCanvas(params: number) {
    templateArr.forEach((template, index) => {
      const canvas = document.getElementById('canvas-template-' + index) as HTMLCanvasElement
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

      const img = new Image()
      img.crossOrigin = 'anonymous'
      canvas.height = 480
      canvas.width = 276
      for (let i = 0; i < userArr.value.length; i++) {
        if (i === params) {
          img.src = userArr.value[i].img
          img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const merge = new Image()
            merge.crossOrigin = 'anonymous'
            for (let i = 0; i < templateArr.length; i++) {
              if (currentTemplate.value === templateArr[i].templateName) {
                merge.src = templateArr[i].img
              }
              merge.onload = () => {
                ctx.drawImage(merge, 0, 0, canvas.width, canvas.height)
              }
            }
            //字體
            ctx.fillStyle = '#FFFFFF'
            ctx.font = 'bolder 8px Arial'
            if (currentTemplate.value === template.templateName) {
              for (let location = 0; location < templateArr.length; location++) {
                if (currentTemplate.value === templateArr[location].templateName) {
                  const initialX = templateArr[location].coordinate.x
                  const initialY = templateArr[location].coordinate.y_one
                  const initialYTwo = templateArr[location].coordinate.y_two
                  const spacing = 13
                  for (let user = 0; user < userArr.value.length; user++) {
                    if (user === myCarousel.value) {
                      for (
                        let userScoreFirst = 0;
                        userScoreFirst < userArr.value[user].score.first.length;
                        userScoreFirst++
                      ) {
                        const myScore = userArr.value[user].score.first[userScoreFirst]
                        const x = initialX + userScoreFirst * spacing // 正確計算 x 座標
                        const y = initialY
                        ctx.fillText(myScore, x, y)
                      }

                      for (
                        let userScoreLast = 0;
                        userScoreLast < userArr.value[user].score.last.length;
                        userScoreLast++
                      ) {
                        const myScore = userArr.value[user].score.last[userScoreLast]
                        const x = initialYTwo
                          ? initialX + userScoreLast * spacing
                          : initialX + 130 + userScoreLast * spacing // 正確計算 x 座標
                        const y = initialYTwo ? initialYTwo : initialY
                        ctx.fillText(myScore, x, y)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  }

  function exportImage() {
    const canvas = document.getElementById(`${currentTemplate.value}`) as HTMLCanvasElement
    const dataURL = canvas.toDataURL()
    const link = document.createElement('a')
    link.download = 'image.png'
    link.href = dataURL
    link.click()
  }

  return {
    drawCanvas,
    swapTemplate,
    watchCanvas,
    uploadImage,
    exportImage
  }
}

onMounted(() => {
  templateArr.forEach((template, index) => {
    onGetCanvasFrame().drawCanvas('canvas-template-' + index)
  })
})
watch(myCarousel, (val) => {
  onGetCanvasFrame().watchCanvas(val)
  myCarousel.value = val
})
watch(currentTemplate, (val) => {
  currentTemplate.value = val
})
</script>

<template>
  <div class="w-full h-full bg-neutral-800 flex justify-center items-center">
    <div class="flex flex-col">
      <h1 class="text-xl text-white">計費卡模板</h1>
      <button type="button" class="bg-white p-10" @click="openModal"><span>開始使用</span></button>
    </div>
    <Popup v-model:show="isShow" class="min-w-[80%] h-[90%] max-h-[90%] rounded-lg py-5">
      <div class="w-full flex flex-col items-center h-full px-10 gap-y-2.5">
        <h1 class="w-full flex items-center justify-center font-medium text-lg">計費卡模板</h1>

        <section class="items flex select-none w-full relative justify-center h-fit">
          <Carousel
            :itemsToShow="2"
            :wrapAround="true"
            :transition="500"
            v-model="myCarousel"
            class="w-full"
          >
            <Slide v-for="(slide, index) in userArr" :key="index" class="w-full">
              <div class="w-full h-full flex items-center justify-center m-auto flex-col">
                <img :src="slide.img" class="h-24 aspect-square object-cover" />
                <span>{{ slide.name }}</span>
              </div>
            </Slide>

            <template #addons>
              <Pagination />
              <Navigation class="!bg-[rgba(69,69,69,0.32)] !text-[#ffffff] rounded-full z-50" />
            </template>
          </Carousel>
        </section>
        <section class="h-full w-full flex flex-col items-center justify-center gap-y-1.5">
          <h1 class="w-full flex items-center justify-center font-medium text-lg">選擇模板</h1>
          <div class="h-[80%] w-full flex items-center justify-center">
            <Swipe
              class="swipe h-full flex items-start w-full justify-start"
              @change="onGetCanvasFrame().swapTemplate"
              :duration="100"
            >
              <SwipeItem
                v-for="(template, index) in templateArr"
                :key="index"
                class="swipe-item w-full flex items-center justify-center mx-auto"
              >
                <canvas
                  :id="'canvas-template-' + index"
                  class="swipe-canvas transition-all ease-in duration-200"
                ></canvas>
              </SwipeItem>
            </Swipe>
          </div>
          <div><span class="font-medium text-neutral-500">或</span></div>
          <div>
            <Uploader
              @update:modelValue="onGetCanvasFrame().uploadImage"
              v-model="uploadValue"
              :previewImage="false"
              ><button
                type="button"
                class="rounded-md bg-neutral-600 font-medium text-md px-5 py-2 text-white"
              >
                上傳新照片
              </button></Uploader
            >
          </div>
        </section>
        <div class="border-t border-neutral-300 w-full my-1.5"></div>
        <footer class="w-full flex justify-end gap-x-3 h-fit pb-3">
          <button
            type="button"
            class="rounded-md border-2 border-neutral-600 font-medium text-sm px-5 py-2 text-neutral-600 hover:opacity-70 active:opacity-50 disabled:opacity-50"
          >
            取消
          </button>
          <button
            type="button"
            @click="onGetCanvasFrame().exportImage"
            class="rounded-md bg-neutral-600 font-medium text-sm px-5 py-2 text-white hover:opacity-70 active:opacity-50 disabled:opacity-50"
          >
            送出
          </button>
        </footer>
      </div>
    </Popup>
  </div>
</template>

<style scoped>
.button-container {
  position: absolute;
  top: 50%;
  left: 50%;
  right: 55%;
  transform: translate(-50%, -50%);
  width: 150px;
  z-index: 100;
}
</style>
