<template>
    <div>
        <Table :loading="loading" :data="tableData" :columns="tableColumns"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current_page" :page-size="per_page" @on-change="changePage" show-total></Page>
            </div>
       </div>    
    </div>
</template>
<script>
    export default {
        data () {
            return {
                loading:false,
                total: 0,
                current_page: 1,
                per_page: 5,
                tableData: [],
                tableColumns: [
                    {
                        title: '客户',
                        key: 'customer_name'
                    },
                    {
                        title: '设备类型',
                        key: 'category',
                        render: (h, params) => {
                            //  return h('div', [
                            //     h('strong', params.row.category.title)
                            // ]);
                        }
                    },{
                        title:'序列号',
                        key:'serial_number'
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
                        key:'action' 
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
                    url:'http://donglicloud.wxcareful.com/api/devices?include=category&page=' + _self.current_page,
                    headers:{
                        Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9kb25nbGljbG91ZC53eGNhcmVmdWwuY29tIiwiaWF0IjoxNTMyOTM0NTE3LCJleHAiOjE1NjQ0NzA1MTcsIm5iZiI6MTUzMjkzNDUxNywianRpIjoibXN4VHRMZ3MyNkNzYkZiZSIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.NmcYEFiI8OMuvaDjFhAf5AOnc0SXsjLyKWV1P8mCsJQ'
                    },
                    data:{}
                }).then(function(response){
                    _self.tableData = response.data.data;
                    _self.total = response.data.meta.pagination.total;
                    _self.current_page = response.data.meta.current_page;
                    _self.per_page = response.data.meta.per_page;
                    _self.loading = false;
                }).catch(function(error){
                    _this.$Message.error({
                        content:error.response.data.message
                    });

                });
            },
            changePage (value) {
                this.current_page = value;
                this.initDeviceList();
            }
        }
    }
</script>
