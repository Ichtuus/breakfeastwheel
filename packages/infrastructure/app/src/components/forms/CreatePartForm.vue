<script setup lang="ts">
const props = defineProps<{
  isOnCreatedPart: boolean
}>()
</script>

<template>
  <div class="nad-bfw__create-form q-ml-md" v-if="props.isOnCreatedPart">
    <q-form class="q-gutter-md">
      <q-input
        filled
        label="Owner name"
        hint="Owner name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        label="Creator name"
        hint="Creator name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </q-form>
  </div>
</template>

<style scoped lang="scss"></style>
