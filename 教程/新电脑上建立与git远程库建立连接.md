1. 下载代码。
2. 用vs code建立本地库，或用``` git init ```
3. 建立远程库```git remote add origin https://xxx.com/xxx.git```
4. ```git pull origin master``` 将远程的master分支代码合并到本地,因为太慢，建议直接下载后建立本地库，这里就可以跳过了。
5. 将本地的改动提交到远程```git add .``````git commit -m "first commit " ```
6. 提交到远程库```git push -u origin master```这里需要输入远程库的密码。

出现“error: failed to push some refs to 'https://xxx.com/xxx.git'”错误使用``` git pull --rebase origin master ```然后再执行``` git push -u origin master ```
