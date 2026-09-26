// Gallery photo addressing. Pure data, no React, so `npm test` can import it
// (see gallery-photos.test.ts).
//
// Photos live on Cloudinary as gallery-00001.jpg ... gallery-NNNNN.jpg, and a
// new upload takes the next number. The gallery grid shows them newest first,
// so every upload shifts that order by one. Anything outside the grid that
// shows a particular photo must therefore address it by Cloudinary number
// (`galleryPhoto(377)`), never by its position in a list. The newest-first
// list itself is private to gallery.tsx for that reason.
//
// TOTAL_IMAGES is the one value to bump after uploading photos.
// PRE_EXPANSION_TOTAL_IMAGES is frozen: the homepage carousel and teaser pick
// from the 174 photos that existed in June 2026, and the test fails if it moves.

const CLOUD_NAME = "dw4uprmkk"
export const TOTAL_IMAGES = 393
export const PRE_EXPANSION_TOTAL_IMAGES = 174

export type GalleryItem = {
  id: string
  thumb: string
  thumbSrcSet: string
  blur: string
  full: string
  download: string
  preload: string
  /** legacy alias used by homepage gallery teaser */
  thumbnail: string
}

export const tx = (num: string, transforms: string) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/gallery-${num}.jpg`

const buildItem = (galleryIndex: number): GalleryItem => {
  const num = String(galleryIndex).padStart(5, "0")
  const thumbRotation = num === "00092" || num === "00091" || num === "00096" ? "a_0," : ""
  const fullRotation = num === "00096" ? "a_0," : ""
  const thumb = tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_400`)
  return {
    id: num,
    thumb,
    thumbnail: thumb,
    thumbSrcSet: [
      `${tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_240`)} 240w`,
      `${tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_360`)} 360w`,
      `${tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_480`)} 480w`,
      `${tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_640`)} 640w`,
    ].join(", "),
    blur: tx(num, `${thumbRotation}e_blur:2000,q_30,f_auto,w_24,c_fill,ar_1:1,g_auto`),
    full: tx(num, `${fullRotation}f_auto,q_auto:good,w_1600`),
    download: tx(num, `${fullRotation}fl_attachment:avanza-stem-gallery-${num},q_auto:good,w_2000`),
    preload: tx(num, `${fullRotation}f_auto,q_auto:eco,w_900`),
  }
}

// Curated/preview surfaces use the old newest-first set so adding new
// Cloudinary uploads does not silently change their chosen photos.
export const preExpansionGalleryImages: GalleryItem[] = Array.from(
  { length: PRE_EXPANSION_TOTAL_IMAGES },
  (_, i) => buildItem(PRE_EXPANSION_TOTAL_IMAGES - i),
)

// Pinned photo (kids gathered around a laptop) used for the "Coding" feature
// cards: Featured Guide, Workshop Two, and the home "What students do" card.
// Anchored to a fixed Cloudinary number, NOT an array index, so uploading new
// gallery photos never swaps it out.
export const codingFeatureImage: GalleryItem = buildItem(187)

// Pin any single gallery photo by its Cloudinary number for use outside the
// gallery grid. The number never changes; a position in a newest-first list
// does, every time new photos are uploaded.
export const galleryPhoto = (cloudinaryNumber: number): GalleryItem =>
  buildItem(cloudinaryNumber)
