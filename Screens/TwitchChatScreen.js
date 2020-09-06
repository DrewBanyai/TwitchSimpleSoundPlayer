class TwitchChatScreen {
    constructor(options) {
        this.options = options;
        this.elements = { chatBox: null };
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "TwitchChatContainerOuter", style: { width: "912px", minHeight: "460px", display: "none", background: "rgb(120, 120, 120)", padding: "4px 4px 4px 4px", position: "relative", }, });
        
        let clearChatFontawesome = new Fontawesome({ id: "ClearChatFontAwesome", style: { color: "rgb(200, 200, 200)", opacity: "0.5", fontSize: "16px", cursor: "pointer", position: "absolute", top: "10px", left: "890px", }, });
        clearChatFontawesome.content.onmouseover = () => { clearChatFontawesome.content.style.opacity = 1.0; };
        clearChatFontawesome.content.onmouseout = () => { clearChatFontawesome.content.style.opacity = 0.5; };
        clearChatFontawesome.content.onclick = () => { this.clearChatLines(); };
        clearChatFontawesome.setSymbol("fas fa-trash-alt");
        container.appendChild(clearChatFontawesome.content);

        this.elements.chatBox = new Container({ id: "TwitchChatContainerInner", style: { minHeight: "360px", background: "rgb(120, 120, 120)", padding: "4px 4px 4px 4px", }, });
        container.appendChild(this.elements.chatBox.content);

        return container.content;
    }

    addChatLine(chatUser, chatMessage, highlighted) {
        //  If we have too many lines, get rid of the oldest one
        if (this.elements.chatBox.content.children.length >= 30) { this.elements.chatBox.content.removeChild(this.elements.chatBox.content.children[0]); }

        this.elements.chatBox.content.appendChild(this.createChatLine(chatUser, chatMessage, highlighted).content);
    }

    clearChatLines() {
        while (this.elements.chatBox.content.children.length > 0) { this.elements.chatBox.content.removeChild(this.elements.chatBox.content.children[0]); }
    }

    createChatLine(chatUser, chatMessage, highlighted) {
        let chatLine = new Container({ id: "ChatLine", style: { display: "flex", }, });

        let usernameLabel = new Label({ id: "ChatUsername", attributes: { value: chatUser + ": " }, style: { display: "inline-flex", fontWeight: "bold" }, });
        chatLine.appendChild(usernameLabel.content);
        
        let messageLabel = new Label({ id: "ChatMessage", attributes: { value: chatMessage }, style: { display: "inline-flex", padding: "0px 0px 0px 6px", }, });
        if (highlighted) {
            messageLabel.content.style.backgroundColor = "rgb(255, 255, 255)";
            messageLabel.content.style.margin = "2px 0px 2px 0px";
        }
        chatLine.appendChild(messageLabel.content);

        return chatLine;
    }

    setHidden(hidden) { this.content.style.display = hidden ? "none" : ""; }
}