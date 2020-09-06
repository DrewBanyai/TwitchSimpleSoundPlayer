let SITE_HEADER_HEIGHT = { collapsed: "50px", expanded: "50px" };//220px" };

let styleConfig = {
    SiteHeader: {
        width: "100%",
        margin: "0px 0px 20px 0px",
        textAlign: "center",
        backgroundColor: "rgb(64, 64, 64)",
        backgroundImage: "linear-gradient(to right bottom, rgb(10, 10, 10), rgb(50, 50, 50))",
        borderBottom: "1px solid rgba(160, 160, 160, 0.4)",
        transition: "height 0.5s"
    },
    SiteTitleLabel: {
        fontFamily: "Open Sans Condensed",
        fontSize: "34px",
        padding: "2px 0px 0px 0px",
        color: "rgb(140, 140, 140)",
        display: "inline-flex",
        userSelect: "pointer",
    },
    SiteLoginLogoutButton: {
        fontFamily: "Open Sans Condensed",
        fontSize: "18px",
        padding: "13px 0px 0px 0px",
        color: "rgb(255, 255, 255)",
        display: "inline-flex",
        userSelect: "pointer",
    },
    SiteLoginBoxContainer: {
        width: "0px",
        height: "0px",
        position: "relative",
    },
    SiteLoginBox: {
        backgroundColor: "rgb(64, 64, 64)",
        borderRadius: "8px",
        border: "1px solid rgb(120, 120, 120)",
        position: "absolute",
        maxWidth: "800px",
        top: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
}