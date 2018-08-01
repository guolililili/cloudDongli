<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu 
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :before-push="beforePush"
                    :menu-list="menuList">
                    <div slot="top" class="logo-con" @click="homeClick">
                        <img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />
                        <img v-show="shrink" src="../images/company.png" key="min-logo" />
                    </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    
    export default {
        components: {
            shrinkableMenu,
        },
        data () {
            return {
                shrink: false,
                userName: 'haohexin@yeah.net',
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            }
        },
        methods: {
            homeClick(){
                this.$router.push({
                    name: 'home'
                });
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace');
                    this.$router.push({
                        name: 'ownspace'
                    });
                } else if (name === 'loginout') {
                    this.$router.push({
                        name: 'login'
                    });
                    // Cookies.remove('user');
                }
            },
            handleSubmenuChange (val) {
                // if(Cookies.get('user') == "" || Cookies.get('user') == undefined){
                //     this.$router.push({
                //         name: 'login'
                //     });
                // }              
            },
            beforePush (name) {
                return true;
            }
        }
    };
</script>
