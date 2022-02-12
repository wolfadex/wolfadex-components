/* Used for detecting clicks outside of 1 or more elements.
 *
 * Add this script at the top of your HTML file and insert it into your DOM with:
 *
 *     <simple-modal open="true">
 *       <!-- children -->
 *     </simple-modal>
 *
 * Then in your JS detect clicks outside with:
 *
 *     document
 *       .getElementById("click-parent")
 *       .addEventListener("simple-modal", function() {
 *         // Handle click outside here
 *       });
 */
const modalTemplate = document.createElement("template");

modalTemplate.innerHTML = "<dialog><slot></slot></dialog>";

customElements.define(
  "simple-modal",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));
      this._dialogElement = this.shadowRoot.children[0];
    }

    static get observedAttributes() {
      return ["open", "class", "style"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "open") {
        if (newValue !== oldValue) {
          if (newValue === "true") {
            this._dialogElement.showModal();
          } else {
            this._dialogElement.closeModal();
          }
        }
      } else {
        this._dialogElement.setAttribute(name, newValue);
      }
    }
  }
);
