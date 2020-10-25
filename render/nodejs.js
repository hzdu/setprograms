var downloadnodejs = document.querySelector("#downloadnodejs")
var setnodejs = document.querySelector("#setnodejs")
var setglobalpath = document.querySelector("#setglobalpath")
var content = document.querySelector(".content")
var nodejsinfo = document.querySelector(".infocontent")
var EnvPath = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment"

let globalvar = ""
var workerProcess

//如果当前系统有安装nodejs，则获取当前系统安装的NodeJS版本跟官网进行对比看是否需要更新
execcmd('node -v', function(err, stdout, stderr) {
    console.log(stdout)
});

//NodeJS下载，打开默认浏览器到下载页
downloadnodejs.onclick = function () {
    content.innerHTML = "下载NodeJS安装程序<br/>"
    execcmd("start https://nodejs.org/zh-cn/", function(err, stdout, stderr) {});
}

//设置NodeJS包存放路径
setglobalpath.onclick = function () {

    dialog.showOpenDialog({
        properties: ['openDirectory'],
        title:'请选择全局包存放路径'
    }).then(result => {
        globalvar = result.filePaths
        nodejsinfo.innerHTML = result.filePaths

        content.innerHTML = "NodeJS系统环境配置完毕<br/>"

        regedit.list(EnvPath, function (err, result) {
            var defaultValue = result[EnvPath].values['Path'].value

            //写入注册表
            //更新用对象
            var newVaulesPut = {
                "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment": {
                    'NODE_PATH': {
                        value: globalvar,
                        type: 'REG_SZ'
                    }
                }
            }
            //获取原来的Path字符串里最后是否有分号
            var pathValue = defaultValue.charAt(defaultValue.length - 1)
            if (pathValue == ";") {
                defaultValue = defaultValue.substr(0, defaultValue.length - 1)
            }
            console.log("defaultValue:" + defaultValue)
            
            var appendVaulesPut = {
                "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment": {
                    'PATH': {
                        value: defaultValue+";%NODE_PATH%;",
                        type: 'REG_SZ'
                    }
                }
            }

            //新建一个子项
            regedit.putValue(newVaulesPut,function(err){})

            //将刚才新建的子项附加到PATH子项中
            regedit.putValue(appendVaulesPut, function (err) { })
            
            fs.writeFile('backup.txt', defaultValue, (error) => {
                if (error) {
                    console.log(error)
                    return false
                }
            })
        })

    }) //End showOpenDialog

}

//设置源、cnpm、yarn、nrm
setnodejs.onclick = function () {
    if (document.querySelector('#taobao').checked) {
        content.innerHTML = "设置NPM安装源为淘宝源"
        workerProcess = execcmd('npm config set registry https://registry.npm.taobao.org/', {});
        workerProcess.stdout.on('data', function (data) {
            content.innerHTML = data;
        });
        workerProcess.on('close', function (code) {
            content.innerHTML = "淘宝源设置完毕"
        })
    }
    if (document.querySelector('#cnpm').checked) {
        content.innerHTML = "安装CNPM包管理工具"
        workerProcess = execcmd('npm install -g cnpm', {});
        workerProcess.stdout.on('data', function (data) {
            content.innerHTML = data;
        });
        workerProcess.on('close', function (code) {
            content.innerHTML = "CNPM包管理工具安装完毕"
        })
    }
    if (document.querySelector('#yarn').checked) {
        content.innerHTML = "安装YARN包管理工具"
        workerProcess = execcmd('npm install -g yarn', {});
        workerProcess.stdout.on('data', function (data) {
            content.innerHTML = data;
        });
        workerProcess.on('close', function (code) {
            content.innerHTML = "YARN包管理工具安装完毕"
        })
    }
    if (document.querySelector('#nrm').checked) {
        content.innerHTML = "安装NRM源镜像管理工具"
        workerProcess = execcmd('npm install -g nrm', {});
        workerProcess.stdout.on('data', function (data) {
            content.innerHTML = data;
        });
        workerProcess.on('close', function (code) {
            content.innerHTML = "NRM源镜像管理工具安装完毕"
        })
    }
}