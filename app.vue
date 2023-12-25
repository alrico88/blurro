<template lang="pug">
div
  vite-pwa-manifest
  .container.py-4
    .row.justify-content-center
      .col-sm-10
        .vstack.gap-4
          .row
            .col
              .vstack.gap-2
                h1.fw-bold.mb-0 Blurro
                .text-muted Apply blur to any image
                div(v-if="$pwa?.needRefresh")
                  b-button(
                    variant="warning",
                    @click="$pwa.updateServiceWorker"
                  ) #[icon(name="tabler:refresh-alert")] Update available
          app-section(title="Settings", icon="tabler:settings")
            b-form(@submit.prevent)
              .row.row-cols-1.row-cols-sm-2.g-4
                .col
                  b-form-group(label="Select a file")
                    b-form-file(
                      v-model="file",
                      ref="inputRef",
                      :accept="accepts"
                    )
                .col
                  b-form-group(label="Select a blur radius")
                    .hstack.gap-2.align-items-center
                      b-form-input(
                        type="range",
                        v-model.number="blurRadius",
                        :min="0",
                        :max="100",
                        :step="1"
                      )
                      div {{ blurRadius }}
          app-section.text-center(
            title="Result",
            :loading="loading",
            icon="tabler:photo-bolt"
          )
            canvas#result.d-none(ref="canvasRef")
            b-alert.mb-0.cursor-hover(
              :model-value="result === ''",
              @click="openFilePicker"
            )
              .vstack.gap-2.text-center
                div
                  icon(name="tabler:photo-hexagon", size="60")
                div Please select an image
            template(v-if="result !== ''")
              .vstack.gap-4
                img.img-fluid.shadow(:src="result")
                div
                  b-button(variant="outline-primary", @click="download") #[icon(name="tabler:download")] Download image
          app-section(title="About", icon="tabler:info-circle")
            the-credits
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Blurro",
  description: "Apply gaussian blur to any image online",
  keywords: "gaussian,blur,free,online",
});

const { $pwa } = useNuxtApp();

const canvasRef = templateRef<HTMLCanvasElement>("canvasRef");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inputRef = templateRef<any>("inputRef");

const file = ref<File | null>(null);

const blurRadius = ref(20);

const { result, loading } = useBlur(canvasRef, file, blurRadius);

function openFilePicker() {
  inputRef.value.element.click();
}

const accepts = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

const { download } = useDownload(canvasRef, file);

whenever(
  () => $pwa?.offlineReady,
  () => {
    console.log("Ready to work offline");
  },
);
</script>
