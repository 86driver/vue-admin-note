<template>
  <Layout>
    <Header class="header">
      <Row>
        <i-col :xs="0" :sm="0" :md="4">
          <img class="logo" src="../../static/images/logo.png" alt="">
        </i-col>
        <i-col :xs="0" :sm="18" :md="17">
          <div class="slogan">保持进步，随时印象笔记</div>
        </i-col>
        <i-col :xs="24" :sm="6" :md="3">
          <Row>
            <i-col span="12">
              <Dropdown @on-click="logout">
                <Avatar src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" />
                <DropdownMenu slot="list">
                  <DropdownItem name="logout">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="12">
              <Icon @click="drawer = true" type="ios-link" size="24" />
              <Drawer
                v-model="drawer"
                :closable="false"
                title="Demo 相关"
                width="500">
                <Collapse simple accordion>
                  <Panel>
                    Demo 介绍
                    <p slot="content">
                      这是一个类似于后台管理系统的笔记本<br><br>
                      利用接口做了路由拦截，用户需要登录才能看到里面的内容<br><br>
                      每个用户只能看到自己做的笔记<br><br>
                      笔记本列表页：每一行数据相当于一个笔记本，在这里可以新建笔记本和导出现有页面的笔记，
                                   需要注意的是如果该笔记本内如果还有笔记的话是不能删除这个笔记本的<br><br>
                      笔记详情页：在这个页面可以看到某一笔记本下做的笔记，
                                 在这个页面您可以切换不同的笔记本、在该笔记本下添加、修改和保存笔记，
                                 在这个页面删除的笔记本会放回回收站<br><br>
                      回收站页：在这个页面您可以看到您之前在笔记详情页面删除的笔记，在这个页面您可以恢复笔记
                                需要注意的是在回收站删除的笔记不可恢复
                    </p>
                  </Panel>
                  <Panel>
                    技术栈
                    <p slot="content">
                      响应式布局：header页面和sider页面的响应式布局
                                  当浏览器窗口小于一定尺寸的时候侧边导航栏消失，出现类似于手机端的导航按钮<br><br>
                      vue全家桶：由于demo需要保存的数据不多，所以没有用到vuex<br><br>
                      iview UI框架<br><br>
                      axios 获取后台数据
                    </p>
                  </Panel>
                  <Panel>
                    发现BUG可以通过下面联系方式联系我
                    <p slot="content">
                      微信：a610410574<br><br>
                      QQ：610410574
                    </p>
                  </Panel>
                  <Panel>
                    Github
                    <p slot="content">
                      <a href="https://github.com/86driver/vue-admin" target="_blank">本demo的github地址</a><br><br>
                      <a href="https://github.com/86driver/vue-community" target="_blank">我的另一个demo: PC版vue.js社区</a><br><br>
                      <a href="https://github.com/86driver/Magua-Music" target="_blank">我的另一个demo: 移动端音乐app</a><br><br>
                    </p>
                  </Panel>
                </Collapse>
              </Drawer>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </Header>
    <Layout>
      <Sider class="sider" width="240" v-model="isCollapsed" :class="{ 'hide': isCollapsed }">
        <Menu theme="dark" :active-name="activeName">
          <MenuItem name="/notebooks" to="/notebooks">
            <Icon type="ios-book" size="20" />
            <span>笔记本列表</span>
          </MenuItem>
          <MenuItem name="/notes" to="/notes">
            <Icon type="ios-book" size="20" />
            <span>笔记详情</span>
          </MenuItem>
          <MenuItem name="/trash" to="/trash">
            <Icon type="ios-trash-outline" size="20" />
            <span>回收站</span>
          </MenuItem>
          <MenuItem name="/echarts" to="/charts">
            <Icon type="md-pie" size="20" />
            <span>统计相关</span>
          </MenuItem>
        </Menu>
      </Sider>
      <!-- 浏览器窗口小于768px的侧栏导航 -->
      <Dropdown class="small-sider" @on-click="toItems">
        <Icon type="md-menu" size="36" />
        <DropdownMenu slot="list">
          <DropdownItem name="/notebooks">笔记本列表</DropdownItem>
          <DropdownItem name="/notes">笔记详情</DropdownItem>
          <DropdownItem name="/trash">回收站</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Content class="content" :class="{'content-expand': isCollapsed}">
        <router-view/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import Auth from '../apis/Auth.js'
export default {
  data() {
    return {
      news: 1,
      isCollapsed: false,
      activeName: '',
      drawer: false
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === '/notebooks' || to.path === '/notes' || to.path === '/trash') {
        this.activeName = this.$route.path
      }
    }
  },
  created() {
    this.activeName = this.$route.path
  },
  methods: {
    // 屏幕小于768px时的导航栏时间
    toItems(name) {
      this.$router.push({path: name})
      this.activeName = this.$route.path // 高亮同步
    },
    // 注销登录
    logout(name) {
      if (name === 'logout') {
        Auth.logout().then(res => {
          this.$router.push('/login')
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #fff;
}
.logo {
  height: 40px;
}
.slogan {
  font-size: 20px;
  font-weight: 700;
}
.sider {
  position: fixed;
  left: 0;
  top: 60px;
  height: 100%;
  overflow: auto;
}
.small-sider{
  display: none;
}
.hide .ivu-menu-item span {
  display: none;
}
.content{
  position: fixed;
  top: 60px;
  left: 240px;
  right: 0;
  bottom: 0;
  transition: all 0.2s ease-in-out;
  background: #fbfbfb;
}
.content-expand{
  left: 84px;
}
@media (max-width: 768px){
  .sider{
    display: none;
  }
  .small-sider{
    position: fixed;
    top: 10px;
    right: 10px;
    display: block;
  }
  .content{
    top: 60px;
    left: 0px;
  }
}
</style>