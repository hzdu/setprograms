// var regedit = require("regedit")
// var fs = require("fs")
// const { dialog } = require('electron').remote;
// var execcmd = require('child_process').exec

var downloadjdk = document.querySelector("#downloadjdk")
var setjdk = document.querySelector("#setjdk")

downloadjdk.onclick = () => {
    content.innerHTML = "下载JDK安装程序<br/>"
    execcmd("start https://www.oracle.com/java/technologies/java-se-glance.html",function(err, stdout, stderr){})
}

setjdk.onclick = () => {
    dialog.showOpenDialog({
        properties: ['openDirectory'],
        title:'请选择JDK安装路径'
    }).then(result => {
        globalvar = result.filePaths
        nodejsinfo.innerHTML = result.filePaths

        content.innerHTML = "JDK系统环境配置完毕<br/>"

        regedit.list(EnvPath, function (err, result) {
            var defaultValue = result[EnvPath].values['Path'].value

            //写入注册表
            //更新用对象
            var newVaulesPut = {
                "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment": {
                    'JAVA_HOME': {
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
            console.log("defaultValue:"+defaultValue)

            var appendVaulesPut = {
                "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment": {
                    'PATH': {
                        value: defaultValue+";%JAVA_HOME%\\bin;%JAVA_HOME%\\jre\\bin;",
                        type: 'REG_SZ'
                    }
                }
            }

            //新建一个子项
            regedit.putValue(newVaulesPut, (err)=>{console.log(err)})

            //将刚才新建的子项附加到PATH子项中
            regedit.putValue(appendVaulesPut,(err)=>{console.log(err)})
    
            fs.writeFile('backup.txt', defaultValue, (error) => {
                if (error) {
                    console.log(error)
                    return false
                }                
            })
    
        })

    }) //End showOpenDialog
}