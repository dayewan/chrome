chrome.contextMenus.create({
    title: "翻译",
    contexts: ["all"],
    onclick: function (param) {
        alert(param.selectionText);
    }
});