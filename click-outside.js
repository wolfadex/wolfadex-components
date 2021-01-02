/* Used for detecting clicks outside of 1 or more elements.
 *
 * Add this script at the top of your HTML file and insert it into your DOM with:
 *
 *     <click-outside id="click-parent">
 *       <!-- children -->
 *     </click-outside>
 *
 * Then in your JS detect clicks outside with:
 *
 *     document
 *       .getElementById("click-parent")
 *       .addEventListener("click-outside", function() {
 *         // Handle click outside here
 *       });
 */
customElements.define(
  "click-outside",
  class extends HTMLElement {
    connectedCallback() {
      window.addEventListener("click", this.clickListener.bind(this));
    }

    disconnectedCallback() {
      window.removeEventListener("click", this.clickListener);
    }

    clickListener(event) {
      if (!this.contains(event.target)) {
        this.dispatchEvent(new CustomEvent("click-outside"));
      }
    }
  }
);
