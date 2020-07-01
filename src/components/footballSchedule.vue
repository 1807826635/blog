<template>
  <div class="index">
    <div class="head">
      <div class="match_operate" style="height:auto;">
        <div class="float_l">
          <!--<div class="block">-->
          <!--<span class="demonstration">查询</span>-->
          <!--<el-date-picker-->
          <!--v-model="value1"-->
          <!--:change=dateChange()-->
          <!--type="date"-->
          <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
          <!--</div>-->
        </div>
      </div>
      <span class="demonstration">赛事类型</span>
      <el-select v-model="value3" @change="get" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.shortName"
          :value="item.id">
        </el-option>
      </el-select>
      <div class="tab">
        <table class="el-table">
          <thead class="thead">
          <th width="160">赛事</th>
          <th width="160">时间</th>
          <th width="160">主场名称</th>
          <!--<th width="160">比分</th>-->
          <th width="160">客场名称</th>
          <th width="160">半场</th>
          <th width="160">备注</th>
          <th width="160">动画直播</th>
          </thead>
          <template v-for="(item,index) in tableData">
            <tr class="tr" v-bind:key="index">
              <th width="160" :style="{background:item.color}">{{item.competitionName}}</th>
              <th width="160">{{item.updateTime}}</th>
              <th width="160">{{item.zteamName}}</th>
              <!--<th width="160">{{item.score}}</th>-->
              <th width="160">{{item.kteamName}}</th>
              <th width="160">{{item.half}}</th>
              <th width="160">{{item.note}}</th>
              <th width="160">
                {{item.isVideo}}
                <router-link :to="{name: 'liveanime', params: {id: item.id}}">
                  <button>跳转</button>
                </router-link>
              </th>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <div>
      <img class="images" src="../assets/timg.png">
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        value: '',
        phone: '',
        value1: '',
        value2: false,
        value3: '',
        tableData: [],
        options: [],
        updateSelect:{}
      }
    },
    mounted() {
      console.log(this.$moment().toDate())
      this.get()
      this.cate()
    },
    created() {
      this.initWebSocket()
    },
    methods: {
      dateChange() {
      },
      getdate() {
        let now = new Date(),
          y = now.getFullYear(),
          m = now.getMonth() + 1,
          d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
      },
      get() {
        let time = (new Date()).getTime();
        // 一天前
        let Dates = this.$moment(time).subtract(1, 'days').format('YYYY-MM-DD')
        // 当前时间
        let defaultDate = this.$moment(time).format('YYYY-MM-DD')
        var select = (this.value3).toString()
        var d = new Date(this.value1);
        d = this.$moment(d).format('YYYY-MM-DD');
        // 是否选择时间
        if (d === 'Invalid date') {
          d = '';
        }
        var f = this.value2;
        // 是否完场
        if (f) {
          f = 1;
        } else {
          f = 0;
        }
        let params = {
          competitionId: select,
          defaultDate: '2020-06-20',
          complate: f,
        }
        this.axios.get('api/quartz/soccer/findCurrentMatchByParams', {params}).then((res) => {
          res.data.msg.forEach((item) => {
            item.score = `${item.zscoreTotle}- ${item.kscoreTotle}`
            item.zteamName = `${item.zteamName}(${item.zrank})`
            item.kteamName = `${item.kteamName}(${item.krank})`
            // item.victory = item.zscoreTotle- item.kscoreTotle > 0 ? '胜':'败'
            item.updateTime = this.$moment(item.updateTime).format("YYYY-MM-DD kk:mm:ss")
            item.matchTime = this.$moment(item.matchTime).format("YYYY-MM-DD kk:mm:ss")
          })
          this.tableData = res.data.msg
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      cate() {
        // 分类
        this.axios.get('api/quartz/soccer/findAllCompetition', {
          params: {}
        }).then((res) => {
          this.options = res.data.msg
        }).catch(function (error) {
            console.log(error);
          })
      },
      updata(data){
        let isHave =false
        let that = this
        let tableData = that.tableData
        data.score = `${data.zscoreTotle}- ${data.kscoreTotle}`
        data.zteamName = `${data.zteamName}(${data.zrank})`
        data.kteamName = `${data.kteamName}(${data.krank})`
        // item.victory = item.zscoreTotle- item.kscoreTotle > 0 ? '胜':'败'
        data.updateTime = this.$moment(data.updateTime).format("YYYY-MM-DD kk:mm:ss")
        data.matchTime = this.$moment(data.matchTime).format("YYYY-MM-DD kk:mm:ss")
         for(let i in  tableData){
           if(tableData[i].id ===data.id){
             tableData[i] = data
             isHave =true
           }
         }
        if(!isHave){
         tableData.push(data)
        }
        that.tableData=tableData
      },
      initWebSocket(params) {
        let that = this
        that.ws = new WebSocket("ws://47.56.185.111:8080/quartz/websocket");
        // var ws = new WebSocket("ws://localhost:8096/websocket/111405");
        that.ws.onopen = (e) => {
          console.log('WebSocket已经打开: ')
          // let actions = {color: "#FFA000",
          //   competitionName: "西甲",
          //   competitonId: 19,
          //   half: null,
          //   id: 78,
          //   isVideo: null,
          //   krank: "B6",
          //   kredcard: null,
          //   kscore: null,
          //   kscoreTotle: null,
          //   kscorepoint: null,
          //   kteamId: 1649,
          //   kteamName: "萨拉戈萨",
          //   kyellowcard: null,
          //   matchTime: 1593199800000,
          //   n: 1,
          //   note: null,
          //   status: 9,
          //   tstartTime: null,
          //   updateTime: 1593185400455,
          //   weather: null,
          //   zrank: "B3",
          //   zredcard: null,
          //   zscore: null,
          //   zscoreTotle: null,
          //   zscorepoint: null,
          //   zteamId: 56,
          //   zteamName: "皇家马德里",
          //   zyellowcard: null};     //请根据实际项目需要进行修改
          // that.ws.send(JSON.stringify(actions));
          console.log(e)
        }
        that.ws.onmessage = function (e) {
          console.log('WebSocket收到消息: ' + e.data.msg)
          that.updata(JSON.parse(e.data.msg))
          console.log(e.data)
        }
        that.ws.onclose = function (e) {
          console.log('WebSocket关闭: ')
          console.log(e)
        }
        that.ws.onerror = function (e) {
          console.log('WebSocket发生错误: ')
          this.initWebSocket()
        }
      }
    },
  }


</script>
<style scoped>
  .head {
    background: rgb(0, 0, 0, 0.1);
    border-radius: 10px;
    z-index: 2;
    position: absolute;
    width: 97%;
    height: 900px;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 100px;
    padding-top: 100px;
  }

  .switchs {
    display: flex;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    width: 222px;
    height: 51px;
    margin: 0 auto;
    margin-top: 48px;
    align-items: center;
  }

  .images {
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    left: 0;
    /*opacity: 0.4;*/
    /*filter:alpha(opacity=40);*/
  }

  .top {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }

  .ball {
    width: 20px;
    height: 20px;
  }

  .float_l {
    width: 90%;
    margin: 0 auto;
    padding-top: 12px;
    margin-top: 34px;
  }

  .tab {
    padding-bottom: 10px;
    width: 90%;
    text-align: center;
    margin: 0 auto;
    margin-top: 40px;
    border-top: none;
  }

  .has-gutter {
    border-bottom: 1px solid #e7e7e7;
  }

  tr {
    border-bottom: 1px solid #e7e7e7;
  }

  tr:nth-child(n):hover {
    background: #efefef;
  }

  thead {
    border-bottom: 1px solid #e7e7e7;
  }

  .top span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
  }

  .demonstration {
    color: #ffffff;
    font-weight: 600;
  }

  td {
    text-align: center;
  }

  .tr {
    border-bottom: solid 2px #efefef;
  }
</style>
<style>
  .index {
  }

  .index .el-table th, .el-table tr {
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
  }

  .tr:first-child {
    border-left: none;
  }

  th {
    border-left: solid 1px #efefef;
    border-bottom: solid 1px #efefef;
  }

  .index .has-gutter:first-child {
    border-bottom: solid 4px #e7e7e7;
    text-align: center;
  }

  .index .el-table_1_column_1 {
    text-align: center;
  }

  .index .cell {
    text-align: center;
  }
</style>
