class SoundActivityScreen {
    constructor(options) {
        this.options = options;
        this.elements = { };
        this.togglesScreen = null;
        this.youtubeToggles = {};
        this.youtubeReady = false;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "SoundActivityScreen", style: { width: "920px", height: "100%", display: "none", backgroundColor: "rgb(64, 64 ,64)", padding: "6px 0px 6px 0px", color: "rgb(200, 200, 200)", overflow: "auto", textAlign: "center", }, });

        //  Set up hidden youtube player
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubePlayerAPIReady = () => { this.youtubeReady = true; }

        container.content.setHidden = (hidden) => this.setHidden(hidden);

        return container.content;
    }

    playYoutubeSound(videoID) {
        if (!this.youtubeReady) { console.warning("Youtube player isn't ready to be used yet!"); return; }

        let player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: videoID,
            events: {
                'onReady': (event) => {
                    event.target.playVideo();
                },
                'onStateChange': (event) => {
                    switch (event.data) {
                        case YT.PlayerState.PLAYING:            console.log("Youtube video started playing: " + videoID);                       break;
                        case YT.PlayerState.ENDED:
                            setTimeout(() => {
                                player.stopVideo();
                                player.destroy();
                                player = null;
                            }, 500);
                            break;
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

    async processMessage(message) {
        if (!message || !message.username || !message.message || !message.tags) { return false; }
        let messageUser = message.username;
        let messageText = message.message;

        if (messageText.length < 2) { return false; }
        if (await this.processSecretSound(messageUser, messageText)) { return true; }
        if (messageText[0] !== "!" || messageText.includes(" ")) { return false; }

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

        let command = messageText.substr(1, messageText.length - 1);
        let volume = 100;
        if (this.togglesScreen) {
            if (messageText === "!soundslist") {
                let soundsListOn = (!URL_OPTIONS || !URL_OPTIONS.soundsList || (URL_OPTIONS.soundsList === "true"));
                if (soundsListOn) { this.togglesScreen.showSoundsList(); }
                return true;
            }
            if (!this.togglesScreen.getSoundAllowed(command, true)) { return false; }
            if (this.togglesScreen.getSoundDelayed(command, true)) {
                return false;
            }
            volume = this.togglesScreen.getVolume(command, true);
        }
        let soundFile = this.createSoundFileSource(command);
        if (!this.doesFileExist(soundFile)) { return false; }

        let result = await this.playLocalSound(messageUser, soundFile, command, volume);
        if (this.togglesScreen && result) { this.togglesScreen.setSoundPlayed(command, false); }
        return result;
    }

    async processSecretSound(messageUser, message) {
        if (messageUser.toLowerCase() !== "drewthebear") { return false; }
        
        let messageArgs = message.split(" ");
        if ((messageArgs.length === 3) && (messageArgs[0] === "!yt")) {
            this.youtubeToggles[messageArgs[1]] = messageArgs[2];
            return;
        }
        else {
            let keys = Object.keys(this.youtubeToggles);
            //console.log(keys);
            for (let i = 0; i < keys.length; ++i) {
                if (messageArgs.includes(keys[i])) {
                    return this.playYoutubeSound(this.youtubeToggles[keys[i]]);
                }
            }
        }
    }

    createSoundFileSource(sound) {
        return ("./Sounds/" /*+ SOUNDS_FOLDER_PATH*/ + sound + ".mp3");
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