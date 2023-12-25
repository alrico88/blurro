import is from "@sindresorhus/is";
import glur from "glur";

export function useBlur(
  canvas: Ref<HTMLCanvasElement>,
  file: Ref<File | null>,
  blur: Ref<number>,
) {
  const loading = ref(false);

  const result = ref("");

  debouncedWatch(
    [file, blur],
    async ([f, b]) => {
      loading.value = true;

      if (is.nullOrUndefined(f)) {
        loading.value = false;
        return;
      }

      const asObjectUrl = URL.createObjectURL(f as Blob);

      const image = await useImageData(asObjectUrl);
      const { height, width } = image;
      canvas.value.width = width;
      canvas.value.height = height;

      const ctx = canvas.value.getContext("2d");

      if (is.nullOrUndefined(ctx)) {
        return;
      }

      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, width, height);

      glur(imageData.data, image.width, image.height, b);

      ctx.putImageData(imageData, 0, 0);

      result.value = canvas.value.toDataURL("image/png");

      loading.value = false;
    },
    {
      debounce: 100,
    },
  );

  return {
    result,
    loading,
  };
}
