class Checkbox {
    constructor(options) {
        this.options = options;
        this.checked = false;
        this.clickCallback = null;
        this.elements = { exteriorBox: null, interiorSymbol: null };
        this.content = this.generateContent();
        this.applyOptions(this.options);
    }

    generateContent() {
        this.createStyleOptions();

        if (this.options.clickCallback) { this.clickCallback = this.options.clickCallback; }

        this.elements.exteriorBox = new Container({ id: "CheckboxExteriorBox", style: { borderRadius: "3px", border: "1px solid rgb(0, 0, 0)", cursor: "pointer", }, });
        this.elements.exteriorBox.content.onclick = () => {
            this.setChecked(!this.checked);
            if (this.options.clickCallback) { this.options.clickCallback(this.checked); }
        };

        this.elements.interiorSymbol = new Fontawesome({ id: "CheckboxinteriorSymbol", style: { textAlign: "center", position: "relative", }, });
        this.elements.exteriorBox.appendChild(this.elements.interiorSymbol.content);

        this.setChecked((this.options.checked === true));

        return this.elements.exteriorBox.content;
    }

    createStyleOptions() {
        /*
        Potential values in this.options.styleOptions
            - exteriorColorUnchecked
            - exteriorColorChecked
            - interiorColorUnchecked
            - interiorColorChecked
            - checkSymbolUnchecked
            - checkSymbolChecked
            - checkSize
            - exteriorBoxSize
            - interiorSymbolSize
            - interiorSymbolTop
            - interiorSymbolLeft
        */

        if (!this.options.styleOptions) { this.options.styleOptions = {}; }
        if (!this.options.styleOptions.exteriorColorUnchecked) { this.options.styleOptions.exteriorColorUnchecked = "rgb(0, 0, 0)"; }
        if (!this.options.styleOptions.exteriorColorChecked) { this.options.styleOptions.exteriorColorChecked = "rgb(0, 0, 0)"; }
        if (!this.options.styleOptions.interiorColorUnchecked) { this.options.styleOptions.interiorColorUnchecked = "rgb(255, 0, 0)"; }
        if (!this.options.styleOptions.interiorColorChecked) { this.options.styleOptions.interiorColorChecked = "rgb(0, 255, 0)"; }
        if (!this.options.styleOptions.checkSymbolUnchecked) { this.options.styleOptions.checkSymbolUnchecked = "fas fa-times"; }
        if (!this.options.styleOptions.checkSymbolChecked) { this.options.styleOptions.checkSymbolChecked = "fas fa-check"; }
        if (!this.options.styleOptions.exteriorBoxSize) { this.options.styleOptions.exteriorBoxSize = "16px"; }
        if (!this.options.styleOptions.interiorSymbolSize) { this.options.styleOptions.interiorSymbolSize = "12px"; }
        if (!this.options.styleOptions.interiorSymbolTop) { this.options.styleOptions.interiorSymbolTop = "-1px"; }
        if (!this.options.styleOptions.interiorSymbolLeft) { this.options.styleOptions.interiorSymbolLeft = "0px"; }
    }

    setChecked(checked) {
        this.checked = checked;
        this.elements.exteriorBox.content.style.border = "1px solid " + this.options.styleOptions[this.checked ? "exteriorColorChecked": "exteriorColorUnchecked"];
        this.elements.exteriorBox.content.style.width = this.elements.exteriorBox.content.style.height = this.options.styleOptions["exteriorBoxSize"];
        this.elements.interiorSymbol.content.style.width = this.elements.interiorSymbol.content.style.height = this.options.styleOptions["exteriorBoxSize"];
        this.elements.interiorSymbol.content.style.color = this.options.styleOptions[this.checked ? "interiorColorChecked": "interiorColorUnchecked"];
        this.elements.interiorSymbol.setSymbol(this.checked ? this.options.styleOptions.checkSymbolChecked : this.options.styleOptions.checkSymbolUnchecked);
        this.elements.interiorSymbol.content.style.fontSize = this.options.styleOptions.interiorSymbolSize;
        this.elements.interiorSymbol.content.style.top = this.options.styleOptions.interiorSymbolTop;
        this.elements.interiorSymbol.content.style.left = this.options.styleOptions.interiorSymbolLeft;

        if (this.clickCallback) { this.clickCallback(checked); }
    }

    setClickCallback(callback) { this.clickCallback = callback; }
    getChecked() { return this.checked; }

    applyOptions(options) {
		//  Generic options application
		this.content.id = (options && options.id) ? options.id : (this.content.id ? this.content.id : "Checkbox");
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
        if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
        if (options && options.events) { for (let key in options.events) { this.content.addEventListener(key, options.events[key]); } }
    }
}