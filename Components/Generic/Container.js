class Container {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();
        this.applyOptions(this.options);
    }

    generateContent() {
        let container = document.createElement("div");
        return container;
    }

    applyOptions(options) {
		//  Generic options application
		this.content.id = (options && options.id) ? options.id : (this.content.id ? this.content.id : "Container");
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }

    appendChild(child) { this.content.appendChild(child); }
    removeChild(child) { this.content.removeChild(child); }
}