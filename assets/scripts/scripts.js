const body = document.querySelector("body");

if (body) {
    document.querySelectorAll('.menu-toggler').forEach(item => {
        item.addEventListener("click", () => {
            if (body.classList.contains("is-active")) {
                body.classList.remove("is-active");
            }
            else {
                body.classList.add("is-active");
            }
        });
    });
}

fetch('/assets/jsons/menu.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendMenuItems(data);
    })
    .catch(function (err) {
        console.log(err);
    });

function appendMenuItems(menuData) {
    var menuContainer = document.getElementById("menu-container");
    var mainMenuElem = document.createElement('ul');
    for (var i = 0; i < menuData.sidemenu.length; i++) {
        let levelOneElement = document.createElement('li');
        levelOneElement.className = 'menu';
        const levelOneHeader = `<div class="header"><div class="title"><a href="${menuData.sidemenu[i].url}">${menuData.sidemenu[i].title}</a></div><span class="icon fa-solid fa-chevron-down"></span></div>`;
        const levelOneContent = document.createElement('ul');
        levelOneContent.className = "content";
        for (var j = 0; j < menuData.sidemenu[i].submenu.length; j++) {
            let levelTwoElement = document.createElement('li');
            levelTwoElement.className = 'submenu';
            const levelTwoHeader = `<div class="subheader"><div class="title"><a href="${menuData.sidemenu[i].submenu[j].url}">${menuData.sidemenu[i].submenu[j].title}</a></div>${menuData.sidemenu[i].submenu[j].contextmenu.length === 0 ? '' : '<span class="icon fa-solid fa-chevron-down"></span>'}</div>`;
            levelTwoElement.innerHTML = levelTwoHeader;
            const levelTwoContent = document.createElement('ul');
            levelTwoContent.className = "content menu-link";
            if (menuData.sidemenu[i].submenu[j].contextmenu.length === 0) {
                let levelThreeElement = document.createElement('li');
                levelTwoContent.appendChild(levelThreeElement);
                levelTwoElement.appendChild(levelTwoContent);
            } else {
                for (var k = 0; k < menuData.sidemenu[i].submenu[j].contextmenu.length; k++) {
                    let levelThreeElement = document.createElement('li');
                    const levelThreeHeader = `<a href="${menuData.sidemenu[i].submenu[j].contextmenu[k].url}">${menuData.sidemenu[i].submenu[j].contextmenu[k].title}</a>`;
                    levelThreeElement.innerHTML = levelThreeHeader;
                    levelTwoContent.appendChild(levelThreeElement);
                    levelTwoElement.appendChild(levelTwoContent);
                }
            }

            levelOneContent.append(levelTwoElement);
        }
        levelOneElement.innerHTML = levelOneHeader;
        levelOneElement.appendChild(levelOneContent);
        mainMenuElem.appendChild(levelOneElement);
    }
    menuContainer.append(mainMenuElem);
    menuClickHandlers();
}

function menuClickHandlers() {
    const headers = document.getElementsByClassName("header");
    for (let i = 0; i < headers.length; i++) {
        headers[i].addEventListener("click", (event) => {
            event.stopPropagation();
            toggleMenuItem(headers, headers[i], i);
        });
    }
    subMenuClickHandlers();
}

function subMenuClickHandlers() {
    const subHeaders = document.getElementsByClassName("subheader");
    for (let j = 0; j < subHeaders.length; j++) {
        subHeaders[j].addEventListener("click", (event) => {
            event.stopPropagation();
            toggleSubmenuItem(subHeaders, subHeaders[j], j);
        });
    }
}

function toggleMenuItem(headers, item, index) {
    const getCurrentHeaderIcon = item.children[1];
    const currentHeaderContent = item.nextElementSibling;
    for (let i = 0; i < headers.length; i++) {
        if (i === index) {
            if (currentHeaderContent.getBoundingClientRect().height === 0) {
                getCurrentHeaderIcon.classList.add('fa-angle-up');
                getCurrentHeaderIcon.classList.remove('fa-chevron-down');
            } else {
                getCurrentHeaderIcon.classList.remove('fa-angle-up');
                getCurrentHeaderIcon.classList.add('fa-chevron-down');
            }
            currentHeaderContent.classList.toggle("content-transition");
        } else {
            headers[i].children[1].classList.remove('fa-angle-up');
            headers[i].children[1].classList.add('fa-chevron-down');
            const getAllSubheaders = headers[i].nextElementSibling.getElementsByClassName("subheader");
            for (let k = 0; k < getAllSubheaders.length; k++) {
                if (getAllSubheaders[k].children.length > 1) {
                    getAllSubheaders[k].children[1].classList.remove('fa-angle-up');
                    getAllSubheaders[k].children[1].classList.add('fa-chevron-down');
                    getAllSubheaders[k].nextElementSibling.classList.remove("content-transition");
                }
            }
            headers[i].nextElementSibling.classList.remove("content-transition");
        }
    }
}

function toggleSubmenuItem(subheaders, currentClickedItem, index) {
    const getCurrentSubHeaderIcon = currentClickedItem.children[1];
    const currentSubHeaderContent = currentClickedItem.nextElementSibling;
    for (let i = 0; i < subheaders.length; i++) {
        if (i === index) {
            if (currentSubHeaderContent.getBoundingClientRect().height === 10) {
                getCurrentSubHeaderIcon.classList.add('fa-angle-up');
                getCurrentSubHeaderIcon.classList.remove('fa-chevron-down');
            } else {
                getCurrentSubHeaderIcon.classList.remove('fa-angle-up');
                getCurrentSubHeaderIcon.classList.add('fa-chevron-down');
            }
            currentSubHeaderContent.classList.toggle("content-transition");
        } else {
            if (subheaders[i].children.length > 1) {
                subheaders[i].children[1].classList.remove('fa-angle-up');
                subheaders[i].children[1].classList.add('fa-chevron-down');
                subheaders[i].nextElementSibling.classList.remove("content-transition");
            }
        }
    }
}
