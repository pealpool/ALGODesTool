let $dp = document.getElementById('getBox');
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
    imgFile.readAsDataURL(file);
    imgFile.onload = function () {
        let imgData = this.result; //base64数据
        console.log(imgData);
    }
});

function changeFrameHeight() {
    let ifm = document.getElementById("myFrame");
    ifm.height = document.documentElement.clientHeight;
}

window.onresize = function () {
    changeFrameHeight();
}

let $myFm = document.createElement("iframe");
$myFm.src = "翼彩-首页设计稿.html";
$myFm.frameBorder = 0;
$myFm.id='myFrame';

if ($myFm.attachEvent){
    $myFm.attachEvent("onload", function(){
        alert("Local iframe is now loaded.");
    });
} else {
    $myFm.onload = function(){
        console.log("Local iframe is now loaded.");
        $("#myFrame").scrollLeft(400);//todo 无效
    };
}
document.body.appendChild($myFm);


$(document).on('click','#reBox',function () {
   $('#myFrame').remove();
   $('#getBox').show();
});