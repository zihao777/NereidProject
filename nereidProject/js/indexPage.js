var spinner = document.getElementById("spinner");
var fatherID;
var locatedLevel;
var addClassificationTarget;
$(document).ready(handleGetClassificationHierarchy);

/*----------------------------------------------处理结果函数----------------------------------------------------*/
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

        $('.list-group-item').off("click").on('click', function () {
            $('.caret', this)
                .toggleClass('bi-caret-down-fill')
                .toggleClass('bi-caret-right-fill');
        });



        //添加点击事件
        var menue1 = document.getElementById("menue1");
        var menue2 = document.getElementById("menue2");
        $(".classification").off("contextmenu").on("contextmenu", function (e) {
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
        $(".algorithm").off("contextmenu").on("contextmenu", function (e) {
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

        $(".implementation").off("clcik").on("click", function (e) {
            console.log("点到我了")
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
            $("div.addAlgorithmBoard").css({ "display": "block", "z-index": "3" });
        })
        $("div.addAlgorithmBoard button.addAlgoConcel").off("click").on("click", function (e) {
            $("div.addAlgorithmBoard").css({ "display": "none", "z-index": "-3" });
        })
        $("div.addAlgorithmBoard button.addAlgoSubmit").off("click").on("click", function (e) {
            $("div.addAlgorithmBoard").css({ "display": "none", "z-index": "-3" });
            handleAddAlgorithmClick();
            $("input#inputNewAlgorithmName").val("");
            $("inputNewAlgorithmDescription").val("");
            e.stopPropagation();
        })

        //add implementation
        $("button.uploadImplementationButton").off("click").on("click", function (e) {
            $("div.uploadImplementationBoard").css({ "display": "block", "z-index": "3" });
        })
        $("div.uploadImplementationBoard button.addImplementationConcel").off("click").on("click", function (e) {
            $("div.uploadImplementationBoard").css({ "display": "none", "z-index": "-3" });
        })
        $("div.uploadImplementationBoard button.addImplementationSubmit").off("click").on("click", function (e) {
            $("div.uploadImplementationBoard").css({ "display": "none", "z-index": "-3" });
            handUploadImplementation();
            $("input#inputNewImplementationLanguage").val("");
            $("input#inputNewImplementationContent").val("");
        })

        // spinner off
        spinner.style.visibility = "hidden";
        $("#dropdownAction").css("visibility", "visible")

    } else {
        alert(error)
    }
}
//添加类别结果处理
function processAddclassificationResponse(result) {
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

//添加算法结果处理
function processAddAlgorithmResponse(result) {
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
//添加实现结果处理
function processUploadImplementationResponse(result) {
    spinner.style.visibility = "hidden";
    console.log("result:" + result);
    var js = JSON.parse(result);

    var response = js["response"];
    var httpCode = js["httpCode"];

    if (httpCode == 200) {
        handleGetClassificationHierarchy();
        console.log("upload implementation sucess");
    } else {
        alert("upload implementation not success");
    }
}
/*-------------------------------------------------工具--------------------------------------------*/
//生成classification hierarychy
function generateList(elem, elemToAppend) {
    if (Object.keys(elem.childern).length === 0) {
        let a = document.createElement("a");
        a.setAttribute("class", "list-group-item classification");
        a.setAttribute("data-toggle", "collapse");
        a.style.paddingLeft = elem.level * 30 + "px";
        a.setAttribute("data-identity", elem.id + "");
        a.setAttribute("data-level", elem.level + "");

        if (!(elem.algos.length == 0)) {
            let div = document.createElement("div");
            div.setAttribute("class", "list-group collapse");
            div.setAttribute("id", elem.name);

            a.setAttribute("href", "#" + elem.name);

            let icon = document.createElement("i");
            icon.setAttribute("class", "bi bi-caret-right-fill caret");
            icon.setAttribute("data-identity", elem.id + "");
            icon.setAttribute("data-level", elem.level + "");

            let span = document.createElement("span");
            span.innerHTML = elem.name;
            span.setAttribute("data-identity", elem.id + "");
            span.setAttribute("data-level", elem.level + "");

            a.appendChild(span);
            a.appendChild(icon);

            for (let j = 0; j < elem.algos.length; j++) {
                console.log(elem.algos[j].name)
                let a = document.createElement("a");
                a.setAttribute("href", "#" + elem.algos[j].name);
                a.setAttribute("class", "list-group-item algorithm");
                a.setAttribute("data-toggle", "collapse");
                a.style.paddingLeft = (elem.level + 1) * 30 + "px";
                a.setAttribute("data-identity", elem.algos[j].id + "");
                a.setAttribute("data-level", elem.level + 1 + "");

                let span = document.createElement("span");
                span.innerHTML = elem.algos[j].name;
                span.setAttribute("class", "text-warning bg-opacity-75");
                span.setAttribute("data-identity", elem.algos[j].id + "");
                span.setAttribute("data-level", elem.level + 1 + "");
                a.appendChild(span);
                if (elem.algos[j].imples.length == 0) {
                    div.appendChild(a);
                } else {
                    let icon = document.createElement("i");
                    icon.setAttribute("class", "bi bi-book");
                    icon.setAttribute("data-identity", elem.algos[j].id + "");
                    icon.setAttribute("data-level", elem.level + 1 + "");
                    a.append(icon);

                    let div1 = document.createElement("div");
                    div1.setAttribute("class", "list-group collapse");
                    div1.setAttribute("id", elem.algos[j].name);

                    for (let k = 0; k < elem.algos[j].imples.length; k++) {
                        console.log(elem.algos[j].imples[k].language)
                        let a = document.createElement("a");
                        a.setAttribute("href", "#");
                        a.setAttribute("class", "list-group-item implementation text-success bg-opacity-75");
                        a.innerHTML = elem.algos[j].imples[k].language + " implementation";
                        a.style.paddingLeft = (elem.level + 2) * 30 + "px";
                        div1.appendChild(a);
                    }
                    div.appendChild(a);
                    div.appendChild(div1);
                }

            }
            elemToAppend.appendChild(a);
            elemToAppend.appendChild(div);
        } else {
            a.setAttribute("href", "#");
            a.innerHTML = elem.name;
            elemToAppend.appendChild(a);
        }
    } else {
        let div = document.createElement("div");
        div.setAttribute("class", "list-group collapse");
        div.setAttribute("id", elem.name);

        let a = document.createElement("a");
        a.setAttribute("href", "#" + elem.name);
        a.setAttribute("class", "list-group-item classification");
        a.setAttribute("data-toggle", "collapse");

        let icon = document.createElement("i");
        icon.setAttribute("class", "bi bi-caret-right-fill caret");
        icon.setAttribute("data-identity", elem.id + "");
        icon.setAttribute("data-level", elem.level + "");

        let span = document.createElement("span");
        span.innerHTML = elem.name;
        span.setAttribute("data-identity", elem.id + "");
        span.setAttribute("data-level", elem.level + "");
        a.style.paddingLeft = elem.level * 30 + "px";
        a.setAttribute("data-identity", elem.id + "");
        a.setAttribute("data-level", elem.level + "");
        for (let j = 0; j < elem.childrenID.length; j++) {
            generateList(elem.childern[elem.childrenID[j]], div);
        }
        //添加算法目录
        if (!(elem.algos.length == 0)) {
            for (let j = 0; j < elem.algos.length; j++) {
                let a = document.createElement("a");
                a.setAttribute("href", "#" + elem.algos[j].name);
                a.setAttribute("class", "list-group-item algorithm");
                a.setAttribute("data-toggle", "collapse");
                a.style.paddingLeft = (elem.level + 1) * 30 + "px";
                a.setAttribute("data-identity", elem.algos[j].id + "");
                a.setAttribute("data-level", elem.level + 1 + "");

                let span = document.createElement("span");
                span.innerHTML = elem.algos[j].name;
                span.setAttribute("class", "text-warning bg-opacity-75");
                span.setAttribute("data-identity", elem.algos[j].id + "");
                span.setAttribute("data-level", elem.level + 1 + "");
                a.appendChild(span)
                if (elem.algos[j].imples.length == 0) {
                    div.appendChild(a);
                } else {
                    let icon = document.createElement("i");
                    icon.setAttribute("class", "bi bi-book");
                    icon.setAttribute("data-identity", elem.algos[j].id + "");
                    icon.setAttribute("data-level", elem.level + 1 + "");
                    a.append(icon);
                    let div1 = document.createElement("div");
                    div1.setAttribute("class", "list-group collapse");
                    div1.setAttribute("id", elem.algos[j].name);

                    for (let k = 0; k < elem.algos[j].imples.length; k++) {
                        console.log(elem.algos[j].imples[k].language)
                        let a = document.createElement("a");
                        a.setAttribute("href", "#");
                        a.setAttribute("class", "list-group-item implementation text-success bg-opacity-75");
                        a.innerHTML = elem.algos[j].imples[k].language + " implementation";
                        a.style.paddingLeft = (elem.level + 2) * 30 + "px";
                        div1.appendChild(a);
                    }
                    div.appendChild(a);
                    div.appendChild(div1);
                }

            }
        }
        a.appendChild(span);
        a.appendChild(icon);
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

//添加implementation
function handUploadImplementation() {
    spinner.style.visibility = "visible";
    var form = document.uploadImplementation;
    var arg1 = form.arg1.value;
    var arg2 = form.arg2.value;
    var arg3 = fatherID;
    console.log(fatherID);
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
    data["arg2"] = arg2;
    data["arg3"] = arg3;

    var js = JSON.stringify(data);
    console.log("js" + js);

    var xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open("POST", uploadImplementation_url, true)
    xhr.send(js);

    xhr.onloadend = function () {
        console.log(xhr);
        console.log(xhr.request);

        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("XHR:" + xhr.responseText);
            processUploadImplementationResponse(xhr.responseText);
        } else {
            processUploadImplementationResponse("N/A");
        }
    };
    console.log("Upload Implementtion");
}