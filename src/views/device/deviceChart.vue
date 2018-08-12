<template>
	<div>
		 <Row style="float:right;margin:10px 30px;">
            <DatePicker
                    v-model="range_date"
                    type="daterange"
                    :start-date="new Date()"
                    placement="bottom-end"
                    placeholder="选择日期"
                    style="width: 200px"
                    confirm
                    @on-ok="handleOk"
                    format="yyyy-MM-dd"
            >
            </DatePicker>
        </Row>
		<div style="width:100%;height:400px;" id="deviceChart">
		</div>
	</div>
</template>
<script type="text/javascript">
	import echarts from 'echarts';
    import server from '../../../config/api';
	export default {
		data () {
			return {
				loading:false,
				option:{},
				range_date: [this.getDate(), this.getDate()],
				start_date: this.getDate(),
                end_date: this.getDate(),
			};
		},
		mounted(){
			this.setOption();
		},
		methods:{
			handleOk() {
				if(this.range_date[0] == "" || this.range_date[1] == ""){
					this.$Message.warning({
                        content: "请选择开始日期和结束日期！",
                    });
                    return;
				}

                this.start_date = this.range_date[0].toISOString().slice(0, 10);
                this.end_date = this.range_date[1].toISOString().slice(0, 10);
                return this.setOption();
            },
            search() {
                this.setOption();
            },
            getDate() {
                var date = new Date();
                var month = date.getMonth() + 1;
                return date.getFullYear() + '-' + month + '-' + date.getDate();
            },
			setOption(){
				this.loading = true;
				var _self =this;
				this.$ajax({
					method:'get',
					url:server.api.deviceChart+'?device_id='+ this.$route.query.device_id+ '&start_date=' + _self.start_date + '&end_date=' + _self.end_date,
					data:{}
				}).then(function(response){
					var data = response.data;
					var color = data.color;
                    var yais = data.yAxis;
                    var yais_array = _self.getYais(yais, color);

                    _self.option = {
                        color: color,
                        left: 'center',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        grid: {
                            right: data.right_per
                        },
                        toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        dataZoom: [
                            {
                                type: 'slider',
                                start: 10,
                                end: 60
                            },
                            {
                                type: 'inside',
                                start: 10,
                                end: 60
                            }
                        ],
                        legend: {
                            data: data.legend
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true
                                },
                                data: data.xAxis
                            }
                        ],
                        yAxis: yais_array,
                        series: data.series
                    };
                    _self.initChart(_self.option);
				}).catch(function(error){
					_self.$Message.error({
                        content: error.response.data.message,
                    });
				});

			},
			getYais(yais, color) {
                var yais_array = [];
                for (var i = 0; i < yais.length; i++) {
                    var item = {};
                    item.type = 'value';
                    item.position = (i == 0 ? 'left' : 'right');
                    item.offset = (i == 0 ? 0 : i * 60);
                    item.name = yais[i].title;
                    item.min = parseInt(yais[i].min);
                    item.max = parseInt(yais[i].max);
                    item.axisLine = {
                        lineStyle: {
                            color: color[i]
                        }
                    };
                    item.axisLabel = {
                        formatter: '{value} ' + yais[i].unit
                    };
                    yais_array.push(item);
                }
                return yais_array;
            },
			initChart(option){
				const charts = echarts.init(document.getElementById("deviceChart"));
				charts.setOption(option)
				window.addEventListener('resize',function(){
					charts.resize();
				});
				this.loading = false;
			}
		}
	};
</script>