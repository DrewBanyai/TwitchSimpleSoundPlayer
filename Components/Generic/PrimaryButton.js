class PrimaryButton {
	constructor(options) {
		this.options = options;
		this.ButtonElement = null;
		this.ButtonGradient = null;
		this.ButtonTextLabel = null;
		this.content = this.GenerateContent();

		this.ButtonTextLabel.setValue(this.content.value);
	}
	
	GenerateContent() {
		let highlightGradient = "linear-gradient(to right, rgba(200, 200, 200, 0.6), rgba(170, 170, 170, 0.4))";
		let mouseDownGradient = "linear-gradient(to right, rgba(140, 140, 140, 0.6), rgba(170, 170, 170, 0.4))";
		
		//  Create the main button, a rounded box
		this.ButtonElement = new Container({
			id: this.options.id,
			style: {
				width: "200px",
				height: "25px",
				borderRadius: "5px",
				backgroundImage: "linear-gradient(to right, rgb(255, 99, 0), rgb(255, 165, 0))",
				display: "flex",
			}
		});
		this.ButtonElement.applyOptions(this.options);
		
		this.ButtonGradient = new Container({
			id: this.options.id + "ButtonGradient",
			style: {
				width: "100%",
				height: "100%",
				lineHeight: "25px",
				borderRadius: "5px",
				display: "flex",
			}
		});
		this.ButtonElement.appendChild(this.ButtonGradient.content);
		
		//  Create a centered label on the button
		this.ButtonTextLabel = new Label({
			id: this.options.id + "ButtonText",
			attributes: { value: "" },
			style: {
				fontFamily: "'Titillium Web', sans-serif",
				margin: "auto",
				cursor: "default",
				userSelect: "none",
				textAlign: "center",
			},
		});
		this.ButtonGradient.appendChild(this.ButtonTextLabel.content);
		
		//  Set mouse reactions
		this.ButtonElement.content.onmouseover = () => { if (!this.ButtonElement.content.disabled) {  this.ButtonGradient.content.style.backgroundImage = highlightGradient; } }
		this.ButtonElement.content.onmouseout = () => { if (!this.ButtonElement.content.disabled) { this.ButtonGradient.content.style.backgroundImage = ""; } }
		this.ButtonElement.content.onmousedown = () => { if (!this.ButtonElement.content.disabled) {  this.ButtonGradient.content.style.backgroundImage = mouseDownGradient; } }
		this.ButtonElement.content.onmouseup = () => { if (!this.ButtonElement.content.disabled) { this.ButtonGradient.content.style.backgroundImage = highlightGradient; } }
		
		return this.ButtonElement.content;
	}
	
	setValue(text) { this.ButtonTextLabel.setValue(text); }
	setFont(font) { this.ButtonTextLabel.setFont(font); }
	setFontSize(size) { this.ButtonTextLabel.setFontSize(size); }
	
	SetOnClick(callback) { this.ButtonElement.content.onclick = () => { if (this.ButtonElement.content.disabled) { return; } callback(); }; }
	
	SetEnabledState(enabled) {
		this.ButtonElement.content.disabled = (!enabled);
		this.ButtonGradient.content.disabled = (!enabled);
		
		if (!enabled) { setStyle(this.ButtonGradient.content, { backgroundImage: "", }); }
	}
}