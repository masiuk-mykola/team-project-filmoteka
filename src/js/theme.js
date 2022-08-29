const Theme = {
LIGHT: "light-theme",
DARK: "dark-theme",
GREY: "grey-background-theme",
};

const bodyTheme = document.querySelector("body");
const footerTheme = document.querySelector("footer");

const delClassElem = () => {
    bodyTheme.classList.remove(Theme.LIGHT, Theme.DARK);
    footerTheme.classList.remove(Theme.LIGHT, Theme.GREY);
};
const themeSwitcher = document.querySelector("#theme-switch-toggle");

themeSwitcher.addEventListener("change", () => {
    delClassElem();

if (themeSwitcher.checked) {
    localStorage.setItem("Theme", "darkTheme");
    bodyTheme.classList.add(Theme.DARK);
    footerTheme.classList.add(Theme.GREY);

} else {
    localStorage.setItem("Theme", "lightTheme");
    bodyTheme.classList.add(Theme.LIGHT);
}
});

if (localStorage.getItem("Theme") === "darkTheme") {
    themeSwitcher.setAttribute("checked", true);
    bodyTheme.classList.add(Theme.DARK);
    footerTheme.classList.add(Theme.GREY);
}