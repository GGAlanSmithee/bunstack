const isRelative = (url) => {
  if (!url) return false
  if (url.startsWith("/")) return true

  return (
    !url.startsWith("http") &&
    !url.startsWith("//") &&
    !url.startsWith("mailto:") &&
    !url.startsWith("#") &&
    !url.startsWith("tel:") &&
    !url.startsWith("javascript:") &&
    !url.startsWith("data:") &&
    !url.startsWith("ftp:") &&
    !url.startsWith("file:") &&
    !url.startsWith("chrome-extension:") &&
    !url.startsWith("chrome-search:") &&
    !url.startsWith("chrome-extension-resource:") &&
    !url.startsWith("chrome-devtools:") &&
    !url.startsWith("view-source:") &&
    !url.startsWith("about:")
  )
}

// do: use proper events to re-set up the anchor tags

window.setupAnchorTags = () => {
  // add event listener to all links
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href")
      console.log("is relative", isRelative(href))

      if (isRelative(href)) {
        event.preventDefault()
        event.stopPropagation()

        window.history.pushState(null, null, href)

        fetch(href)
          .then((response) => response.text())
          .then((html) => {
            const htmlDocument = document.createElement("html")
            const bootstrapScripts = htmlDocument.querySelectorAll('script');

            console.log('bootstrap Scripts', bootstrapScripts)

            htmlDocument.innerHTML = html

            const newContent = htmlDocument.querySelector("#root")?.innerHTML

            const currentRoot = document.querySelector("#root")
            if (currentRoot && newContent) {
              currentRoot.innerHTML = newContent
              window.setupAnchorTags()
            }
          })
      }
    })
  })
}

window.onload = () => {
  // window.setupAnchorTags()
}
