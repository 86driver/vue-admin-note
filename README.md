# 类后台管理记事本
</br></br>
>* 项目预览：https://86driver.github.io/vue-admin-note/vue-admin/dist/#/login </br></br>

## 介绍
> 这是一个类似于后台管理系统的笔记本
>>利用接口做了路由拦截，用户需要登录才能看到里面的内容

>>每个用户只能看到自己做的笔记

>>笔记本列表页：每一行数据相当于一个笔记本，在这里可以新建笔记本和导出现有页面的笔记， 需要注意的是如果该笔记本内如果还有笔记的话是不能删除这个笔记本的

>>笔记详情页：在这个页面可以看到某一笔记本下做的笔记， 在这个页面您可以切换不同的笔记本、在该笔记本下添加、修改和保存笔记， 在这个页面删除的笔记本会放回    回收站

>>回收站页：在这个页面您可以看到您之前在笔记详情页面删除的笔记，在这个页面您可以恢复笔记 需要注意的是在回收站删除的笔记不可恢复

## 展示
#### 登录页面
![登录页面](https://github.com/86driver/Demo-imgs/blob/master/vue-admin-note/loginPage.png)
#### 笔记本列表页
![笔记本列表页](https://github.com/86driver/Demo-imgs/blob/master/vue-admin-note/notebookPage.png)
#### 笔记详情页
![笔记详情页](https://github.com/86driver/Demo-imgs/blob/master/vue-admin-note/noteDetailPage.png)
#### 回收站页面
![回收站页面](https://github.com/86driver/Demo-imgs/blob/master/vue-admin-note/trashPage.png)
#### 统计页面
![统计页面](https://github.com/86driver/Demo-imgs/blob/master/vue-admin-note/chartPage.png)
#### 项目相关（抽屉）
![项目相关](https://github.com/86driver/Demo-imgs/blob/master/vue-admin-note/about1.png)
#### 响应式展示
![响应式展示](https://github.com/86driver/Demo-imgs/blob/master/vue-admin-note/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B1%95%E7%A4%BA.png)


## 所用知识
>* `响应式布局：header页面和sider页面的响应式布局 当浏览器窗口小于一定尺寸的时候侧边导航栏消失，出现类似于手机端的导航按钮`
>* `axios`
>* `vue全家桶：由于demo需要保存的数据不多，所以没有用到vuex`
>* `mavonEditor`
>* `ECharts`
>* `iview UI框架` </br></br>

## 发现BUG可以通过下面联系方式联系我：
>* 微信：a610410574
>* QQ：610410574

