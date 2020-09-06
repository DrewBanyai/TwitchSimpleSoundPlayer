class Label {
	constructor(options) {
		this.options = options;
		this.content = this.GenerateContent();
		this.setValue(this.content.value);
	}
	
	GenerateContent() {
		if (!this.options.id) { this.options.id = "Label"; }

		let container = new Container(this.options);
		container.content.setValue = (text) => this.setValue(text);
		return container.content;
	}
	
	getValue() { return this.content.innerHTML; }
	setValue(value) { this.content.innerHTML = value; }
	setFont(font) { this.content.style.fontFamily = font; }
	setFontSize(size) { this.content.style.fontSize = size; }
	setColor(color) { this.content.style.color = color; }
}