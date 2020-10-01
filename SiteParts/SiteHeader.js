class SiteHeader {
    constructor(options) {
        this.options = options;
        this.loginButton = null;
        this.loginBox = null;
        this.centeredHeader = null;
        this.content = this.generateContent();
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteHeader", style: { width: "100%", margin: "0px 0px 20px 0px", textAlign: "center", backgroundColor: "rgb(64, 64, 64)", backgroundImage: "linear-gradient(to right bottom, rgb(10, 10, 10), rgb(50, 50, 50))", borderBottom: "1px solid rgba(160, 160, 160, 0.4)", transition: "height 0.5s" }, });
        this.centeredHeader = new Container({ id: "CenteredHeader", style: { margin: "auto", width: "920px", height: "50px", overflow: "hidden", }, });
        container.appendChild(this.centeredHeader.content);

        let siteNameBox = new Container({
            id: "SiteNameBox",
            style: { height: "100%", display: "inline-flex", float: "left", },
        });
        this.centeredHeader.appendChild(siteNameBox.content);
        //  TODO: Make this a link to the main page?

        let loginButtonBox = new Container({
            id: "SiteLoginLogoutBox",
            style: { height: "100%", display: "inline-flex", float: "right", cursor: "pointer", },
            events: {
                click: () => {
                    if (this.loginBox === null) {
                        this.loginBox = new LoginBox({ loginCallback: () => { this.loginButton.content.style.display = "none"; } });
                        this.centeredHeader.appendChild(this.loginBox.content);
                    }
                    else { this.removeLoginBox(); }
                }
            }
        });
        this.centeredHeader.appendChild(loginButtonBox.content);
        //  TODO: Make the login / logout button swap on login

        //  Load the different parts of the header menu
        this.loadSiteNameBox(siteNameBox);
        this.loadSiteLoginLogoutBox(loginButtonBox);

        return container.content;
    }

    removeLoginBox() {
        this.centeredHeader.removeChild(this.loginBox.content);
        this.loginBox = null;
    }

    async loadSiteNameBox(container) {
        let siteTitleLabel = new Label({ id: "SiteNameLabel", attributes: { value: "Twitch Simple Sound Player (by DrewTheBear)", }, style: { fontFamily: "Open Sans Condensed", fontSize: "34px", padding: "2px 0px 0px 0px", color: "rgb(140, 140, 140)", display: "inline-flex", userSelect: "pointer", }, });
        container.appendChild(siteTitleLabel.content);

        let drewTheBearIcon = new Image({ id: "DrewTheBearIcon", style: { width: "36px", height: "36px", margin: "5px", borderRadius: "50%", border: "3px solid rgb(200, 200, 200)", cursor: "pointer", }});
        drewTheBearIcon.setValue("./Images/DrewTheBear_Icon.png");
        drewTheBearIcon.content.onclick = () => { window.open("https://twitch.tv/DrewTheBear"); }
        container.appendChild(drewTheBearIcon.content);

        let githubIcon = new Image({ id: "GithubIcon", style: { width: "36px", height: "36px", margin: "5px", borderRadius: "50%", border: "3px solid rgb(200, 200, 200)", cursor: "pointer", }});
        githubIcon.setValue("./Images/Github_Icon.png");
        githubIcon.content.onclick = () => { window.open("https://github.com/DrewBanyai/TwitchSimpleSoundPlayer"); }
        container.appendChild(githubIcon.content);
    }

    async loadSiteLoginLogoutBox(container) {
        this.loginButton = new Label({ id: "SiteLoginButton", attributes: { value: "Login", }, style: { fontFamily: "Open Sans Condensed", fontSize: "18px", padding: "13px 0px 0px 0px", color: "rgb(255, 255, 255)", display: "inline-flex", userSelect: "pointer", }, });
        container.appendChild(this.loginButton.content);
    }
}