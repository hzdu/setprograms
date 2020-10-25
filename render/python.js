var downloadpython = document.querySelector("#downloadpython")
var downloadanaconda = document.querySelector("#downloadanaconda")
var downloadpyqt = document.querySelector("#downloadpyqt")

downloadpython.onclick = () => {
    content.innerHTML = "下载Python安装程序<br/>"
    execcmd("start https://www.python.org/",function(err, stdout, stderr){})
}

downloadanaconda.onclick = () => {
    content.innerHTML = "下载Anaconda安装程序<br/>"
    execcmd("start https://www.anaconda.com/products/individual",function(err, stdout, stderr){})
}