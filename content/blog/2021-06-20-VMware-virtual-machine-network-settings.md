---
title: 'VMware 虚拟机网络设置'
date: '2021-06-20'
slug: 'vm-ware-virtual-machine-network-settings'
pictureView: [
  {
    title: 'VMware 提供的各种网络连接方式',
    src: 'https://lipk.oss-accelerate.aliyuncs.com/images/2021-06-20-VMware-virtual-machine-network-settings(1).jpg',
  },
  {
    title: 'VMnet8 适配器设置和 WLAN IP',
    src: 'https://lipk.oss-accelerate.aliyuncs.com/images/2021-06-20-VMware-virtual-machine-network-settings(2).jpg',
  },
  {
    title: 'VMnet8 适配器设置和 WLAN IP',
    src: 'https://lipk.oss-accelerate.aliyuncs.com/images/2021-06-20-VMware-virtual-machine-network-settings(3).jpg',
  },
]
coverPicture: {
  title: 'VMware 提供的各种网络连接方式',
  src: 'https://lipk.oss-accelerate.aliyuncs.com/images/2021-06-20-VMware-virtual-machine-network-settings.jpg',
}
---

将 VMware 虚拟机里的 Linux 于本机相连，并使虚拟机的 Linux 联网。相信这应该是 Linux 课程中必定会有的内容。

VMware 提供了多种网络连接方式，这里仅介绍 NAT，因为这是常用的连接方式中，设置比较麻烦的。

![VMware 提供的各种网络连接方式](https://lipk.oss-accelerate.aliyuncs.com/images/2021-06-20-VMware-virtual-machine-network-settings(1).jpg)

为了让虚拟机中的 Linux 连上网，要看本机当前联网的 IP 是在那个网段。使用 `ipconfig`，要注意当前本机使用的网络连接方式。网线连接看以太网 IP，WiFi 看 WLAN IP。

保证一下两点：

1. 虚拟机内 Linux IP、VMnet8 适配器 IP 设置与本机 IP 同一网段。
2. 虚拟机内 Linux 网关、VMware nat 设置的网关和本机的网关是同一个。

### VMnet8 适配器 IP 设置与本机同一网段

当前使用 WiFi 上网，WLAN IP 192.168.31.152，子网掩码 255.255.255.0，即 192.168.31.0 网段。

要设置 VMnet8 适配器 IP 设置为 192.168.31.0 ~ 192.168.31.255 之间的非重复 IP。这里设置为了 192.168.31.99。

![VMnet8 适配器设置和 WLAN IP](https://lipk.oss-accelerate.aliyuncs.com/images/2021-06-20-VMware-virtual-machine-network-settings(2).jpg)

Linux 网卡设置，IP 设置为 192.168.31.0 ~ 192.168.31.255 之间的非重复 IP。

以下为 Linux 网卡设置：

```bash
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=b4bff222-fafe-4f89-8002-59d3bd5f8943
# DEVICE=ens33
ONBOOT=yes

# IP 子网掩码 网关 DNS
IPADDR=192.168.31.21
NETMASK=255.255.255.0
GATEWAY=192.168.31.1
DNS1=8.8.8.8
DNS2=8.8.4.4
```

### 虚拟机内 Linux 网关、VMware nat 设置的网关和本机的网关是同一个

虚拟机内 Linux 网关在上面可以看到，和本机网关是一样的，都是 192.168.31.1。

VMware nat 设置指的是 VMware 的设置，路径如下：

面板 > 编辑 > 虚拟网络编辑器 > 更改设置

![VMware nat 设置](https://lipk.oss-accelerate.aliyuncs.com/images/2021-06-20-VMware-virtual-machine-network-settings(3).jpg)

上图的**重点设置**如下：

1. 勾选：将主机虚拟网络适配器连接到此网络
2. 子网 IP
3. 子网掩码
4. 网关
