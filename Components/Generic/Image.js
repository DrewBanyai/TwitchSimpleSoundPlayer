class Image {
	constructor(options) {
		this.options = options;
		this.content = this.GenerateContent();
        this.applyOptions(this.options);
		this.setValue(this.content.value);
	}
	
	GenerateContent() {
		if (!this.options.id) { this.options.id = "Image"; }

        let container = document.createElement("img");
		container.setValue = (text) => this.setValue(text);
		return container;
	}

    applyOptions(options) {
		//  Generic options application
		this.content.id = (options && options.id) ? options.id : (this.content.id ? this.content.id : "Container");
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }
	
	getValue() { return this.content.src; }
    setValue(value) { this.content.src = value; }
}