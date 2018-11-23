<template>
  <div id="page">
    <div class="form-box">
      <div class="form-item">
        <div class="form-label">账号：</div>
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="fi-input" v-model.trim="username" placeholder="邮箱/手机号">
          </div> 
        </div>
      </div>
      <div class="form-item">
        <div class="form-label">密码：</div>
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="fi-input" v-model.trim="password" placeholder="6-8位大小写字母加数字">
          </div> 
        </div>
      </div>
      <div class="form-login-btn" @click="login">登录</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    created() {

    },
    methods: {
      login() {
        let emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        let phoneReg = /^1[3-9]\d{9}$/
        let passwordReg = /^[a-zA-Z0-9]{6,8}$/
        if (!this.username) {
          Toast('账号不能为空')
        } else if (!this.password) {
          Toast('密码不能为空')
        } 
        else if (!emailReg.test(this.username) && !phoneReg.test(this.username)) {
          Toast('请填入正确格式的账号(邮箱或手机号)')
        } 
        else if (!passwordReg.test(this.password)) {
          Toast('请输入正确格式的密码')
        } else {
          const formData = {
            username: this.username,
            password: this.password
          }
          this.axios.post('/api/signin', formData).then((res) => {
            if (res.data && res.data.ret === 0) {
              this.loginStoreToken(res.data.data.token)
              Toast('登录成功')
              //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
              let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/');
              //跳转到指定的路由
              this.$router.push({
                  path: redirectUrl
              });
            } else {
              Toast(res.data.msg)
            }
          })
        }
      },
      ...mapMutations({
				loginStoreToken: 'LOGIN'
		  })
    }
  }
</script>

<style lang="less" scoped>
    #page {
    width: 100%;
    min-height: 100%;
    padding-top: .9rem;
    background-color: rgb(55, 59, 69);
  }
  .form-box {
    width: 100%;
    margin: .72rem 0 0 0;
    .form-item {
      .block-flex(space-between, center);
      height: .8rem;
      width: 100%;
      margin-bottom: .2rem;
    }
    .form-login-btn {
      width: 5.2rem;
      height: 0.88rem;
      margin: 0.7rem auto 1rem auto;
      background-image: linear-gradient(140deg, #57B1FF 3%, #4554FF 100%);
      border-radius: 0.08rem;
      font-family: 'PingFang-SC-Regular','Microsoft Yahei', 'Helvetica Neue';
      font-size: 0.32rem;
      color: #FFFFFF;
      text-align: center;
      line-height: 0.88rem;
    }
    .form-label {
      width: 2.59rem;
      height: .8rem;
      line-height: .8rem;
      font-size: .32rem;
      color: #fff;
      text-align: right;
      padding-right: .27rem;
    }
    .form-group {
      -webkit-flex: 1;
      flex: 1;
    }
    .input-group {
      width: 3.36rem;
      position: relative;
      left: 0;
      top: 0;
    }
    .fi-input {
      color: #fff;
      width: 3.7rem;
      height: .6rem;
      background: transparent;
      border-bottom: 1px solid #7f7f7f;
      text-align: center;
      line-height: .6rem;
      font-size: .32rem;
      padding-bottom: .05rem;
    }
  }
  .block-flex (@horizontalAlign: space-between, @verticalAlign: center) {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: @horizontalAlign;
    justify-content: @horizontalAlign;
    -webkit-align-items: @verticalAlign;
    align-items: @verticalAlign;
  }
</style>