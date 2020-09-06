class SiteMainArea {
    constructor(options) {
        this.options = options;
        this.elements = { ControlScreen: null, ChatContainer: null, };
        this.content = this.generateContent();
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteMainArea", style: {}, });
        let centeredMainArea = new Container({ id: "CenteredMainArea", style: { margin: "auto", width: "920px", height: "100%", overflow: "hidden", }, });
        container.appendChild(centeredMainArea.content);

        this.elements.ControlScreen = new ControlScreen({});
        centeredMainArea.appendChild(this.elements.ControlScreen.content);

        //  Create the twitch chat stream early so we can pass it into other classes
        this.elements.ChatContainer = new TwitchChatScreen({});
        this.elements.ChatContainer.setHidden(true);
        centeredMainArea.appendChild(this.elements.ChatContainer.content);

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
        this.elements.ControlScreen.setHidden(!show);
        this.elements.ChatContainer.content.style.display = show ? "block" : "none";
    }
}