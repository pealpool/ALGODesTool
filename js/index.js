let $dp = document.getElementById('getBox');
let imgData;
let myFileName;
let myHtmlData_1 = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><title>设计稿</title><script type="text/javascript">        function scrollWindow() {            let w = 960 - document.body.clientWidth / 2;            window.scrollTo(w, 0);        }        document.oncontextmenu = new Function("return false;");        document.onkeydown = document.onkeyup = document.onkeypress = function (e) {            e = event || window.event || arguments.callee.caller.arguments[0];            if (e.keyCode === 123) {                e.returnValue = false;                return false;            }        };        document.documentElement.addEventListener(\'touchstart\', function (event) {            if (event.touches.length > 1) {                event.preventDefault();            }        }, false);        let lastTouchEnd = 0;        document.documentElement.addEventListener(\'touchend\', function (event) {            let now = Date.now();            if (now - lastTouchEnd<= 300) {                event.preventDefault();            }            lastTouchEnd = now;        }, false);</script><style>        img {            pointer-event: none;            -webkit-user-select: none;            -moz-user-select: none;            user-select: none;        }</style></head><body style="margin:0; padding:0" onload="scrollWindow()"><img src="';
let myHtmlData_2 = '"/></body></html>';

$dp.addEventListener('dragover', function (e) {
    e.stopPropagation();
    //阻止浏览器默认打开文件的操作
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});

$dp.addEventListener("drop", function (e) {
    e.stopPropagation();
    //阻止浏览器默认打开文件的操作
    e.preventDefault();
    let files = e.dataTransfer.files;
    let file = files[0];
    let imgFile = new FileReader();
    myFileName = getFileName(file.name);
    imgFile.readAsDataURL(file);
    imgFile.onload = function () {
        imgData = this.result; //base64数据
        // console.log(imgData);
        overLook(imgData);
    }
});

function getFileName(name) {
    return name.substring(0, name.lastIndexOf("."))
}

function overLook(imgData) {
    $('#myImg').remove();
    let $img = document.createElement("img");
    $img.id = 'myImg';
    $img.src = imgData;
    document.body.appendChild($img);
    $('#backGroundBox').hide();
}

$(document).on('click', '#reBox', function () {
    $('#myImg').remove();
    $('#backGroundBox').show();
});


$(document).on('click', '#downloadBox', function () {
    let myHtmlData = myHtmlData_1 + imgData + myHtmlData_2;
    let funDownload = function (content, filename) {
        let eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        let blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }
    funDownload(myHtmlData, myFileName + '设计稿.html');
});


//todo reset也要省了吧