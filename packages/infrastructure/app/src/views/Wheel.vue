<script setup lang="ts">
import { computed, inject, onMounted, ref, type Ref } from 'vue'
import { PARTS_CONTROLLER_FACTORY, ADD_PART_CONTROLLER_FACTORY } from '@/DependencyInjection'

import CreatePartForm from '@/components/forms/CreatePartForm.vue'
import type { PartsPresenterVM } from '@ichtus/breakfeastwheel-adapters'
import type { Part } from '@ichtus/breakfeastwheel-domain'

export interface TmpPart {
  owner: string
  creator: string
  tmpPart: boolean
  color: string
}

const displayWheelController = inject(PARTS_CONTROLLER_FACTORY)!.build()
const addPartInWheelController = inject(ADD_PART_CONTROLLER_FACTORY)!.build()

const displayWheelVM = ref(displayWheelController.vm)
const addPartInWheelVM = ref(addPartInWheelController.vm)

const actualParts = ref<TmpPart[] | Part[]>([])

const grad = ref()
const isOnCreatedPart = ref<boolean>(false)
const tmpPart = computed(() => (actualParts as Ref<TmpPart[]>).value.find((part) => part.tmpPart))

const partSlice = computed(() => 360 / actualParts.value.length)
const partOffset = computed(() => Math.floor(180 / actualParts.value.length))

onMounted(() => {
  displayWheelController.subscribeVM((updateVM: PartsPresenterVM) => {
    displayWheelVM.value = { ...updateVM }
    console.log(displayWheelVM.value)
    if (displayWheelVM.value.data?.parts) {
      actualParts.value = displayWheelVM.value.data.parts
      grad.value = displayWheelVM.value.data.gradiant.join(',').replace(/"/g, '')

      document
        .querySelector('.spinner')
        ?.setAttribute('style', `background: conic-gradient(from -90deg, ${grad.value})`)
    }
  })
  displayWheelController.fetchParts()
})

function createPart() {
  isOnCreatedPart.value = true
  const isCreatedPartExist = (actualParts as Ref<TmpPart[]>).value.find((part) => part.tmpPart)

  if (isOnCreatedPart.value && isCreatedPartExist) {
    return
  }

  ;(actualParts as Ref<TmpPart[]>).value.push({
    owner: 'Owner name',
    creator: 'Creator name',
    tmpPart: true,
    color: generateRandomHexColor()
  })
}

function create() {
  addPartInWheelController.create()
  displayWheelController.fetchParts()
}

function resetCreateProcess() {
  isOnCreatedPart.value = false
  ;(actualParts as Ref<TmpPart[]>).value.pop()
}

function resetWheel() {
  displayWheelController.deleteParts()
  displayWheelController.fetchParts()
}

function generateRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return `#${randomColor.padStart(6, '0')}`
}
</script>

<template>
  <div class="nad-bfw__content-wheel">
    <div class="nad-bfw__wheel">
      <q-btn v-if="actualParts.length" @click="resetWheel" label="Clear" color="deep-orange" />

      <ul
        @click="createPart"
        :class="{ 'created-part': isOnCreatedPart }"
        class="nad-bfw__wheel--spinner spinner"
      >
        <template v-if="actualParts.length > 0">
          <li
            v-for="(part, indexPart) of actualParts"
            class="part"
            :class="{ 'created-part': isOnCreatedPart && !(part as Part).id }"
            :style="`--rotate: ${partSlice * indexPart * -1 - partOffset}deg`"
          >
            <div class="q-mr-md">{{ part.owner }}</div>
            <div>{{ part.creator }}</div>
          </li>
        </template>
      </ul>
    </div>

    <create-part-form
      v-if="isOnCreatedPart && tmpPart"
      @startCreatePartProcess="create"
      @cancelCreatePartProcess="resetCreateProcess"
      :add-part-in-wheel-v-m="addPartInWheelVM"
      :add-part-in-wheel-controller="addPartInWheelController"
      :tmp-part="tmpPart"
      :is-on-created-part="isOnCreatedPart"
    />
  </div>
</template>

<style lang="scss">
.nad-bfw__content-wheel {
  display: flex;
  place-items: center;
  overflow: hidden;
  justify-content: center;
  height: 100vh;
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
    // transform: rotate(calc(var(--rotate, 25) * 1deg));
    border-radius: 50%;
    box-shadow: inset 0 0 0 calc(var(--size) / 40) hsl(0deg 0% 0% / 0.06);

    &.created-part {
      background: conic-gradient(from -90deg, red 0 100% !important);
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
  flex-wrap: wrap;
  width: 50%;
  transform-origin: center right;
  transform: rotate(var(--rotate));
  user-select: none;

  &.created-part {
    --rotate: -247deg;
    background-color: red !important;
  }
}
li div {
  transform: rotate(180deg);
}
</style>
