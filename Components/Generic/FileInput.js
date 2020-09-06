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