document.getElementById("darkmode-toggle").onchange = (event) => {
    event.stopPropagation();
    const isChecked = event.target.checked;
  
    const themeUse = document.querySelector("#theme-icon use");
    const newRef = isChecked
      ? "/icons/organization.svg#icon-lightmode"
      : "/icons/organization.svg#icon-darkmode";
  
    themeUse.href.baseVal = newRef;                  
    themeUse.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        newRef
    );
      
    const darkModeToggleEvent = new CustomEvent("darkmode:toggle", {
        bubbles: true,
        detail: { enabled: isChecked },
    });

    event.currentTarget.dispatchEvent(darkModeToggleEvent);
};
    
document.body.addEventListener("darkmode:toggle", (event) => {
    document.body.classList.toggle("dark-mode", event.detail.enabled);
});
  