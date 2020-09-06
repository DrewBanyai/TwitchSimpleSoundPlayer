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