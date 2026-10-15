// Guards the URL rewriting that keeps Cloudinary photos off Vercel's image
// optimizer (see cloudinary-loader.ts).
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { cloudinaryLoader, isCloudinaryUrl, snapCloudinaryWidth } from "./cloudinary-loader.ts"

const base = "https://res.cloudinary.com/dw4uprmkk/image/upload/"

test("recognises Cloudinary upload URLs only", () => {
  assert.equal(isCloudinaryUrl(`${base}f_auto,q_auto:good,w_1600/gallery-00187.jpg`), true)
  assert.equal(isCloudinaryUrl("/images/home/featured-bridge.jpg"), false)
  assert.equal(isCloudinaryUrl("https://example.com/image/upload/x.jpg"), false)
})

test("snaps requested widths to the Cloudinary ladder", () => {
  assert.equal(snapCloudinaryWidth(16), 128)
  assert.equal(snapCloudinaryWidth(384), 384)
  assert.equal(snapCloudinaryWidth(750), 828)
  assert.equal(snapCloudinaryWidth(3840), 1600)
})

test("replaces the fixed width and keeps the existing quality", () => {
  assert.equal(
    cloudinaryLoader({ src: `${base}f_auto,q_auto:good,w_1600/gallery-00187.jpg`, width: 640 }),
    `${base}f_auto,q_auto:good,w_640/gallery-00187.jpg`,
  )
})

test("keeps crop, gravity and rotation tokens", () => {
  assert.equal(
    cloudinaryLoader({ src: `${base}a_0,c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_400/gallery-00096.jpg`, width: 200 }),
    `${base}a_0,c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_256/gallery-00096.jpg`,
  )
})

test("adds format and quality when the source has no transformation", () => {
  assert.equal(
    cloudinaryLoader({ src: `${base}gallery-00001.jpg`, width: 3840 }),
    `${base}f_auto,q_auto:good,w_1600/gallery-00001.jpg`,
  )
})

test("keeps a version segment after the transformation", () => {
  assert.equal(
    cloudinaryLoader({ src: `${base}v1700000000/gallery-00001.jpg`, width: 128 }),
    `${base}f_auto,q_auto:good,w_128/v1700000000/gallery-00001.jpg`,
  )
})

test("honours an explicit quality prop", () => {
  assert.equal(
    cloudinaryLoader({ src: `${base}f_auto,q_auto:good,w_1600/gallery-00187.jpg`, width: 640, quality: 50 }),
    `${base}f_auto,q_50,w_640/gallery-00187.jpg`,
  )
})

test("leaves non-Cloudinary sources untouched", () => {
  assert.equal(cloudinaryLoader({ src: "/images/about/liam.jpeg", width: 256 }), "/images/about/liam.jpeg")
})
