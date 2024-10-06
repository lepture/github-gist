import iframeCode from './iframe'
import resetCSS from './reset.css'
import darkCSS from './dark.css'

customElements.define('github-gist', class extends HTMLElement {
  constructor() {
    super()
    this.ready = false
    this.channel = new MessageChannel()
  }

  connectedCallback() {
    const shadow = this.attachShadow({mode: 'closed'})
    const iframe = document.createElement('iframe')

    const timestamp = Date.now()
    const path = this.getAttribute('path')

    const message = this.getAttributeMessage()
    message.timestamp = timestamp

    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('width', '100%')
    iframe.addEventListener('load', () => {
      iframe.contentWindow.postMessage(message, '*', [this.channel.port2])
    })

    this.channel.port1.onmessage = (event) => {
      if (timestamp == event.data.timestamp) {
        this.ready = true
        iframe.style.height = event.data.height + 'px'
      }
    }
    const fontSize = getComputedStyle(this.parentElement).fontSize
    const baseCSS = `<style>${resetCSS}body .gist .highlight{font-size:${fontSize}}</style>`
    iframe.srcdoc = `${baseCSS}<script src="https://gist.github.com/${path}.js"></script><script>${iframeCode}</script>`

    const style = document.createElement('style')
    style.textContent = ':host{display:flex;overflow: hidden;}'
    shadow.append(style)
    shadow.appendChild(iframe)
  }

  static get observedAttributes() {
    return ['theme', 'stylesheet']
  }

  attributeChangedCallback() {
    if (this.ready) {
      this.channel.port1.postMessage(this.getAttributeMessage())
    }
  }

  disconnectedCallback() {
    this.channel.port1.close()
  }

  getAttributeMessage() {
    const message = { type: 'github-gist' }
    const theme = this.getAttribute('theme')
    const stylesheet = this.getAttribute('stylesheet')
    if (theme === 'dark' && !stylesheet) {
      message.theme = theme
      message.css = darkCSS
    } else {
      if (theme) {
        message.theme = theme
      }
      if (stylesheet) {
        message.stylesheet = stylesheet
      }
    }
    return message
  }
})
