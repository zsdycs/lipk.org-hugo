 
1. vscode git 本地仓库提交（强制推送）  
```git push  origin master -f```
1. 本地```hugo```生成新的```/public```
1. ```git push```到GitHub
2. 服务器同步    
```git pull origin master```
3. 删除```/var/www/html/```下的所有文件  
```rm -rf /var/www/html/*```
3. 在```/zsdycs-blog```下重新建立链接  
```\cp -rf ./public/* /var/www/html/```
4. 拷贝music  
``` \cp -rf /var/www/music/* /var/www/html/music/ ```