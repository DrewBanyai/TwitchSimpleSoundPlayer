class SoundToggle {
    constructor(soundTitle) {
        this.soundTitle = soundTitle;
        this.soundVolume = 100;
        this.soundDelay = 0;
        this.soundDelayedUntil = new Date(null);
        this.soundAllowed = true;
        this.content = this.getContent();
    }

    getContent() {
        let container = new Container({ id: "SoundToggle_" + this.soundTitle, style: { width: "912px", height: "30px", margin: "4px 0px 4px 0px", backgroundColor: "rgb(100, 100, 200)", borderRadius: "10px", display: "inline-flex", }, });

        let soundTitleLabel = new Label({ id: "SoundTitleLabel_" + this.soundTitle, style: { fontSize: "18px", color: "rgb(255, 255, 255)", margin: "5px auto 0px 10px", display: "inline-flex", }, attributes: { value: this.soundTitle + ".mp3", }, });
        container.appendChild(soundTitleLabel.content);

        //  Sound volume setting
        let volumeContainer = new Container({ id: "SoundVolumeContainer_" + this.soundTitle, style: { width: "200px", margin: "4px 0px 0px 4px", display: "inline-flex", }, });
        container.appendChild(volumeContainer.content);

        let soundVolumeTitleLabel = new Label({ id: "SoundVolumeTitleLabel_" + this.soundTitle, style: { fontSize: "14px", color: "rgb(255, 255, 255)", margin: "4px 4px 0px 10px", display: "inline-flex", }, attributes: { value: "Sound Volume:", }, });
        volumeContainer.appendChild(soundVolumeTitleLabel.content);

        let soundVolumeDropdown = new DropDown({ id: "SoundVolumeDropdown_" + this.soundTitle, style: { height: "20px", margin: "1px 0px 0px 0px", }, });
        let volumePercentages = [ "0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%", ];
        soundVolumeDropdown.setValues(volumePercentages);
        soundVolumeDropdown.setValue("100%");
        soundVolumeDropdown.setOnChangeCallback(() => {
            switch (soundVolumeDropdown.getValue()) {
                case "0%":      this.soundVolume = 0;           break;
                case "10%":      this.soundVolume = 10;         break;
                case "20%":      this.soundVolume = 20;         break;
                case "30%":      this.soundVolume = 30;         break;
                case "40%":      this.soundVolume = 40;         break;
                case "50%":      this.soundVolume = 50;         break;
                case "60%":      this.soundVolume = 60;         break;
                case "70%":      this.soundVolume = 70;         break;
                case "80%":      this.soundVolume = 80;         break;
                case "90%":      this.soundVolume = 90;         break;
                case "100%":     this.soundVolume = 100;        break;
            }
        });
        volumeContainer.appendChild(soundVolumeDropdown.content);

        //  Sound delay setting
        let delayContainer = new Container({ id: "SoundDelayContainer_" + this.soundTitle, style: { width: "200px", margin: "4px 0px 0px 4px", display: "inline-flex", }, });
        container.appendChild(delayContainer.content);

        let soundDelayTitleLabel = new Label({ id: "SoundDelayTitleLabel_" + this.soundTitle, style: { fontSize: "14px", color: "rgb(255, 255, 255)", margin: "4px 4px 0px 10px", display: "inline-flex", }, attributes: { value: "Sound Delay:", }, });
        delayContainer.appendChild(soundDelayTitleLabel.content);

        let soundDelayDropdown = new DropDown({ id: "SoundDelayDropdown_" + this.soundTitle, style: { height: "20px", margin: "1px 0px 0px 0px", }, });
        let soundDelayOptions = [ "No Delay", "5 seconds", "10 seconds", "30 seconds", "1 minute", "5 minutes", "10 minutes", "20 minutes", "1 hour", ];
        soundDelayDropdown.setValues(soundDelayOptions);
        soundDelayDropdown.setOnChangeCallback(() => {
            switch (soundDelayDropdown.getValue()) {
                case "No Delay":        this.soundDelay = 0;            break;
                case "5 seconds":       this.soundDelay = 5;            break;
                case "10 seconds":      this.soundDelay = 10;           break;
                case "30 seconds":      this.soundDelay = 30;           break;
                case "1 minute":        this.soundDelay = 60;           break;
                case "5 minutes":       this.soundDelay = 300;          break;
                case "10 minutes":      this.soundDelay = 600;          break;
                case "20 minutes":      this.soundDelay = 1200;         break;
                case "1 hour":          this.soundDelay = 3600;         break;
            }
            this.soundDelayedUntil = new Date(null);
        });
        delayContainer.appendChild(soundDelayDropdown.content);

        //  Sound allowed setting
        let allowedContainer = new Container({ id: "SoundAllowedContainer_" + this.soundTitle, style: { width: "85px", margin: "4px 0px 0px 4px", display: "inline-flex", padding: "0px 9px 0px 0px", }, });
        container.appendChild(allowedContainer.content);

        let soundAllowedTitleLabel = new Label({ id: "SoundAllowedTitleLabel_" + this.soundTitle, style: { fontSize: "14px", color: "rgb(255, 255, 255)", margin: "4px 4px 0px 10px", display: "inline-flex", }, attributes: { value: "Allowed:", }, });
        allowedContainer.appendChild(soundAllowedTitleLabel.content);

        let soundAllowedCheckbox = new Checkbox({ id: "SoundAllowedCheckbox_" + this.soundTitle, checked: true, style: { margin: "2px 0px 0px auto", }, });
        soundAllowedCheckbox.setClickCallback(() => { this.soundAllowed = soundAllowedCheckbox.getChecked(); this.soundDelayedUntil = new Date(null); });
        allowedContainer.appendChild(soundAllowedCheckbox.content);

        container.content.getVolume = () => { return this.getVolume(); }
        container.content.getSoundDelayed = () => { return this.getSoundDelayed(); }
        container.content.getSoundAllowed = () => { return this.getSoundAllowed(); }
        container.content.setSoundPlayed = () => { return this.setSoundPlayed(); }

        return container.content;
    }

    getVolume() { return this.soundVolume; }
    getSoundDelayed() { return ((new Date()).getTime() < this.soundDelayedUntil.getTime()); }
    getSoundAllowed() { return this.soundAllowed; }
    setSoundPlayed() { this.soundDelayedUntil = new Date(); this.soundDelayedUntil.setSeconds(this.soundDelayedUntil.getSeconds() + this.soundDelay); }
}