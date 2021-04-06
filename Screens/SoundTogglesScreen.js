class SoundTogglesScreen {
    constructor(options) {
        this.options = options;
        this.elements = {};
        this.soundToggles = {};
        this.content = this.generateContent();
        if (SETTINGS && SETTINGS.SOUNDS_LIST) { this.addSoundsList(SETTINGS.SOUNDS_LIST); }
    }

    generateContent() {
        let container = new Container({ id: "SoundTogglesScreen", style: { width: "920px", height: "100%", display: "none", backgroundColor: "rgb(64, 64 ,64)", color: "rgb(200, 200, 200)", padding: "2px 0px 2px 0px", overflow: "auto", textAlign: "center", }, });

        container.content.setHidden = (hidden) => this.setHidden(hidden);

        return container.content;
    }

    getSoundToggle(soundName, doNotCreate) {
        if (this.soundToggles.hasOwnProperty(soundName)) { return this.soundToggles[soundName]; }
        if (doNotCreate) { return null; }

        this.soundToggles[soundName] = new SoundToggle(soundName);
        if (this.content) { this.content.appendChild(this.soundToggles[soundName].content); this.sortChildren(); }
        return this.soundToggles[soundName];
    }

    sortChildren() {
        var list = this.content;

        [...list.children].sort((a,b)=>a.id>b.id?1:-1).forEach(node=>list.appendChild(node));
    }

    addSoundsList(soundList) { for (let i = 0; i < soundList.length; ++i) { this.getSoundToggle(soundList[i]); } }

    showSoundsList() {
        if (!SETTINGS.SOUNDS_LIST) { return; }
        
        let messageTexts = [];
        let messageTextIndex = 0;
        for (let i = 0; i < SETTINGS.SOUNDS_LIST.length; ++i) {
            if (messageTexts.length === messageTextIndex) { messageTexts.push(""); }
            if ((messageTexts[messageTextIndex] + ", !" + SETTINGS.SOUNDS_LIST[i]).length > 500) {
                messageTextIndex += 1;
                if (messageTexts.length === messageTextIndex) { messageTexts.push(""); }
            }

            if (messageTexts[messageTextIndex].length > 0) { messageTexts[messageTextIndex] += ", !"; }
            else messageTexts[messageTextIndex] += "!";
            messageTexts[messageTextIndex] += SETTINGS.SOUNDS_LIST[i];
        }

        //  Now that we have the list(s) of commands, send them out
        for (let i = 0; i < messageTexts.length; ++i) {
            setTimeout(() => { TwitchController.SendChatMessage(channel, messageTexts[i]); }, 1 + (i * 500));
        }
    }

    getVolume(soundName, doNotCreate) { let sound = this.getSoundToggle(soundName, doNotCreate); return (sound ? sound.getVolume() : 100); }
    getSoundDelayed(soundName, doNotCreate) { let sound = this.getSoundToggle(soundName, doNotCreate); return (sound ? sound.getSoundDelayed() : 0); }
    getSoundAllowed(soundName, doNotCreate) { let sound = this.getSoundToggle(soundName, doNotCreate); return (sound ? sound.getSoundAllowed() : true); }
    setSoundPlayed(soundName, doNotCreate) { let sound = this.getSoundToggle(soundName, doNotCreate); return (sound ? sound.setSoundPlayed() : null); }

    setHidden(hidden) { this.content.style.display = hidden ? "none" : ""; }
}