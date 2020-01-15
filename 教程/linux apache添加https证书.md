1. 安装ssl模块
`yum install mod_ssl -y`
2. 先建一个目录用来放ssl证书文件
`mkdir /etc/httpd/ssl/`
4. 上传证书文件到/etc/httpd/ssl/目录下

```
# rz，sz是Linux/Unix同Windows进行ZModem文件传输的命令行工具。
yum install lrzsz
rz # 上传
sz # 下载
```

5. 编辑ssl配置文件
`vim /etc/httpd/conf.d/ssl.conf`

```
DocumentRoot "/var/www/html" # 网页文件路径
ServerName 域名:443 # 改为自己的域名
SSLEngine on # 启用SSL功能

SSLCertificateFile /etc/httpd/ssl/xxx.crt # 填写证书文件路径
SSLCertificateKeyFile /etc/httpd/ssl/xxx.key # 填写私钥文件路径
SSLCertificateChainFile /etc/httpd/ssl/xxx_bundle.crt # 填写证书链文件路径
```
6. 重启服务器`service httpd restart`或者`systemctl restart httpd`
7. 证书下载 https://www.sslforfree.com/
8. 多个域名则多个
```
<VirtualHost *:443>
......
</VirtualHost>
```
