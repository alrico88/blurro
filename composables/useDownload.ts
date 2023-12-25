import is from "@sindresorhus/is";
import { last, slice } from "lodash-es";

export function useDownload(
  canvas: Ref<HTMLCanvasElement>,
  file: Ref<File | null>,
) {
  function download() {
    if (is.nullOrUndefined(file.value)) {
      return;
    }

    const link = document.createElement("a");

    const popped = file.value.name.split(".");
    const extension = last(popped);
    const filename = slice(popped, 0, popped.length - 1);

    link.download = `${filename.join(".")}_blurred.${extension}`;
    link.href = canvas.value.toDataURL();

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return {
    download,
  };
}
