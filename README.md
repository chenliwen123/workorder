# workorder
工单系统

======
## 注意
后台地址 
>改变后台地址的时候  需要动这三个文件中的后台地址域名

* 在main.js 
* store/index.js 
* tijiao.vue 

[走走走我们去百度](https://www.baidu.com/)


## 接下来要做的功能和优化  在此记录
* ~~待接收工单 位置需要实现搜索功能(id,工单类型 下单人)~~
* FTP查询 位置需要实现搜索功能
* ~~FTP查询 位置没有删除按钮~~
* 只有待接收工单 位置删除好使
* ~~已完成位置 列表页不是获取的数据~~
* ~~数据库中有打赏分数列表  没实现打赏分数功能~~
* ~~翻页功能只在待接收列表是正常的 需要解决~~
* ~~待接收工单 位置没有打赏后的工单 需要把已完成的工单显示在待接收工单上~~
* ~~当前状态 待接收和待打赏都是蓝色 需要有一个调整颜色~~
* 后台需要建立数据表 用于用户登录 并且修改PHP文件
* ~~待打赏的工单 详情页需要加打赏按钮~~
* 有新工单时候 工单列表位置有新消息提醒
* 解决图片验证码插件  需要翻墙（找国内的图片网站）
* ~~后台控制器需要上传~~
### 2019.0919
* ~~待接收列表不论什么状态都有接收按钮~~
* ~~详情页添加各种方法~~

### 2019.0920
* 删除没有返回方法   

### 2019.0921
* 删除后没有返回值 研究了两天之后  返回是因为MessageBox.$confirm的问题  后续想办法解决吧

### 2019.09.26
* 域名和子域名之间需要唯一属性 子域名的表三个字段考虑过了  都不行
   唯一可以用的是ym字段 但是是用户控制  所以不能使用 