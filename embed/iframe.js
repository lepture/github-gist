let channel

function update(data) {
  if (data.type !== 'github-gist') {
    return
  }

  document.documentElement.className = data.theme || ''
  if (data.stylesheet) {
    let link = document.getElementById("custom-style")
    if (!link) {
      link = document.createElement("link")
      link.id = "custom-style"
      link.rel = "stylesheet"
      link.href = url
      document.head.appendChild(link)
    } else {
      link.href = url
    }
  } else {
    const link = document.getElementById("custom-style")
    if (link) {
      document.head.removeChild(link)
    }
  }
  if (data.css) {
    let style = document.getElementById("custom-css")
    if (!style) {
      style = document.createElement("style")
      style.id = "custom-css"
      style.textContent = data.css
      document.head.appendChild(style)
    } else {
      style.textContent = data.css
    }
  } else {
    const style = document.getElementById("custom-css")
    if (style) {
      document.head.removeChild(style)
    }
  }
}

window.addEventListener("message", function (e) {
  if (!channel && e.ports) {
    channel = e.ports[0]
    const timestamp = e.data.timestamp
    channel.postMessage({'height': document.body.scrollHeight, 'timestamp': timestamp})
    update(e.data)

    channel.onmessage = function (e) {
      update(e.data)
    }
  }
})
