/**
 * Fetch a font binary from Google Fonts, for the contexts that rasterize text
 * themselves (the social card, the logo PNG generator) and so cannot rely on
 * `next/font`.
 *
 * Returns null on any failure — an offline or network-blocked build still
 * produces output, just in a system face rather than the brand face.
 *
 * `text` narrows the request to the glyphs actually being drawn, which keeps
 * the download to a few kilobytes.
 */
export async function googleFont(query, text) {
  try {
    const api = `https://fonts.googleapis.com/css2?family=${query}&text=${encodeURIComponent(text)}`
    const css = await fetch(api, {
      // Google serves woff2 to modern UA strings; satori needs ttf/otf.
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    }).then((r) => r.text())

    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    if (!url) return null
    return await fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}
