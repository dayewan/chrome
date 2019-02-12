chrome.contextMenus.create({
    title: "测试右键菜单",
    contexts: ["image", "video"],
    onclick: function () {
        alert('您点击了右键菜单！');
    }
});