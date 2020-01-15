1. 输入指令`rpm -qa | grep http`查看本机Linux是否安装了httpd
2. 使用`service httpd restart`/`systemctl start httpd`就可以可以重新启动httpd服务
3. `service iptables status`查看一下状态
4. `service iptables stop`关闭防火墙
5. `netstat -tunlp | grep 80`查看 80 端口的情况
6. 修改主机名`hostname xxxx`
7. 安装apache`yum install httpd`
8. 安装git`yum install git`
8. 查看httpd是否安装成功`rpm -qa |grep httpd`
9. 