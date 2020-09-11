class SoundTogglesScreen {
    constructor(options) {
        this.options = options;
        this.elements = {};
        this.soundToggles = {};
        this.content = this.generateContent();
        if (soundsList) { this.addSoundsList(soundsList); }
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

    showSoundsList() {
        if (!soundsList) { return; }
        
        let messageTexts = [];
        let messageTextIndex = 0;
        for (let i = 0; i < soundsList.length; ++i) {
            if (messageTexts.length === messageTextIndex) { messageTexts.push(""); }
            if ((messageTexts[messageTextIndex] + ", !" + soundsList[i]).length > 500) {
                messageTextIndex += 1;
                if (messageTexts.length === messageTextIndex) { messageTexts.push(""); }
            }

            if (messageTexts[messageTextIndex].length > 0) { messageTexts[messageTextIndex] += ", !"; }
            else messageTexts[messageTextIndex] += "!";
            messageTexts[messageTextIndex] += soundsList[i];
        }

        //  Now that we have the list(s) of commands, send them out
        for (let i = 0; i < messageTexts.length; ++i) {
            setTimeout(() => { TwitchController.SendChatMessage(channel, messageTexts[i]); }, 1 + (i * 500));
        }
    }

    getVolume(soundName) { return this.getSoundToggle(soundName).getVolume(); }
    getSoundDelayed(soundName) { return this.getSoundToggle(soundName).getSoundDelayed(); }
    getSoundAllowed(soundName) { return this.getSoundToggle(soundName).getSoundAllowed(); }
    setSoundPlayed(soundName) { return this.getSoundToggle(soundName).setSoundPlayed(); }

    setHidden(hidden) { this.content.style.display = hidden ? "none" : ""; }
}