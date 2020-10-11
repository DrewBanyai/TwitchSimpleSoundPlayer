class LoginBox {
    constructor(options) {
        this.options = options;
        this.loginCallback = options.loginCallback;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "LoginBox", style: { backgroundColor: "rgb(64, 64, 64)", borderRadius: "8px", border: "1px solid rgb(120, 120, 120)", position: "absolute", maxWidth: "800px", top: "25%", left: "50%", transform: "translate(-50%, -50%)", }, });

        let siteLoginBoxContainer = new Container({ id: "SiteLoginBoxContainer", style: { width: "0px", height: "0px", position: "relative", } });
        container.appendChild(siteLoginBoxContainer.content);

        let siteLoginLogoutBox = new Container({ id: "SiteLoginLogoutBox", style: { backgroundColor: "rgb(64, 64, 64)", borderRadius: "8px", border: "1px solid rgb(120, 120, 120)", position: "absolute", maxWidth: "800px", top: "25%", left: "50%", transform: "translate(-50%, -50%)", } });
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

        inputPairing.highlight = (highlight) => { return inputTitleLabel.setColor(highlight ? "rgb(255, 0, 0)" : "rgb(120, 120, 120)"); }

        inputPairing.getValue = () => { return inputTextInput.getValue(); }
        inputPairing.setValue = (val) => { return inputTextInput.setValue(val); }
        return inputPairing;
    }

    async loadTwitchLoginInput(element) {
        //  Load data from storage if it exists
        let storageTSSP = getStorageTSSP();
        if (!channel) { channel = storageTSSP.channel ? storageTSSP.channel : ""; }
        if (!token) { token = storageTSSP.token ? storageTSSP.token : ""; }
        if (!SOUNDS_FOLDER_PATH) { SOUNDS_FOLDER_PATH = storageTSSP.folderPath; }

        let twitchDetailsTitleLabel = new Label({ id: "TwitchDetailsTitleLabel", attributes: { value: "Twitch Details", }, style: { fontWeight: "bold", padding: "0px 0px 10px 0px", }, });
        element.appendChild(twitchDetailsTitleLabel.content);

        let twitchChannelName = this.createInputPairing("TwitchChannelName", "Channel Name:", channel)
        element.appendChild(twitchChannelName.content);

        let twitchOAuthToken = this.createInputPairing("TwitchOAuthPassword", "OAuth Password:", token);
        element.appendChild(twitchOAuthToken.content);

        let oauthQuestionIcon = twitchOAuthToken.getQuestionIcon();
        oauthQuestionIcon.setSymbol("fas fa-question-circle");
        oauthQuestionIcon.content.style.display = "inline-flex";
        oauthQuestionIcon.content.onclick = () => { window.open("https://twitchapps.com/tmi/"); }

        /*
        let divider = new Container({ id: "Divider", style: { minHeight: "10px", }, })
        element.appendChild(divider.content);

        let folderDetailsTitleLabel = new Label({ id: "FolderDetailsTitleLabel", attributes: { value: "Folder Details", }, style: { fontWeight: "bold", padding: "0px 0px 10px 0px", }, });
        element.appendChild(folderDetailsTitleLabel.content);

        let soundsFolderPath = this.createInputPairing("FolderPath", "Folder Path:", SOUNDS_FOLDER_PATH)
        element.appendChild(soundsFolderPath.content);
        */

        let connectButton = new PrimaryButton({ id: "TwitchConnectButton", secondary: "true", attributes: { value: "connect", }, style: { width: "100px", height: "24px", position: "relative", top: "6px", margin: "0px auto 10px auto", }, });
        connectButton.SetOnClick(async () => {
            if (/*!soundsFolderPath.getValue() || */!twitchChannelName.getValue() || !twitchOAuthToken.getValue()) {
                console.warn("User did not provide necessary data in the login box. Try again.");
                return;
            }

            //  Save off the connection and folder data to local memory and local storage
            channel = twitchChannelName.getValue();
            token = twitchOAuthToken.getValue();

            //  Save off the data to auto-fill next time
            let storageTSSP = getStorageTSSP();
            storageTSSP.channel = channel;
            storageTSSP.token = token;
            setStorageTSSP(storageTSSP);

            //  Save off the folder path specified to both local storage and program memory
            //SOUNDS_FOLDER_PATH = soundsFolderPath.getValue();
            //if (!["/", "\\"].includes(SOUNDS_FOLDER_PATH[SOUNDS_FOLDER_PATH.length - 1])) { SOUNDS_FOLDER_PATH += "\\"; }

            //  Attempt to connect to the twitch channel
            let connectResult = await TwitchController.Connect(channel, token);
            if (!connectResult) { console.warn("Failed to connect with given channel name and oauth token. Please try again."); return; }

            //  Move to the next program state
            SITE_HEADER.removeLoginBox();
            SITE_MAIN_AREA.ShowMainAreaUI(connectResult);
            if (this.loginCallback) { this.loginCallback(); }
        });
        element.appendChild(connectButton.content);
    }
}