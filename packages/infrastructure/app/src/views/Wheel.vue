<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { PARTS_CONTROLLER_FACTORY } from '@/DependencyInjection'

import CreatePartForm from '@/components/forms/CreatePartForm.vue'

function generateRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return `#${randomColor.padStart(6, '0')}`
}

const parts = [
  {
    text: '10% Off Sticker Price',
    color: generateRandomHexColor(),
    reaction: 'dancing'
  },
  {
    text: 'Free Car',
    color: generateRandomHexColor(),
    reaction: 'shocked'
  },
  {
    text: 'No Money Down',
    color: generateRandomHexColor(),
    reaction: 'shocked'
  },
  {
    text: 'Half Off Sticker Price',
    color: generateRandomHexColor(),
    reaction: 'shocked'
  },
  {
    text: 'Free DIY Carwash',
    color: generateRandomHexColor(),
    reaction: 'dancing'
  },
  {
    text: 'Eternal Damnation',
    color: generateRandomHexColor(),
    reaction: 'laughing'
  },
  {
    text: 'Used Travel Mug',
    color: generateRandomHexColor(),
    reaction: 'laughing'
  },
  {
    text: 'One Solid Hug',
    color: generateRandomHexColor(),
    reaction: 'dancing'
  }
]

const partSlice = 360 / parts.length
const partOffset = Math.floor(180 / parts.length)

function createPartNodes() {
  parts.forEach(({ text, color, reaction }, i) => {
    const rotation = partSlice * i * -1 - partOffset
    if (document.querySelector('.spinner')) {
      document.querySelector('.spinner')?.insertAdjacentHTML(
        'beforeend',
        `<li class="part" data-reaction=${reaction} style="--rotate: ${rotation}deg; ">
        <span class="text">${text}</span>
      </li>`
      )
    }
  })
}

const createConicGradient = () => {
  if (document.querySelector('.spinner')) {
    document.querySelector('.spinner')?.setAttribute(
      'style',
      `background: conic-gradient(
      from -90deg,
      ${parts
        .map(({ color }, i) => `${color} 0 ${(100 / parts.length) * (parts.length - i)}%`)
        .reverse()}
    );`
    )
  }
}

const wheelController = inject(PARTS_CONTROLLER_FACTORY)!.build()
const vm = ref(wheelController.vm)
const actualParts = ref([])
const isOnCreatedPart = ref(false)

onMounted(() => {
  // createPartNodes()
  // createConicGradient()

  wheelController.subscribeVM((updateVM) => {
    vm.value = { ...updateVM }
    console.log('merde', vm.value)
  })
  wheelController.fetchParts()
})

function createPart() {
  isOnCreatedPart.value = true
  actualParts.value.push({ ownerName: 'Jean' })
}
</script>

<template>
  actualParts {{ actualParts }}
  <div class="nad-bfw__content-wheel">
    <div class="nad-bfw__wheel">
      <ul
        @click="createPart"
        :class="{ 'created-part': isOnCreatedPart }"
        class="nad-bfw__wheel--spinner spinner"
      >
        <template v-if="actualParts.length > 0">
          <li v-for="part of actualParts" class="part" :class="{ 'created-part': isOnCreatedPart }">
            <span class="text">{{ part.ownerName }}</span>
          </li>
        </template>
      </ul>
    </div>

    <create-part-form :is-on-created-part="isOnCreatedPart" />
  </div>
</template>

<style lang="scss">
.nad-bfw__content-wheel {
  display: flex;
  place-items: center;
  overflow: hidden;
  justify-content: center;
}

.nad-bfw__wheel {
  --size: clamp(250px, 80vmin, 700px);
  --lg-hs: 0 3%;
  --lg-stop: 50%;
  --lg: linear-gradient(
    hsl(var(--lg-hs) 0%) 0 var(--lg-stop),
    hsl(var(--lg-hs) 20%) var(--lg-stop) 100%
  );
  font-family: 'Girassol', sans-serif;
  font-size: calc(var(--size) / 21);
  line-height: 1;
  text-transform: lowercase;

  &--spinner {
    cursor: pointer;
    display: grid;
    align-items: center;
    grid-template-areas: 'spinner';
    width: var(--size);
    height: var(--size);
    transform: rotate(calc(var(--rotate, 25) * 1deg));
    border-radius: 50%;
    box-shadow: inset 0 0 0 calc(var(--size) / 40) hsl(0deg 0% 0% / 0.06);

    &.created-part {
      background: conic-gradient(from -90deg, red 0 100%);
    }
  }
}

.nad-bfw__wheel > * {
  grid-area: spinner;
}

.spinner * {
  grid-area: spinner;
}

.part {
  position: relative;
  display: flex;
  align-items: center;
  width: 50%;
  height: 50%;
  transform-origin: center right;
  transform: rotate(var(--rotate));
  user-select: none;

  &.created-part {
    --rotate: -247deg;
  }
}
</style>
