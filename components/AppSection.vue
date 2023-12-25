<template lang="pug">
section.row
  .col
    separator.mb-3(:text="title", :icon-name="icon")
      template(#right, v-if="loading")
        b-badge(variant="primary") Loading...
    slot
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    icon?: string;
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);
</script>
