var spinner = document.getElementById("spinner");
var fatherID;
var locatedLevel;
var addClassificationTarget;
$(document).ready(handleGetClassificationHierarchy);

/*--------------------------处理结果函数-------------------------*/
function processGetClassificationsHierarychyResponse(result) {
    console.log("result:" + result);
    var js = JSON.parse(result);

    var map = js["map"];
    var status = js["statusCode"];
    var error = js["error"];
    if (status == 200) {
        var box = document.getElementById("box");
        box.setAttribute("class", "list-group list-group-root well col-md-8 offset-md-2");
        box.innerHTML = "";
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
            fatherID = $(e.target).data("identity");
            locatedLevel = $(e.target).data("level");
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
            fatherID = $(e.target).data("identity");
            locatedLevel = $(e.target).data("level");
            if (e.button == 2) {
                menue2.style.display = 'none';
                menue1.style.display = 'block';
                menue1.style.top = (e.clientY + 10) + 'px';
                menue1.style.left = (e.clientX + 10) + 'px';
            }
            e.preventDefault();
            e.stopPropagation();
        })

        //clear board
        document.addEventListener("click", function () {
            menue2.style.display = 'none';
            menue1.style.display = 'none';
        })
        document.addEventListener("contextmenu", function (e) {
            menue2.style.display = 'none';
            menue1.style.display = 'none';
            e.preventDefault();
        })
        //add top classification
        $("#addTopClassification").off("click").on("click", function (e) {
            console.log("22")
            $(".addClassificationBoard").css({ "display": "block", "z-index": "3" });
        })

        $(".addClassificationBoard button.addTopConcel").off("click").on("click", function (e) {
            $(".addClassificationBoard").css({ "display": "none", "z-index": "-3" });
        })

        $(".addClassificationBoard button.addTopSubmit").off("click").on("click", function (e) {
            $(".addClassificationBoard").css({ "display": "none", "z-index": "-3" });
            handleAddTopClassificationClick();
            $("#inputNewClassificationName").val("");
            e.stopPropagation();
        })

        //add sub classification
        $(".addSubClassification").off("click").on("click", function (e) {
            console.log("22")
            $(".addClassificationBoard1").css({ "display": "block", "z-index": "3" });
        })
        $(".addClassificationBoard1 button.addSubConcel").off("click").on("click", function (e) {
            $(".addClassificationBoard1").css({ "display": "none", "z-index": "-3" });
        })
        $(".addClassificationBoard1 button.addSubSubmit").off("click").on("click", function (e) {
            $(".addClassificationBoard1").css({ "display": "none", "z-index": "-3" });
            handleAddSubClassificationClick()
            $("#inputNewSubClassificationName").val("");
            e.stopPropagation();
        })

        //add algorithm
        $("button.addAlgorithmButton").off("click").on("click", function (e) {
            console.log("111")
            $("div .addAlgorithmBoard").css({ "display": "block", "z-index": "3" });
        })
        $("div .addAlgorithmBoard button.addAlgoConcel").off("click").on("click", function (e) {
            $("div .addAlgorithmBoard").css({ "display": "none", "z-index": "-3" });
        })
        $("div .addAlgorithmBoard button.addAlgoSubmit").off("click").on("click", function (e) {
            $("div .addAlgorithmBoard").css({ "display": "none", "z-index": "-3" });
            handleAddAlgorithmClick();
            $("input#inputNewAlgorithmName").val("");
            $("inputNewAlgorithmDescription").val("");
            e.stopPropagation();
        })

        // spinner off
        spinner.style.visibility = "hidden";
        $("#dropdownAction").css("visibility", "visible")

    } else {
        alert(error)
    }
}

function processaAddclassificationResponse(result) {
    spinner.style.visibility = "hidden";
    console.log("result:" + result);
    var js = JSON.parse(result);

    var response = js["response"];
    var httpCode = js["httpCode"];

    if (httpCode == 200) {
        handleGetClassificationHierarchy();
        console.log("sucess");
    } else {
        alert("not success");
    }
}

