<img src="https://repository-images.githubusercontent.com/307140448/c6b45a00-1721-11eb-9fe6-54d1f78643b7" width="50%" height="50%">
# NodeJS、JDK、Python开发环境设置工具<br>
一个用于设置NodeJS、JDK、Python开发环境的小工具，很久没写Javascript了，正好今天也没什么事，动动手捡一下怕忘记了。<br>
其实很久以前我就写过一个类似的JDK开发环境配置小工具发布在网上，那个工具是用Delphi写的，太久了，我都不知道代码让我放哪去了，不知道是不是在我那个忘记了的github上。汗~<br>
后来有不少童鞋用各种语言翻录了那个小工具的功能，我在吾爱上见到的就有易语言、C++、VBS、DELPHI翻的，哈哈哈，好事<br>
今天写这个是三个环境的，因为是打算捡一下的，开始没打算做UI的，看到最后我自己都有点不忍心就这样“裸”发布了，就给套了些CSS（SASS的，如果你不用SASS，直接改assets/css/style.css这个最终生成好的CSS也是没问题的）<br>
<br>编译：<br>
1、将代码Clone当硬盘上<br>
2、终端里cd到源码目录里<br>
3、<font color=#008000>`npm init`</font><br>
4、<font color=#008000>`npm run dev` / `electron .` </font>检查运行是否有错误<br>
5、运行正常的情况下直接npm run build即可（考虑到很多童鞋用electron-build打包的时候因为网络有很多奇葩的问题，我放了一个.npmrc文件到项目根目录下解决该问题）<br>
<br>
当然如果你不想花时间去编译，可以下载编译好的(Windows二进制文件,MAC/LINUX还是需要自己编译一下)<br>
1、https://wwa.lanzous.com/iFKiihr1hxa  ->  绿色版下载地址，解压即用<br>
2、https://wwa.lanzous.com/i35ZChr1kfa -> 安装版<br>

历史记录：<br>
| 日期 | 更新说明 |
| --- | --- |
| 2020.10.25 | push代码到仓库 |
| 2020.10.26 | 修改Windows下node-regedit的一个严重BUG，会导致系统环境变量不生效,改用系统自带的WMIC操作 |
