class SoundTogglesScreen {
    constructor(options) {
        this.options = options;
        this.elements = {};
        this.soundToggles = {};
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "SoundTogglesScreen", style: { width: "920px", height: "100%", display: "none", backgroundColor: "rgb(64, 64 ,64)", color: "rgb(200, 200, 200)", padding: "2px 0px 2px 0px", overflow: "auto", textAlign: "center", }, });

        container.content.setHidden = (hidden) => this.setHidden(hidden);

        return container.content;
    }

    getSoundToggle(soundName) {
        if (this.soundToggles.hasOwnProperty(soundName)) { return this.soundToggles[soundName]; }
        
        this.soundToggles[soundName] = new SoundToggle(soundName);
        if (this.content) { this.content.appendChild(this.soundToggles[soundName].content); }
        return this.soundToggles[soundName];
    }

    addSoundsList(soundList) { for (let i = 0; i < soundList.length; ++i) { this.getSoundToggle(soundList[i]); } }

    getVolume(soundName) { return this.getSoundToggle(soundName).getVolume(); }
    getSoundDelayed(soundName) { return this.getSoundToggle(soundName).getSoundDelayed(); }
    getSoundAllowed(soundName) { return this.getSoundToggle(soundName).getSoundAllowed(); }
    setSoundPlayed(soundName) { return this.getSoundToggle(soundName).setSoundPlayed(); }

    setHidden(hidden) { this.content.style.display = hidden ? "none" : ""; }
}