class ScreenChooser {
    constructor(options) {
        this.options = options;
        this.elements = { ActivityLogButton: null, SoundTogglesButton: null, };
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "ScreenChooser", style: { width: "920px", height: "100%", display: "none", padding: "8px 0px 8px 16px", backgroundColor: "rgb(40, 40, 40)", color: "rgb(200, 200, 200)", overflow: "auto", textAlign: "left", }, });

        this.createScreenChoiceMenu(container);

        return container.content;
    }

    createScreenChoiceMenu(container) {
        //  Create the Activity Log button
        this.elements.ActivityLogButton = new Label({ id: "ActivityLogButton", style: { cursor: "pointer", margin: "0px 30px 0px 0px", }, attributes: { value: "Activity Log", }, });
        this.elements.ActivityLogButton.content.onclick = () => {
            let activityViewDiv = document.getElementById("ControlScreen");
            if (activityViewDiv) { activityViewDiv.setHidden(false); }

            let soundTogglesScreenDiv = document.getElementById("SoundTogglesScreen");
            if (soundTogglesScreenDiv) { soundTogglesScreenDiv.setHidden(true); }
        };
        container.appendChild(this.elements.ActivityLogButton.content);

        //  Create the Sound Toggles button
        this.elements.SoundTogglesButton = new Label({ id: "SoundTogglesButton", style: { cursor: "pointer", margin: "0px 30px 0px 0px", }, attributes: { value: "Sound Toggles", }, });
        this.elements.SoundTogglesButton.content.onclick = () => {
            let activityViewDiv = document.getElementById("ControlScreen");
            if (activityViewDiv) { activityViewDiv.setHidden(true); }

            let soundTogglesScreenDiv = document.getElementById("SoundTogglesScreen");
            if (soundTogglesScreenDiv) { soundTogglesScreenDiv.setHidden(false); }
        };
        container.appendChild(this.elements.SoundTogglesButton.content);
    }
    
    setHidden(hidden) { this.content.style.display = hidden ? "none" : "inline-flex"; }
}