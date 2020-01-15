
```
RewriteEngine On
RewriteCond %{HTTP:X-Forwarded-Proto} !https [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://example.com%{REQUEST_URI} [L,NE,R=301]
```

--------------------

```
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://example.com%{REQUEST_URI} [L,NE,R=301]
```

--------------------
### 正解

```
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteCond %{HTTP_HOST} ^(?:www\.)?(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [L,NE,R=301]
```

----------------------
### 跳转到www

```
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteCond %{HTTP_HOST} ^(?:www\.)?(.+)$ [NC]
RewriteRule ^ https://www.%1%{REQUEST_URI} [L,NE,R=301]
```

---------------------
参考：
1. https://codeday.me/bug/20180919/252997.html
2. https://simonecarletti.com/blog/2016/08/redirect-domain-http-https-www-apache/
3. https://blog.csdn.net/freedom_wbs/article/details/43525877
---------------------
### /etc/httpd/conf/httpd.conf文件修改
1. `Options Indexes FollowSymLinks`后面的`AllowOverride None`改为`AllowOverride All`
2. `Include conf.modules.d/*.conf`后面加上`LoadModule rewrite_module modules/mod_rewrite.so`
----------------------
### 某一栏目301跳转

```
RewriteCond %{REQUEST_URI} ^/kangle/
RewriteRule ^kangle/(.*) http://kangle.puercn.com/$1 [R=permanent,L]
```
--------------------
### 重定向到新域名

```
RewriteEngine on
RewriteRule ^(.*)$ http://www.PiaoYun.CC/$1 [L,R=301]
```
