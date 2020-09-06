class LoginBox {
    constructor(options) {
        this.options = options;
        this.loginCallback = options.loginCallback;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "LoginBox", style: styleConfig.SiteLoginBox, });

        let siteLoginBoxContainer = new Container({ id: "SiteLoginBoxContainer", style: styleConfig.SiteLoginBoxContainer });
        container.appendChild(siteLoginBoxContainer.content);

        let siteLoginLogoutBox = new Container({ id: "SiteLoginLogoutBox", style: styleConfig.SiteLoginBox });
        siteLoginBoxContainer.appendChild(siteLoginLogoutBox.content);

        this.loadTwitchLoginInput(siteLoginLogoutBox);

        return container.content;
    }

    createInputPairing(inputID, title, inputValue) {
        let inputPairing = new Container({ id: inputID + "InputPairing", style: { display: "block", }, });

        let titleContainer = new Container({ id: inputID + "TitleContainer", style: { display: "inline-flex", }, });
        inputPairing.appendChild(titleContainer.content);

        let inputTitleLabel = new Label({ id: inputID + "TitleLabel", attributes: { value: title }, style: { padding: "0px 5px 0px 0px", color: "rgb(120, 120, 120)", display: "inline-flex", }, });
        titleContainer.appendChild(inputTitleLabel.content);

        let questionIcon = new Fontawesome({ id: inputID + "QuestionIcon", style: { color: "rgb(200, 200, 200)", fontSize: "12px", margin: "4px 4px 4px 4px", cursor: "pointer", display: "none", }});
        titleContainer.appendChild(questionIcon.content);
        inputPairing.getQuestionIcon = () => { return questionIcon; }

        let inputTextInput = new TextInput({ id: inputID + "TextInput", attributes: { value: inputValue }, style: { width: "300px", margin: "0px 5px 0px 5px" }, });
        inputPairing.appendChild(inputTextInput.content);

        inputPairing.getValue = () => { return inputTextInput.getValue(); }
        return inputPairing;
    }

    async loadTwitchLoginInput(element) {
        let twitchDetailsTitleLabel = new Label({ id: "TwitchDetailsTitleLabel", attributes: { value: "Twitch Details", }, style: { fontWeight: "bold", padding: "0px 0px 10px 0px", }, });
        element.appendChild(twitchDetailsTitleLabel.content);

        let twitchChannelName = this.createInputPairing("TwitchChannelName", "Channel Name:", channel)
        element.appendChild(twitchChannelName.content);
        
        let twitchUserName = this.createInputPairing("TwitchBotUserName", "Bot User Name:", username);
        element.appendChild(twitchUserName.content);

        let twitchOAuthToken = this.createInputPairing("TwitchOAuthPassword", "OAuth Password:", token);
        element.appendChild(twitchOAuthToken.content);

        let oauthQuestionIcon = twitchOAuthToken.getQuestionIcon();
        oauthQuestionIcon.setSymbol("fas fa-question-circle");
        oauthQuestionIcon.content.style.display = "inline-flex";
        oauthQuestionIcon.content.onclick = () => { window.open("https://twitchapps.com/tmi/"); }

        let connectButton = new PrimaryButton({ id: "TwitchConnectButton", secondary: "true", attributes: { value: "connect", }, style: { width: "100px", height: "24px", position: "relative", top: "6px", margin: "0px auto 10px auto", }, });
        connectButton.SetOnClick(async () => {
            let connectResult = await TwitchController.Connect(twitchChannelName.getValue(), twitchUserName.getValue(), twitchOAuthToken.getValue());
            SITE_HEADER.removeLoginBox();
            SITE_MAIN_AREA.ShowMainAreaUI(connectResult);
            if (this.loginCallback) { this.loginCallback(); }
        });
        element.appendChild(connectButton.content);
    }
}