<template>
  <Layout>
    <Header class="header">
      <Row>
        <i-col :xs="0" :sm="0" :md="4">
          <img class="logo" src="../../static/images/logo.png" alt="">
        </i-col>
        <i-col :xs="0" :sm="18" :md="15">
          <div class="slogan">保持进步，随时印象笔记</div>
        </i-col>
        <i-col :xs="24" :sm="6" :md="5">
          <Row>
            <i-col span="8">
              <Dropdown @on-click="logout">
                <Avatar src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" />
                <DropdownMenu slot="list">
                  <DropdownItem>我的主页</DropdownItem>
                  <DropdownItem>我的收藏</DropdownItem>
                  <DropdownItem>设置</DropdownItem>
                  <DropdownItem name="logout" :divided=true>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="8">
              <Dropdown>
                <Badge :count="news" :offset="[20, 4]">
                  <Icon type="md-notifications-outline" size="24" />
                </Badge>
                <DropdownMenu slot="list">
                  <DropdownItem>通知内容</DropdownItem>
                  <DropdownItem>关注内容</DropdownItem>
                  <DropdownItem>系统内容</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="8">
              <Icon type="md-color-palette" size="24"></Icon>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </Header>
    <Layout>
      <Sider class="sider" width="240" collapsible v-model="isCollapsed" :class="{ 'hide': isCollapsed }">
        <Menu theme="dark" :active-name="activeName">
          <MenuItem name="/notebooks" to="/notebooks">
            <Icon type="ios-search"></Icon>
            <span>笔记本列表</span>
          </MenuItem>
          <MenuItem name="/notes" to="/notes">
            <Icon type="ios-apps"></Icon>
            <span>笔记列表</span></MenuItem>
          <MenuItem name="/trash" to="/trash">
            <Icon type="ios-bookmark"></Icon>
            <span>回收站</span></MenuItem>
        </Menu>
      </Sider>
      <!-- 浏览器窗口小于768px的侧栏导航 -->
      <Dropdown class="small-sider" @on-click="toItems">
        <Icon type="md-menu" size="36" />
        <DropdownMenu slot="list">
          <DropdownItem name="/notebooks">笔记本列表</DropdownItem>
          <DropdownItem name="/notes">笔记列表</DropdownItem>
          <DropdownItem name="/trash">回收站</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Content class="content" :class="{'content-expand': isCollapsed}">
        <slot></slot>
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      news: 1,
      isCollapsed: false,
      activeName: this.$route.path
    }
  },
  watch: {},
  created() {
    this.activeName = this.$route.path
  },
  methods: {
    // 屏幕小于768px时的导航栏时间
    toItems(name) {
      this.$router.push({path: name})
      this.activeName = this.$route.path // 高亮同步
    },
    // 后台提供接口有问题， 模拟注销
    logout(name) {
      if (name === 'logout') {
        this.$storage.clear()
        this.$router.push({path: `/${name}`})
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
  bottom: 0;
  right: 0;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  border: 1px solid #dcdee2;
  transition: all 0.2s ease-in-out;
  background: #fff;
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