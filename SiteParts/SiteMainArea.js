class SiteMainArea {
    constructor(options) {
        this.options = options;
        this.elements = { ScreenChooser: null, ControlScreen: null, SoundTogglesScreen: null, };
        this.content = this.generateContent();
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteMainArea", style: {}, });
        let centeredMainArea = new Container({ id: "CenteredMainArea", style: { margin: "auto", width: "920px", height: "100%", overflow: "hidden", }, });
        container.appendChild(centeredMainArea.content);

        this.elements.ScreenChooser = new ScreenChooser({});
        centeredMainArea.appendChild(this.elements.ScreenChooser.content);

        this.elements.ControlScreen = new ControlScreen({});
        centeredMainArea.appendChild(this.elements.ControlScreen.content);

        this.elements.SoundTogglesScreen = new SoundTogglesScreen({});
        centeredMainArea.appendChild(this.elements.SoundTogglesScreen.content);

        this.elements.ControlScreen.setToggleScreen(this.elements.SoundTogglesScreen);

        if (soundsList) { this.elements.SoundTogglesScreen.addSoundsList(soundsList); }

        this.setOnChatMessage();

        return container.content;
    }

    setOnChatMessage() {
        TwitchController.AddTwitchMessageCallback("PRIVMSG", async (message) => {
            //  If the command is accepted by the Control Screen and processed successfully, we're done here
            if (await this.elements.ControlScreen.processMessage(message.username, message.message)) { return true; };
            
            console.log("PRIVMSG: ", message);
        });
    }

    ShowMainAreaUI(show) {
        this.elements.ScreenChooser.setHidden(!show);
        this.elements.ControlScreen.setHidden(!show);

        this.elements.SoundTogglesScreen.setHidden(show);
    }
}