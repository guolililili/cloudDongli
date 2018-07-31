<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            form: {
                userName: 'haohexin@yeah.net',
                password: 'password'
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                var _self = this;
                if (valid) {
                    this.$ajax({
                        method:'post',
                        url:'http://donglicloud.wxcareful.com/api/authorizations',
                        data:{
                            username: this.form.userName,
                            password: this.form.password
                        }
                    }).then(function(res){
                         _self.$router.push({
                            name: 'home'
                        });
                         _self.$Message.success({
                            content: '登陆成功'
                        });
                        Cookies.set('user', _self.form.userName);
                        Cookies.set('password', _self.form.password);
                    }).catch(function(err){
                        _self.$Message.error({
                            content: err.response.data.message
                        });
                    });
                }else{
                    _self.$Message.error({
                        content: "请输入有效信息！"
                    });
                }
            });
        }
    }
};
</script>

<style>

</style>
