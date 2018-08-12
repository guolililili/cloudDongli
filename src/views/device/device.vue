<template>
    <div>
        <Row style="margin: 10px;">
            <Input
                clearable style="width: 220px"
                v-model="keywords"
                search enter-button="Search"
                placeholder="关键词"
                @on-change="handleKeywords"
            />
        </Row>
        <Table :loading="loading" :data="tableData" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float:right;">
                <Page :total="total" :current="current_page" :page-size="per_page" @on-change="changePage" show-total></Page>
            </div>
       </div>    
    </div>
</template>
<script>
    import Cookies from 'js-cookie';
    import server from '../../../config/api';
    export default {
        data () {
            return {
                loading:false,
                keywords: '',
                total: 0,
                current_page: 1,
                per_page: 5,
                tableData: [],
                tableColumns: [
                    {
                        title:'序列号',
                        key:'serial_number'
                    },
                    {
                        title: '客户',
                        key: 'customer_name'
                    },
                    {
                        title: '设备类型',
                        key: 'category',
                        render: (h, params) => {
                             return h('div', [h('strong', params.row.category.title)]);
                        }
                    },{
                        title:'运行',
                        key:'running' 
                    },{
                        title:'报警',
                        key:'running' 
                    },
                    {
                        title:'维修',
                        key:'maintain' 
                    },
                    {
                        title:'添加时间',
                        key:'created_at' 
                    },
                    {
                        title:'修改时间',
                        key:'updated_at' 
                    },
                    {
                        title:'操作',
                        key:'action' ,
                        render:(h,params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showDeviceChart(params.index)
                                        }
                                    }
                                }, '查看曲线')
                            ]);
                        }
                    }
                ]
            }
        },
        created(){
            this.initDeviceList();
        },
        methods: {
            initDeviceList () {
                this.loading = true;
                var _self = this;
                this.$ajax({
                    method:"get",
                    url: server.api.myDevices+'?include=category&page=' + _self.current_page+'&keywords='+_self.keywords,
                    headers:{
                        Authorization:Cookies.get("access-token")
                    },
                    data:{}
                }).then(function(response){
                    _self.tableData = response.data.data;
                    _self.total = response.data.meta.pagination.total;
                    _self.current_page = response.data.meta.pagination.current_page;
                    _self.per_page = response.data.meta.pagination.per_page;
                    _self.loading = false;
                }).catch(function(error){
                    _self.$Message.error({
                        content:error.response.data.message
                    });

                });
            },
            changePage (value) {
                this.current_page = value;
                this.initDeviceList();
            },
            handleKeywords(){
                // this.current_page = 1;
                this.initDeviceList();
            },
            showDeviceChart(index){
                this.$router.push({
                    name:'deviceChart',
                     query: {
                        device_id: this.tableData[index]['id']
                    }
                });
            }
        }
    }
</script>
