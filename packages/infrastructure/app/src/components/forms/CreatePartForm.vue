<script setup lang="ts">
import type { TmpPart } from '@/views/Wheel.vue'
import type { AddPartController, AddPartPresenterVM } from '@ichtus/breakfeastwheel-adapters'

const props = defineProps<{
  tmpPart: TmpPart
  addPartInWheelController: AddPartController
  addPartInWheelVM: AddPartPresenterVM
}>()

function validateOwnerName(input: any) {
  props.addPartInWheelController.validateOwnerName(input)
}

function validateCreatorName(input: any) {
  props.addPartInWheelController.validateCreatorName(input)
}

function validateColor(input: any) {
  props.addPartInWheelController.validateColor(input)
}
</script>

<template>
  <div class="nad-bfw__create-form q-ml-md">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="props.tmpPart.owner"
        @update:model-value="validateOwnerName"
        label="Owner name"
        hint="Owner name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="props.tmpPart.creator"
        @update:model-value="validateCreatorName"
        label="Creator name"
        hint="Creator name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />


      <q-input
        filled
        v-model="props.tmpPart.color"
        @update:model-value="validateColor"
        label="Color"
        hint="Color"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-btn
        @click="$emit('startCreatePartProcess')"
        :disable="!props.addPartInWheelVM.canCreatePart"
        label="Add"
        color="primary"
      />
    </q-form>
  </div>
</template>

<style scoped lang="scss"></style>
