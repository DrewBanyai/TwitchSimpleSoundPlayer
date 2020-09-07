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

class FileInput {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();

		//  Generic options application
		this.content.id = (options && options.id) ? options.id : "FileInput";
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
		if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
    }

    generateContent() {
        let container = document.createElement("input");
        container.setAttribute("type", "file");

        return container;
    }
}

let loadFileFromInput = async () => {
    let file = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();
    if (!file || !reader) { return null; }

    return new Promise((resolve, reject) => {
        reader.addEventListener("load", function () { resolve(reader.result); }, false);
        reader.readAsDataURL(file);
    });
}

class Fontawesome {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "FontAwesome",
            attributes: {
                className: (this.options && this.options.attributes && this.options.attributes.className) ? this.options.attributes.className : "far fa-question-circle",
            },
            style: {
                containerType: "i",
                userSelect: "none",
            }
        });
        container.applyOptions(this.options);

        return container.content;
    }

    setSymbol(className) { this.content.className = className; }
}

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

class Modal {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "Modal",
            style: {
                width: "100%",
                height: "100%",
                position: "fixed",
                left: "0px",
                top: "0px",
                right: "0px",
                bottom: "0px",
                zIndex: "1",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
        });
        container.content.addEventListener('mousedown', (e) => { if (e.srcElement === container.content) { return this.closeDialog(); } });

        let centerPopup = new Container({
            id: "CenterPopup",
            style: {
                position: "fixed",
                top: (this.options && this.options.topOverride) ? this.options.topOverride : "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "2",
            },
        });
        container.appendChild(centerPopup.content);

        if (this.options && this.options.content) { centerPopup.appendChild(this.options.content); }

        container.content.closeDialog = () => { this.closeDialog(); }

        return container.content;
    }

    closeDialog() { return this.content.parentElement.removeChild(this.content); }

    appendChild(child) { this.content.appendChild(child); }
}

class PrimaryButton {
	constructor(options) {
		this.options = options;
		this.ButtonElement = null;
		this.ButtonGradient = null;
		this.ButtonTextLabel = null;
		this.content = this.GenerateContent();

		this.ButtonTextLabel.setValue(this.content.value);
	}
	
	GenerateContent() {
		let highlightGradient = "linear-gradient(to right, rgba(200, 200, 200, 0.6), rgba(170, 170, 170, 0.4))";
		let mouseDownGradient = "linear-gradient(to right, rgba(140, 140, 140, 0.6), rgba(170, 170, 170, 0.4))";
		
		//  Create the main button, a rounded box
		this.ButtonElement = new Container({
			id: this.options.id,
			style: {
				width: "200px",
				height: "25px",
				borderRadius: "5px",
				backgroundImage: "linear-gradient(to right, rgb(255, 99, 0), rgb(255, 165, 0))",
				display: "flex",
			}
		});
		this.ButtonElement.applyOptions(this.options);
		
		this.ButtonGradient = new Container({
			id: this.options.id + "ButtonGradient",
			style: {
				width: "100%",
				height: "100%",
				lineHeight: "25px",
				borderRadius: "5px",
				display: "flex",
			}
		});
		this.ButtonElement.appendChild(this.ButtonGradient.content);
		
		//  Create a centered label on the button
		this.ButtonTextLabel = new Label({
			id: this.options.id + "ButtonText",
			attributes: { value: "" },
			style: {
				fontFamily: "'Titillium Web', sans-serif",
				margin: "auto",
				cursor: "default",
				userSelect: "none",
				textAlign: "center",
			},
		});
		this.ButtonGradient.appendChild(this.ButtonTextLabel.content);
		
		//  Set mouse reactions
		this.ButtonElement.content.onmouseover = () => { if (!this.ButtonElement.content.disabled) {  this.ButtonGradient.content.style.backgroundImage = highlightGradient; } }
		this.ButtonElement.content.onmouseout = () => { if (!this.ButtonElement.content.disabled) { this.ButtonGradient.content.style.backgroundImage = ""; } }
		this.ButtonElement.content.onmousedown = () => { if (!this.ButtonElement.content.disabled) {  this.ButtonGradient.content.style.backgroundImage = mouseDownGradient; } }
		this.ButtonElement.content.onmouseup = () => { if (!this.ButtonElement.content.disabled) { this.ButtonGradient.content.style.backgroundImage = highlightGradient; } }
		
		return this.ButtonElement.content;
	}
	
	setValue(text) { this.ButtonTextLabel.setValue(text); }
	setFont(font) { this.ButtonTextLabel.setFont(font); }
	setFontSize(size) { this.ButtonTextLabel.setFontSize(size); }
	
	SetOnClick(callback) { this.ButtonElement.content.onclick = () => { if (this.ButtonElement.content.disabled) { return; } callback(); }; }
	
	SetEnabledState(enabled) {
		this.ButtonElement.content.disabled = (!enabled);
		this.ButtonGradient.content.disabled = (!enabled);
		
		if (!enabled) { setStyle(this.ButtonGradient.content, { backgroundImage: "", }); }
	}
}

class TextInput {
    constructor(options) {
        this.options = options;
        this.callbacks = { return: null };
        this.content = this.generateContent();
        this.applyOptions(options);
    }

    generateContent() {
        let inputType = (this.options && this.options.type) ? this.options.type : "text";

        let container = document.createElement("input");
        container.setAttribute("type", inputType);

        container.addEventListener("keyup", (e) => { if ((e.keyCode === 13) && (this.callbacks.return)) { this.callbacks.return(); } })

        container.style.backgroundColor = "white";
        container.style.color = "black";

        return container;
    }

    applyOptions(options) {
		//  Generic options application
		this.content.id = (options && options.id) ? options.id : (this.content.id ? this.content.id : "TextInput");
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }

    getValue() { return this.content.value; }
    setValue(value) { this.content.value = value; }
}