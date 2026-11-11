---
title: Servlet 学习笔记
date: 2026-11-11 00:00:00
tags:
  - Java
  - Servlet
---

## Servlet（Server Applet）：

java编写的服务端程序，主要功能用于交互式浏览和修改数据。狭义的Servlet是指Java语言实现的一个接口，广义的Servlet是指任何实现了这个Servlet接口的类，一般情况下，人们将Servlet理解为后者。Servlet可以响应任何类型的请求,但是大多数情况只用于扩展基于Http协议的服务器。

> 目前的Servlet已经内嵌在tomocat中

## Servlet 工作模式：

1. 客户端发送请求至服务器
2. 服务器启动并调用Servlet,Servlet根据客户请求生成响应内容传回服务器
3. 服务器将响应返回给客户端

## Servlet Api：

    Servlet API 包含以下4个Java包：

1. javax.servlet   其中包含定义servlet和servlet容器之间契约的类和接口。

2. javax.servlet.http   其中包含定义HTTP Servlet 和Servlet容器之间的关系。

3. javax.servlet.annotation   其中包含标注servlet，Filter,Listener的标注。它还为被标注元件定义元数据。

4. javax.servlet.descriptor，其中包含提供程序化登录Web应用程序的配置信息的类型。

## Servlet 工作原理：

Servlet接口定义了Servlet与servlet容器之间的契约。这个契约是：Servlet容器将Servlet类载入内存，并产生Servlet实例和调用它具体的方法。但是要注意的是，在一个应用程序中，每种Servlet类型只能有一个实例。

用户请求致使Servlet容器调用Servlet的Service（）方法，并传入一个ServletRequest对象和一个ServletResponse对象。ServletRequest对象和ServletResponse对象都是由Servlet容器（例如TomCat）封装好的，并不需要程序员去实现，程序员可以直接使用这两个对象。

ServletRequest中封装了当前的Http请求，因此，开发人员不必解析和操作原始的Http数据。ServletResponse表示当前用户的Http响应，程序员只需直接操作ServletResponse对象就能把响应轻松的发回给用户。

对于每一个应用程序，**Servlet容器还会创建一个ServletContext对象。这个对象中封装了上下文（应用程序）的环境详情。每个应用程序只有一个ServletContext。每个Servlet对象也都有一个封装Servlet配置的ServletConfig对象。**