function processAddAlgorithmResponse(result) {
    spinner.style.visibility = "hidden";
    console.log("result:" + result);
    var js = JSON.parse(result);

    var response = js["response"];
    var httpCode = js["httpCode"];

    if (httpCode == 200) {
        console.log("sucess");
    } else {
        alert("not success");
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
        a.setAttribute("data-level", elem.level + "");
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
        icon.setAttribute("data-identity", elem.id + "");
        icon.setAttribute("data-level", elem.level + "");

        var span = document.createElement("span");
        span.innerHTML = elem.name;
        span.setAttribute("data-identity", elem.id + "");
        span.setAttribute("data-level", elem.level + "");
        a.appendChild(span);
        a.appendChild(icon);
        a.style.paddingLeft = elem.level * 30 + "px";
        a.setAttribute("data-identity", elem.id + "");
        a.setAttribute("data-level", elem.level + "");
        for (let j = 0; j < elem.childrenID.length; j++) {
            generateList(elem.childern[elem.childrenID[j]], div);
        }
        elemToAppend.appendChild(a);
        elemToAppend.appendChild(div);
    }
}

/*-------------------------------------------------处理函数------------------------------------------------*/
//显示请求处理
function handleGetClassificationHierarchy() {
    spinner.style.visibility = "visible";
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

//添加顶级分类处理
function handleAddTopClassificationClick() {
    console.log("top classification");
    var form = document.addTopClassification;
    var arg1 = form.arg1.value;
    var arg2 = -1;
    var arg3 = 0;
    if (arg1 == null || arg1 == "") {
        alert("The input should not be empty.");
        return;
    }
    var data = {};
    data["arg1"] = arg1;
    data["arg2"] = arg2;
    data["arg3"] = arg3;

    var js = JSON.stringify(data);
    console.log("JS" + js);

    var xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open("POST", addClassification_url, true);
    // send the collected data as JSON
    xhr.send(js);
    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        console.log(xhr);
        console.log(xhr.request);

        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("XHR:" + xhr.responseText);
            processAddclassificationResponse(xhr.responseText);
        } else {
            processAddclassificationResponse("N/A");
        }
    };
}

function handleAddSubClassificationClick() {
    spinner.style.visibility = "visible";
    var form = document.addSubClassification;
    var arg1 = form.arg1.value;
    var arg2 = fatherID;
    var arg3 = locatedLevel;

    if (arg1 == null || arg1 == "") {
        alert("The input should not be empty.");
        return;
    }
    var data = {};
    data["arg1"] = arg1;
    data["arg2"] = arg2;
    data["arg3"] = arg3 + 1;

    var js = JSON.stringify(data);
    console.log("JS" + js);

    var xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open("POST", addClassification_url, true);
    // send the collected data as JSON
    xhr.send(js);
    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        console.log(xhr);
        console.log(xhr.request);

        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("XHR:" + xhr.responseText);
            processAddclassificationResponse(xhr.responseText);
        } else {
            processAddclassificationResponse("N/A");
        }
    };
}

//添加算法处理
function handleAddAlgorithmClick() {
    spinner.style.visibility = "visible";
    var form = document.addAlgorithm;
    var arg1 = form.arg1.value;
    var arg2 = form.arg2.value;
    var arg3 = fatherID;
    if (arg1 == null || arg1 == "") {
        alert("The input should not be empty.");
        return;
    }
    if (arg2 == null || arg2 == "") {
        alert("The input should not be empty.");
        return;
    }
    var data = {};
    data["arg1"] = arg1;
    data["arg2"] = arg3;
    data["arg3"] = arg2;

    var js = JSON.stringify(data);
    console.log("JS" + js);

    var xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open("POST", addAlgorithm_url, true);
    // send the collected data as JSON
    xhr.send(js);
    // This will process results and update HTML as appropriate. 
    xhr.onloadend = function () {
        console.log(xhr);
        console.log(xhr.request);

        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("XHR:" + xhr.responseText);
            processAddAlgorithmResponse(xhr.responseText);
        } else {
            processAddAlgorithmResponse("N/A");
        }
    };
}