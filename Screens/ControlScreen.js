class ControlScreen {
    constructor(options) {
        this.options = options;
        this.elements = { };
        this.togglesScreen = null;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "ControlScreen", style: { width: "920px", height: "100%", display: "none", backgroundColor: "rgb(64, 64 ,64)", padding: "6px 0px 6px 0px", color: "rgb(200, 200, 200)", overflow: "auto", textAlign: "center", }, });
        
        let playerDiv = new Container({ id: "player", style: { position: "absolute", top: "-9999px", left: "-9999px" }});
        container.appendChild(playerDiv.content);

        container.content.setHidden = (hidden) => this.setHidden(hidden);

        return container.content;
    }

    playYoutubeSound(videoID) {
        let player = new YT.Player('player', {
            videoId: videoID, // this is the id of the video at youtube (the stuff after "?v=")
            loop: true,
            events: {
                onReady: function (e) {
                    console.log("Youtube video is loaded: " + videoID);
                    e.target.playVideo();
                },
                onStateChange: function (event) {
                    switch (event.data) {
                        case YT.PlayerState.PLAYING:            console.log("Youtube video started playing: " + videoID);                       break;
                        case 0:                                 setTimeout(() => {
                            player.stopVideo();
                            player.destroy();
                            player = null;
                        }, 500);        break;
                    }
                }
            }
        });
    }

    addProcessResultLine(success, commandString) {
        let resultLine = new Container({ id: "ProcessResultLine", style: { width: "900px", height: "24px", fontWeight: "bold", color: "rgb(64, 64, 64)", backgroundColor: "rgb(100, 200, 100)", borderRadius: "6px", margin: "2px auto", }, });
        if (!success) { resultLine.content.style.backgroundColor = "rgb(200, 100, 100)"; }

        let resultString = new Label({ id: "ResultStringLabel", style: { position: "relative", top: "2px", }, attributes: { value: commandString, }, });
        resultLine.appendChild(resultString.content);

        this.content.appendChild(resultLine.content);

        if (this.content.children.length >= 30) { this.content.removeChild(this.content.children[0]); }
    }

    async processMessage(messageUser, message) {
        if (!message) { return false; }
        if (message.length < 2) { return false; }
        if (this.processSecretSound(messageUser, message)) { return true; }
        if (message[0] !== "!") { return false; }
        if (message.includes(" ")) { return false; }

        let command = message.substr(1, message.length - 1);
        let volume = 100;
        if (this.togglesScreen) {
            if (!this.togglesScreen.getSoundAllowed(command)) { return false; }
            if (this.togglesScreen.getSoundDelayed(command)) {
                return false;
            }
            volume = this.togglesScreen.getVolume(command);
        }
        let soundFile = this.createSoundFileSource(command);
        if (!this.doesFileExist(soundFile)) { return false; }

        if (this.togglesScreen) { this.togglesScreen.setSoundPlayed(command); }
        let result = await this.playLocalSound(messageUser, soundFile, volume);
        return result;
    }

    processSecretSound(messageUser, message) {
        if (messageUser.toLowerCase() !== "drewthebear") { return false; }

        const secretTriggers = {
            "This game is pretty spoopy.": "tbyvHIpvIXA",
            "god damn dude": "cwySw6Gv0Oo",
        };

        if (secretTriggers.hasOwnProperty(message)) {
            this.playYoutubeSound(secretTriggers[message]);
        }
    }

    createSoundFileSource(sound) {
        return ("./Sounds/" + sound + ".mp3");
    }

    doesFileExist(soundFile) {
        return true;
        let fileCheck = new File(["mp3"], soundFile);
        return fileCheck.open('r');
    }

    async playLocalSound(messageUser, soundFile, volume) {
        if (!soundFile) { return false; }
        try {
            let audio = new Audio(soundFile);
            return new Promise(resolve => {
                audio.addEventListener("canplaythrough", event => {
                    /* the audio is now playable; play it if permissions allow */
                    audio.volume = volume / 100.0;
                    audio.play();
                    this.addProcessResultLine(true, "User " + messageUser + " played sound file '" + soundFile + "'");
                    resolve(true)
                });
                audio.onerror = () => {
                    this.addProcessResultLine(false, "User " + messageUser + " attempted to play '" + soundFile + "' but it failed. Does this file exist?");
                    resolve(false)
                }
            });
        }
        catch (except) {
            console.warn("Sound could not be played: " + soundFile);
            console.error(except);
            return false;
        }
    }

    setToggleScreen(toggleScreen) { this.togglesScreen = toggleScreen; }
    
    setHidden(hidden) { this.content.style.display = hidden ? "none" : ""; }
}