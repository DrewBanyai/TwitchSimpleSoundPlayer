class SystemOptionsScreen {
    constructor(options) {
        this.options = options;
        this.elements = {};
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "SystemOptionsScreen", style: { width: "920px", height: "100%", display: "none", backgroundColor: "rgb(64, 64 ,64)", color: "rgb(200, 200, 200)", padding: "4px 4px 4px 4px", overflow: "auto", textAlign: "left", }, });

        //this.createSystemOptionCheckbox(container, "SubsOnly", "Only subscribers can play sounds", OPTIONS_SUBS_ONLY, (checked) => { OPTIONS_SUBS_ONLY = checked; });
        
        this.createSystemOptionDropdown(container, "WhoCanUse", "Who can use the sound play feature?", USER_TYPE_OPTIONS_LIST, "Anyone", (dropdownValue) => { OPTIONS_WHO_IS_ALLOWED = dropdownValue; });

        container.content.setHidden = (hidden) => this.setHidden(hidden);

        return container.content;
    }

    createSystemOptionCheckbox(container, optionName, optionString, currentValue, callback) {
        let optionContainer = new Container({id: "OptionContainer_" + optionName, style: { display: "inline-flex", }, });

        let optionDescriptionLabel = new Label({ id: "OptionDescription_" + optionName, attributes: { value: optionString, }, style: { fontSize: "14px", color: "rgb(200, 200, 200)", }, });
        optionContainer.appendChild(optionDescriptionLabel.content);

        let optionCheckbox = new Checkbox({ id: "OptionCheckbox_" + optionName, attributes: { checked: currentValue }, });
        optionCheckbox.setClickCallback(() => { callback(optionCheckbox.getValue()); });
        optionContainer.appendChild(optionCheckbox.content);

        container.appendChild(optionContainer);
    }

    createSystemOptionDropdown(container, optionName, optionString, valuesList, currentValue, callback) {
        let optionContainer = new Container({id: "OptionContainer_" + optionName, style: { display: "inline-flex", width: "80%", }, });

        let optionDescriptionLabel = new Label({ id: "OptionDescription_" + optionName, attributes: { value: optionString, }, style: { fontSize: "14px", color: "rgb(200, 200, 200)", margin: "0px 4px 0px 4px", width: "80%", }, });
        optionContainer.appendChild(optionDescriptionLabel.content);

        let dropdownContainer = new Container({id: "DropdownContainer_" + optionName, style: { display: "inline-flex", margin: "0px 4px 0px auto", position: "relative", top: "-1px", width: "20%", }, });

        let optionDropdown = new DropDown({ id: "OptionDropdown_" + optionName, attributes: { checked: currentValue }, });
        optionDropdown.setValues(valuesList);
        optionDropdown.setOnChangeCallback(() => { callback(optionDropdown.getValue()) });
        dropdownContainer.appendChild(optionDropdown.content);

        optionContainer.appendChild(dropdownContainer.content);

        container.appendChild(optionContainer.content);
    }

    setHidden(hidden) { this.content.style.display = hidden ? "none" : ""; }
}