class SoundActivityScreen {
    constructor(options) {
        this.options = options;
        this.elements = { };
        this.togglesScreen = null;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "SoundActivityScreen", style: { width: "920px", height: "100%", display: "none", backgroundColor: "rgb(64, 64 ,64)", padding: "6px 0px 6px 0px", color: "rgb(200, 200, 200)", overflow: "auto", textAlign: "center", }, });
        
        container.content.setHidden = (hidden) => this.setHidden(hidden);

        return container.content;
    }

    addProcessResultLine(success, commandString) {
        let resultLine = new Container({ id: "ProcessResultLine", style: { width: "900px", height: "24px", fontWeight: "bold", color: "rgb(64, 64, 64)", backgroundColor: "rgb(100, 200, 100)", borderRadius: "6px", margin: "2px auto", }, });
        if (!success) { resultLine.content.style.backgroundColor = "rgb(200, 100, 100)"; }

        let resultString = new Label({ id: "ResultStringLabel", style: { position: "relative", top: "2px", }, attributes: { value: commandString, }, });
        resultLine.appendChild(resultString.content);

        this.content.appendChild(resultLine.content);

        if (this.content.children.length >= 30) { this.content.removeChild(this.content.children[0]); }
    }

    async processMessage(message) {
        if (!message || !message.username || !message.message || !message.tags) { return false; }
        let messageUser = message.username;
        let messageText = message.message;

        if (messageUser === "nightbot") { return false; }
        if (messageText.length < 2) { return false; }
        if (!messageText.includes("!")) { return false; }

        //  Check against sound playing limitations
        let isStreamer = (message.tags.badges && (message.tags.badges.broadcaster !== undefined) && (message.tags.badges.broadcaster === "1"));
        let isModerator = (message.tags.mod && (message.tags.mod === "1"));
        let isSubscriber = (message.tags.subscriber && (message.tags.subscriber === "1"));
        if (OPTIONS_WHO_IS_ALLOWED !== "Anyone") {
            switch (OPTIONS_WHO_IS_ALLOWED) {
                case "Only Me (Streamer)":      if (!isStreamer) { return false; }          break;
                case "Only Moderators":         if (!isModerator) { return false; }         break;
                case "Only Subscribers":        if (!isSubscriber) { return false; }        break;
            }
        }

        //  Loop through all parts of the message, searching for any sound commands
        let messageParts = messageText.split(" ");
        for (let i = 0; i < messageParts.length; ++i) {
            let part = messageParts[i];
            if (part[0] !== "!") { continue; }
            if (part.length < 2) { continue; }

            let command = part.substr(1, part.length - 1);
            let volume = 100;
            if (this.togglesScreen) {
                //  If the user is requesting the sounds list, and it is enabled, show the list in chat
                if (["soundslist", "soundlist", "sounds"].includes(command)) {
                    let soundsListOn = (!URL_OPTIONS || !URL_OPTIONS.soundsList || (URL_OPTIONS.soundsList === "true"));
                    if (soundsListOn) { this.togglesScreen.showSoundsList(); }
                    return true;
                }
                if (!this.togglesScreen.getSoundAllowed(command, true)) { return false; }
                if (this.togglesScreen.getSoundDelayed(command, true)) { return false; }
                volume = this.togglesScreen.getVolume(command, true);
            }
            let soundFile = this.createSoundFileSource(command);
            if (!this.doesFileExist(soundFile)) { continue; }
    
            let result = await this.playLocalSound(messageUser, soundFile, command, volume);
            if (!result) { continue; }
            if (this.togglesScreen && result) { this.togglesScreen.setSoundPlayed(command, false); }
            return result;
        }
        return false;
    }

    createSoundFileSource(sound) {
        return ("./Sounds/" + sound + ".mp3");
    }

    doesFileExist(soundFile) {
        return true;
        let fileCheck = new File(["mp3"], soundFile);
        return fileCheck.open('r');
    }

    async playLocalSound(messageUser, soundFile, soundFileShort, volume) {
        if (!soundFile) { return false; }
        try {
            let audio = new Audio(soundFile);
            return new Promise(resolve => {
                audio.addEventListener("canplaythrough", event => {
                    //  The audio is now playable; play it if permissions allow
                    audio.volume = volume / 100.0;
                    audio.play();
                    this.addProcessResultLine(true, "User " + messageUser + " played sound file '" + soundFileShort + "'");
                    resolve(true)
                });
                audio.onerror = () => {
                    this.addProcessResultLine(false, "User " + messageUser + " attempted to play '" + soundFileShort + "' but it failed. Does this file exist?");
                    resolve(false)
                }
            });
        }
        catch (except) {
            console.warn("Sound could not be played: " + soundFileShort);
            console.error(except);
            return false;
        }
    }

    setToggleScreen(toggleScreen) { this.togglesScreen = toggleScreen; }
    
    setHidden(hidden) { this.content.style.display = hidden ? "none" : ""; }
}