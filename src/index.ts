import { splitChunks, parseChunk, formatWebVTT } from "./utils";
import { Subtitle } from "./types";

/**
 * Parse the contents of a .srt file to an array of subtitle objects.
 * @param {string} srt
 */
export function fromSrt(srt: string): Array<Subtitle> {
  const lines = srt.replace(/\r\n/g, "\n").split("\n");
  const chunks = splitChunks(lines).filter((chunk) => chunk.length >= 3);
  const objects = chunks.map(parseChunk);
  return objects;
}

export function toWebVTT(subs: Array<Subtitle>, title?: string): string {
  return `WEBVTT${title ? " " + title : ""}

${subs.map(formatWebVTT).join("\n\n")}`;
}
