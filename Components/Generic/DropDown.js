class DropDown {
	constructor(options) {
        this.options = options;
        this.values = [];
		this.content = this.GenerateContent();
        this.applyOptions(this.options);
	}
	
	GenerateContent() {
		if (!this.options.id) { this.options.id = "DropDown"; }

        let container = document.createElement("select");
		container.setValues = (array) => this.setValues(array);
		return container;
	}

    applyOptions(options) {
		//  Generic options application
		this.content.id = (options && options.id) ? options.id : (this.content.id ? this.content.id : "Container");
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }

    setOnChangeCallback(callback) { this.content.onchange = callback; }
	
	getValues() { return this.valuesArray; }
    setValues(array) {
        this.valuesArray = array;
        for (let i = 0; i < this.valuesArray.length; ++i) {
            let option = document.createElement("option");
            option.value = this.valuesArray[i];
            option.text = option.value;
            this.content.appendChild(option);
        }
    }

    getValue() { return this.content.value; }
    setValue(val) {
        if (this.valuesArray.includes(val)) { this.content.setValue(val); }
        else { console.warn("Trying to set value " + val + " but that is not within the values array of this select object!"); }
    }
}