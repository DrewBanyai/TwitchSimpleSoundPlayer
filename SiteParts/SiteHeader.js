class SiteHeader {
    constructor(options) {
        this.options = options;
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

        //  Load the different parts of the header menu
        this.loadSiteNameBox(siteNameBox);

        return container.content;
    }

    async loadSiteNameBox(container) {
        let siteTitleLabel = new Label({ id: "SiteNameLabel", attributes: { value: "Twitch Simple Sound Player (by DrewTheBear)", }, style: { fontFamily: "Open Sans Condensed", fontSize: "34px", padding: "2px 0px 0px 0px", color: "rgb(140, 140, 140)", display: "inline-flex", userSelect: "pointer", }, });
        container.appendChild(siteTitleLabel.content);

        let drewTheBearIcon = new Image({ id: "DrewTheBearIcon", style: { width: "36px", height: "36px", margin: "5px", borderRadius: "50%", border: "3px solid rgb(200, 200, 200)", cursor: "pointer", }});
        drewTheBearIcon.setValue("https://i.imgur.com/R1JYDil.png");
        drewTheBearIcon.content.onclick = () => { window.open("https://twitch.tv/DrewTheBear"); }
        container.appendChild(drewTheBearIcon.content);

        let githubIcon = new Image({ id: "GithubIcon", style: { width: "36px", height: "36px", margin: "5px", borderRadius: "50%", border: "3px solid rgb(200, 200, 200)", cursor: "pointer", }});
        githubIcon.setValue("https://i.imgur.com/56rWtbj.png");
        githubIcon.content.onclick = () => { window.open("https://github.com/DrewBanyai/TwitchSimpleSoundPlayer"); }
        container.appendChild(githubIcon.content);
    }
}