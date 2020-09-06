class ControlScreen {
    constructor(options) {
        this.options = options;
        this.elements = { };
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "ControlScreen", style: { width: "920px", height: "100%", backgroundColor: "rgb(64, 64 ,64)", padding: "6px 0px 6px 0px", color: "rgb(200, 200, 200)", overflow: "auto", textAlign: "center", }, });
        
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

    async processMessage(messageUser, message) {
        if (!message) { return false; }
        if (message.length < 2) { return false; }
        if (message[0] !== "!") { return false; }
        if (message.includes(" ")) { return false; }

        let command = message.substr(1, message.length - 1);
        let soundFile = this.createSoundFileSource(command);
        if (!this.doesFileExist(soundFile)) { return false; }

        let result = await this.playLocalSound(messageUser, soundFile);
        return result;
    }

    createSoundFileSource(sound) {
        return ("./Sounds/" + sound + ".mp3");
    }

    doesFileExist(soundFile) {
        return true;
        let fileCheck = new File(["mp3"], soundFile);
        return fileCheck.open('r');
    }

    async playLocalSound(messageUser, soundFile) {
        if (!soundFile) { return false; }
        try {
            let audio = new Audio(soundFile);
            return new Promise(resolve => {
                audio.addEventListener("canplaythrough", event => {
                    /* the audio is now playable; play it if permissions allow */
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
    
    setHidden(hidden) { this.content.style.display = hidden ? "none" : ""; }
}