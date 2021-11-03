$(document).ready(handleClick);

function processGetClassificationsHierarychyResponse(result) {
    console.log("result:" + result);
    var js = JSON.parse(result);

    var map = js["map"];
    var status = js["statusCode"];
    var error = js["error"];
    if (status == 200) {
        var box = document.getElementById("box");
        box.setAttribute("class", "list-group list-group-root well col-md-8 offset-md-2");
        for (var key in map) {
            generateList(map[key], box);
        }

        $('.list-group-item').on('click', function () {
            $('.bi', this)
                .toggleClass('bi-caret-down-fill')
                .toggleClass('bi-caret-right-fill');
        });

        //添加点击事件
        var menue1 = document.getElementById("menue1");
        var menue2 = document.getElementById("menue2");
        $(".classification").not(".leaf").on("contextmenu", function (e) {
            if (e.button == 2) {
                menue1.style.display = 'none';
                menue2.style.display = 'block';
                menue2.style.top = (e.clientY + 10) + 'px';
                menue2.style.left = (e.clientX + 10) + 'px';
            }
            e.preventDefault();
            e.stopPropagation();
        })
        $(".classification.leaf").on("contextmenu", function (e) {
            if (e.button == 2) {
                menue2.style.display = 'none';
                menue1.style.display = 'block';
                menue1.style.top = (e.clientY + 10) + 'px';
                menue1.style.left = (e.clientX + 10) + 'px';
            }
            e.preventDefault();
            e.stopPropagation();
        })
        document.addEventListener("click", function () {
            menue1.style.display = 'none';
            menue2.style.display = 'none';
        })
        document.addEventListener("contextmenu", function (e) {
            menue1.style.display = 'none';
            menue2.style.display = 'none';
            e.preventDefault();
        })
        $("#addTopClassification").on("click", function (e) {
            console.log("点到我了");
        })
        var spinner = document.getElementById("spinner");
        spinner.style.visibility = "hidden";
        $("#dropdownAction").css("visibility", "visible")

    } else {
        alert(error)
    }
}

//生成classification hierarychy
function generateList(elem, elemToAppend) {
    if (Object.keys(elem.childern).length === 0) {
        let a = document.createElement("a");
        a.setAttribute("href", "#");
        a.innerHTML = elem.name;
        a.setAttribute("class", "list-group-item leaf classification");
        a.style.paddingLeft = elem.level * 30 + "px";
        a.setAttribute("data-identity", elem.id + "");
        elemToAppend.appendChild(a);
        return a;
    } else {
        let div = document.createElement("div");
        div.setAttribute("class", "list-group collapse");
        div.setAttribute("id", elem.name);
        let a = document.createElement("a");
        a.setAttribute("href", "#" + elem.name);
        a.setAttribute("class", "list-group-item bin classification");
        a.setAttribute("data-toggle", "collapse");
        let icon = document.createElement("i");
        icon.setAttribute("class", "bi bi-caret-right-fill");

        var span = document.createElement("span");
        span.innerHTML = elem.name
        a.appendChild(span);
        a.appendChild(icon);
        a.style.paddingLeft = elem.level * 30 + "px";
        a.setAttribute("data-identity", elem.id + "");
        for (let j = 0; j < elem.childrenID.length; j++) {
            generateList(elem.childern[elem.childrenID[j]], div);
        }
        elemToAppend.appendChild(a);
        elemToAppend.appendChild(div);
    }
}

//处理函数
function handleClick() {
    var xhr = new XMLHttpRequest();
    console.log(xhr);

    xhr.open("GET", getClassificationsHierarychy_url, true);
    // send the collected data as JSON
    xhr.send();
    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        console.log(xhr);
        console.log(xhr.request);

        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("XHR:" + xhr.responseText);
            processGetClassificationsHierarychyResponse(xhr.responseText);
        } else {
            processGetClassificationsHierarychyResponse("N/A");
        }
    };
}

function handleAddTopClassificationClick() {
    var xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open("GET", getClassificationsHierarychy_url, true);
    // send the collected data as JSON
    xhr.send();
    // This will process results and update HTML as appropriate. 
}