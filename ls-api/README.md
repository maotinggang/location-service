#启动条件

1.  计算机上必须安装 node.js
2.  将 node 文件夹拷贝到 c 盘目录下
3.  需要使用 pm2 时，需要安装 pm2

#配置

1.  修改/config/ecosystem.json 进行服务名称，log，时间格式，端口进行配置

#运行

1.  start.bat 命令窗口运行进程，不能关闭命令窗口
2.  pm2-start-fork.bat pm2 方式建立单进程，生成 log 文件
3.  pm2-start-cluster.bat 建立多个进程，无 log 文件

#停止

1.  start.bat 启动时，关闭命令窗口，停止运行
2.  pm2-stop-fork.bat pm2 方式停止单进程
3.  pm2-stop-cluster.bat pm2 方式停止多个进程

#删除

1.  命令窗口输入命令 pm2 delete ls-http-fork 删除 pm2-start.bat 进程
2.  命令窗口输入命令 pm2 delete ls-http-cluster 删除 pm2-start-cluster.bat 进程

#监控

1.  pm2-monit.bat pm2 方式进行运行监测
