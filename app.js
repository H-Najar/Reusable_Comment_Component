// Define a custom element
class UserInfo extends HTMLElement {
  // Set up the properties we'll want to use later
  constructor() {
    // Whenever calling constructor on an extended class, you need to call super first to run the base class's constructor
    super();
    this.name;
  }

  // Look for changes in the "name" attribute in HTML
  static get observedAttributes() {
    return ["src", "description"];
  }

  // Do something when an attribute has changed
  attributeChangedCallback(property, oldValue, newValue) {
    // If nothing's changed, stop execution
    if (oldValue === newValue) return;

    // If it's the name property, change the correct value
    if (property === "name") {
      // If name exists, set it's textContent to the name
      // It shouldn't exist until connectedCallback is fired, which may happen after this is run for the first time
      if (this.namePlaceholder) {
        this.namePlaceholder.textContent = newValue;
      }
    }
    if (property === "src") {
      this.imgSource.src = newValue;
    }
    if (property === "description") {
      this.imgDescription.textContent = newValue;
    }
  }

  connectedCallback() {
    // Create a new "open" shadow root so we can manipulate it
    const shadow = this.attachShadow({ mode: "open" });
    // Get the template we made in our HTML and clone it so we can use it in our component
    const template = document
      .getElementById("SUPERAWESOME")
      .content.cloneNode(true);

    // Add the template to our shadow root
    shadow.append(template);

    // Save the element we want to use for "name" so we can set it later
    this.namePlaceholder = this.shadowRoot.querySelector("span");
    this.imgSource = this.shadowRoot.querySelector("img");
    this.imgDescription = this.shadowRoot.getElementById("description");

    // Get initial value
    const name = this.getAttribute("name");
    if (name) {
      this.namePlaceholder.textContent = name;
    }

    const img = this.getAttribute("src");
    if (img) {
      this.imgSource.src = img;
    }

    const descript = this.getAttribute("description");
    if (descript) {
      this.imgDescription.textContent = descript;
    }
  }
}

customElements.define("user-info", UserInfo);

document.addEventListener("DOMContentLoaded", () => {
  const image = document.querySelector("#image");
  const imageSource = document.querySelector("#image-source");
  const description = document.querySelector("#description");

  image.addEventListener("input", (e) => {
    imageSource.setAttribute("src", e.target.value);
  });

  description.addEventListener("input", (e) => {
    imageSource.setAttribute("description", e.target.value);
  });
});
