### vagrant
vagrant是一个工具，用于创建和部署虚拟化开发环境的。

拿VirtualBox举例，VirtualBox会开放一个创建虚拟机的接口，Vagrant会利用这个接口创建虚拟机，并且通过Vagrant来管理，配置和自动安装虚拟机。

Vagrant命令 | 解释
---|---
vagrant box add | 新增加一个box
vagrant box list | 查看目前已有的box
vagrant box remove | 删除指定box
vagrant init | 初始化配置vagrantfile
vagrant up | 启动虚拟机
vagrant ssh | ssh登录虚拟机
vagrant suspend | 挂起虚拟机 
vagrant reload | 重启虚拟机
vagrant halt | 关闭虚拟机
vagrant status | 查看虚拟机状态
vagrant destroy | 删除虚拟机

### rails

rails命令 | 解释
---|---
bin/rails generate controller Xxxx yyyy | 创建控制器、视图和路由
bin/rails routes | 查看所有标准 REST 动作

### bundle
```
bundle exec rake with_customer_env EXEC="操作" CUSTOMER_ENV=环境变量
```
操作 | 解释 | 环境变量 | 部门 | 端口号
---|---|---|---|---
pumactl start | 项目启动 | kenshoku | 知事部局 | 3002
rails db:migrate | 数据库迁移 | kyoikucho | 教育厅 | 3003
rails db:seed | 数据导入 | kenkei | 县警 | 3001
