class SiteMainArea {
    constructor(options) {
        this.options = options;
        this.elements = { ScreenChooser: null, SoundActivityScreen: null, SoundTogglesScreen: null, };
        this.content = this.generateContent();
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteMainArea", style: {}, });
        let centeredMainArea = new Container({ id: "CenteredMainArea", style: { margin: "auto", width: "920px", height: "100%", overflow: "hidden", }, });
        container.appendChild(centeredMainArea.content);

        this.elements.ScreenChooser = new ScreenChooser({});
        centeredMainArea.appendChild(this.elements.ScreenChooser.content);

        this.elements.SoundActivityScreen = new SoundActivityScreen({});
        centeredMainArea.appendChild(this.elements.SoundActivityScreen.content);

        this.elements.SoundTogglesScreen = new SoundTogglesScreen({});
        centeredMainArea.appendChild(this.elements.SoundTogglesScreen.content);

        this.elements.SystemOptionsScreen = new SystemOptionsScreen({});
        centeredMainArea.appendChild(this.elements.SystemOptionsScreen.content);

        this.elements.SoundActivityScreen.setToggleScreen(this.elements.SoundTogglesScreen);

        this.setOnChatMessage();

        return container.content;
    }

    setOnChatMessage() {
        TwitchController.AddTwitchMessageCallback("PRIVMSG", async (message) => {
            //  If the command is accepted by the Control Screen and processed successfully, we're done here
            if (await this.elements.SoundActivityScreen.processMessage(message)) { return true; };

            //console.log("PRIVMSG: ", message);
        });
    }

    ShowMainAreaUI(show) {
        this.elements.ScreenChooser.setHidden(!show);
        this.elements.SoundActivityScreen.setHidden(!show);

        this.elements.SoundTogglesScreen.setHidden(show);
    }
}