# rest api for 67

>  use koa2 + mongoose

## build
``` shell
# 安装依赖
$ npm install

# 开发模式
$ npm start

# pm2
# 开发模式
$ pm2 start pm2.json --watch

# pm2
# 生产模式
$ pm2 start pm2.json
```

## api

* 返回数据结构
    * status
        * true 正常
        * false 失败
    * message 返回错误信息
    * result 返回数据

### client api


* 文章相关
    * 获取某一篇文章（参数文章id）
    `GET` http://localhost:3000/67api/blog/article/findById?id=58f1ce994ea72336c4992469
    * 阅读量+1
    `GET`http://localhost:3000/67api/blog/article/readings?id=58f1ce994ea72336c4992469
    * 获取所有文章
    `GET`http://localhost:3000/67api/blog/allArtList
    * 首页分页获取文章列表（参数当前页，分页条数）
    `GET`http://localhost:3000/67api/blog/article?currentPage=1&pageSize=2
* 基本信息
    * 获取基本信息 `GET` http://localhost:3000/67api/blog/basis
    * 网站访问量+1 `GET` http://localhost:3000/67api/blog/basis/hits
* 分类
    * 获取分类信息 `GET` http://localhost:3000/67api/blog/category
* 友情链接
    * 获取友情链接 `GET` http://localhost:3000/67api/blog/link

### server api


* 管理员
    * 初始化管理员 `GET` http://localhost:3000/67api/admin/67one/init 用户名：admin 密码：123456
    * 新增管理员 `POST` localhost:3000/67api/admin/admin/add (参数：管理员信息)
    * 管理员列表 `POST` localhost:3000/67api/admin/admin
    * 删除管理员 `DELETE` localhost:3000/67api/admin/admin/delete (参数id:管理员id)
    * 查找管理员 `POST` localhost:3000/67api/admin/admin/findById (参数id:管理员id)
    * 更新管理员 `PUT` localhost:3000/67api/admin/admin/update (参数：管理员信息)
    * 登陆 `POST` localhost:3000/67api/admin/admin/login (参数:用户名和密码)
* 文章
    * 新增文章 `POST` localhost:3000/67api/admin/article/add
    * 文章列表 `POST` localhost:3000/67apilocalhost:3000/67api/admin/article
    * 更新文章 `PUT` localhost:3000/67api/admin/article/update
    * 回收站列表 `POST` /admin/article/trash
    * 查找文章 `POST` /admin/article/findById
    * 加入正式文章列表 `PUT` /admin/article/nodelete
    * 删除文章 `DELETE` /admin/article/delete
* 基本信息
    * 新增基本信息 `POST` /admin/basis/add
    * 获取基本信息 `POST` /admin/basis
    * 更新基本信息 `PUT` /admin/basis/update
* 分类
    * 新增分类 `POST` /admin/category/add
    * 获取分类 `POST` /admin/category
    * 删除分类 `DELETE` /admin/category/delete
    * 获取分类信息 `POST` /admin/category/findById
    * 更新分类 `PUT` /admin/category/update
