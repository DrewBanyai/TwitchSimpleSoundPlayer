let LoadSiteContent = async () => {
    loadSiteHeader();
    loadSiteMainArea();
};

let SITE_HEADER = null;
let SITE_MAIN_AREA = null;

let SOUNDS_FOLDER_PATH = "";

const USER_TYPE_OPTIONS_LIST = [ "Anyone", /*"Only Followers", */"Only Subscribers", "Only Moderators", "Only Me (Streamer)", ];
let OPTIONS_WHO_IS_ALLOWED = "Anyone";

let getStorageTSSP = () => {
	let storageTSSP = localStorage.getItem('DrewTheBear_TSSP');
	return (storageTSSP ? JSON.parse(storageTSSP) : { channelName: "", oauth: "", folderPath: "" });
}

let setStorageTSSP = (storageData) => {
	localStorage.setItem("DrewTheBear_TSSP", JSON.stringify(storageData));
}

let loadSiteHeader = () => {
	//  The SiteHeader which will be attached to the top of the screen and persists across all pages
	SITE_HEADER = new SiteHeader({});
	document.body.appendChild(SITE_HEADER.content);
};

let loadSiteMainArea = () => {
	//  The SiteHeader which will be attached to the top of the screen and persists across all pages
	SITE_MAIN_AREA = new SiteMainArea({});
	document.body.appendChild(SITE_MAIN_AREA.content);
};