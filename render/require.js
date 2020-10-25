var regedit = require("regedit")
var fs = require("fs")
const { dialog } = require('electron').remote;
var execcmd = require('child_process').exec
var { shell } = require("electron")

var aHref = document.querySelector("#aHrefs")
aHref.onclick = function (e) {
    e.preventDefault()
    var href = this.getAttribute('href')
    shell.openExternal(href)
}