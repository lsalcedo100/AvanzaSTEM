// Guards against gallery photos silently changing when new ones are uploaded.
//
//     npm test
//
// Photos shown outside the gallery grid are pinned by Cloudinary number, and
// the homepage carousel and teaser read from a frozen 174-photo list. Bumping
// TOTAL_IMAGES after an upload must not move any of them.

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  PRE_EXPANSION_TOTAL_IMAGES,
  TOTAL_IMAGES,
  codingFeatureImage,
  galleryPhoto,
  preExpansionGalleryImages,
} from "./gallery-photos.ts"

test("the pre-expansion list is frozen at the June 2026 upload count", () => {
  assert.equal(PRE_EXPANSION_TOTAL_IMAGES, 174)
  assert.equal(preExpansionGalleryImages.length, 174)
  assert.equal(preExpansionGalleryImages[0].id, "00174")
  assert.equal(preExpansionGalleryImages[173].id, "00001")
})

test("the homepage teaser photos do not move when TOTAL_IMAGES grows", () => {
  assert.ok(TOTAL_IMAGES >= PRE_EXPANSION_TOTAL_IMAGES)
  assert.deepEqual(
    preExpansionGalleryImages.slice(0, 8).map((photo) => photo.id),
    ["00174", "00173", "00172", "00171", "00170", "00169", "00168", "00167"],
  )
})

test("galleryPhoto addresses one photo by zero-padded Cloudinary number", () => {
  const photo = galleryPhoto(377)
  assert.equal(photo.id, "00377")
  assert.ok(photo.full.endsWith("/gallery-00377.jpg"))
  assert.ok(photo.thumb.endsWith("/gallery-00377.jpg"))
  assert.ok(photo.download.includes("fl_attachment:avanza-stem-gallery-00377"))
})

test("the coding feature photo stays on its Cloudinary number", () => {
  assert.equal(codingFeatureImage.id, "00187")
})
