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