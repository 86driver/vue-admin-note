<template>
  <div class="login">
    <div class="logo">
      <img src="../../static/images/logo2.png" alt="">
    </div>
    <Tabs>
      <TabPane label="登录">
        <i-form ref="loginForm" :rules="rules" :model="loginInfo">
          <FormItem prop="username">
            <i-input v-model.trim="loginInfo.username" prefix="ios-person-outline" type="text" placeholder="请输入您的账号"></i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input v-model.trim="loginInfo.password" prefix="ios-lock-outline" type="password" placeholder="请输入您的密码"></i-input>
          </FormItem>
          <FormItem>
            <Button :disabled="buttonState" :loading="buttonLoading" long type="primary" @click="handleLogin('loginForm')">登 录</Button>
          </FormItem>
        </i-form>
      </TabPane>
      <TabPane label="注册">
        <i-form ref="registerForm" :model="registerForm" :rules="rules">
          <FormItem prop="username">
            <i-input v-model.trim="registerForm.username" prefix="ios-person-outline" type="text" placeholder="请输入您的账号"></i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input v-model.trim="registerForm.password" prefix="ios-lock-outline" type="password" placeholder="请输入您的密码"></i-input>
          </FormItem>
          <FormItem>
            <Button :disabled="buttonState" :loading="buttonLoading" long type="primary" @click="handleRegister('registerForm')">注 册</Button>
          </FormItem>
        </i-form>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Auth from '../apis/Auth.js'
export default {
  data() {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: ''
      },
      buttonState: true, // 按钮是否禁用状态
      buttonLoading: false, // 按钮是否加载状态
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          {
            pattern: /^[\w\u4e00-\u9fa5]{3,15}$/,
            message: '用户名3~15个字符，仅限数字字母下划线及中文',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, max: 16, message: '密码长度为6-16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 进入登录页面  localStorage清空
    this.$storage.clear()
  },
  watch: {
    loginInfo: {
      // 监听账户和密码框值来判断buttonState的状态
      handler(newValue) {
        if (this.usernameReg(newValue.username) && this.passwordReg(newValue.password)) {
          this.buttonState = false
        } else {
          this.buttonState = true
        }
      },
      deep: true
    },
    registerForm: {
      // 监听账户和密码框值来判断buttonState的状态
      handler(newValue) {
        if (this.usernameReg(newValue.username) && this.passwordReg(newValue.password)) {
          this.buttonState = false
        } else {
          this.buttonState = true
        }
      },
      deep: true
    }
  },
  methods: {
    // 用户名验证
    usernameReg(value) {
      let pattern = /^[\w\u4e00-\u9fa5]{3,15}$/
      if (pattern.test(value)) {
        return true
      } else {
        return false
      }
    },
    // 密码验证
    passwordReg(value) {
      let pattern = /^[0-9a-zA-Z]{6,16}$/
      if (pattern.test(value)) {
        return true
      } else {
        return false
      }
    },
    handleLogin(name) {
      this.buttonLoading = true
      this.$refs[name].validate(valid => {
        if (valid) {
          Auth.login(this.loginInfo)
            .then(res => {
              this.$storage.set('user', this.loginInfo)
              this.buttonLoading = false
              this.$refs[name].resetFields()
              this.$router.push('/notebooks')
              this.$Message.success({
                content: `${res.data.username},欢迎您使用印象笔记`,
                duration: 3
              })
            })
            .catch(err => {
              this.buttonLoading = false
              this.$refs[name].resetFields()
              this.$Message.error(err.msg)
            })
        }
      })
    },
    handleRegister(name) {
      this.buttonLoading = true
      this.$refs[name].validate(valid => {
        if (valid) {
          Auth.register(this.registerForm)
            .then(res => {
              this.$storage.set('user', this.registerForm)
              this.buttonLoading = false
              this.$refs[name].resetFields()
              this.$router.push('/notebooks')
              this.$Message.success({
                content: `${res.data.username},欢迎您使用印象笔记`,
                duration: 3
              })
            })
            .catch(err => {
              this.buttonLoading = false
              this.$refs[name].resetFields()
              this.$Message.error(err.msg)
            })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid #dcdee2;
  padding: 60px 52px;
  border-radius: 5px;
  width: 60vh;
  height: 70vh;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  background: #fff;
  transform: translate(-50%, -50%);
  .logo {
    text-align: center;
    img {
      width: 60%;
    }
  }
}
</style>