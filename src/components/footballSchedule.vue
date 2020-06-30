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
      <!--<div class="switchs">-->
        <!--&lt;!&ndash;<el-switch&ndash;&gt;-->
          <!--&lt;!&ndash;v-model="value2"&ndash;&gt;-->
          <!--&lt;!&ndash;inactive-color="#efefef"&ndash;&gt;-->
          <!--&lt;!&ndash;active-text="开启完场场"&ndash;&gt;-->
          <!--&lt;!&ndash;inactive-text="开启半场">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-switch>&ndash;&gt;-->
    <!--</div>-->
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
          <template v-for="(item,index) in tableData" >
            <tr class="tr" v-bind:key="index">
              <th width="160" :style="{background:item.color}">{{item.competitionName}}</th>
              <th width="160">{{item.updateTime}}</th>
              <th width="160">{{item.zteamName}}</th>
              <!--<th width="160">{{item.score}}</th>-->
              <th width="160">{{item.kteamName}}</th>
              <th width="160">{{item.half}}</th>
              <th width="160">{{item.note}}</th>
              <th width="160">{{item.isVideo}}</th>
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
        value:'',
        phone: '',
        value1: '',
        value2:false,
        tableData:[]
      }
    },
    mounted(){
      console.log(this.$moment().toDate())
      this.get()
    },
    methods: {
      dateChange(){
        console.log('sfa')
      },
      getdate() {
        let now = new Date(),
          y = now.getFullYear(),
          m = now.getMonth() + 1,
          d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
      },
      get() {
        let params={}
        let time =(new Date()).getTime();
        params.defaultDate=this.$moment(time).subtract(1,'days')
        this.axios.get('api/quartz/soccer/findCurrentMatchByParams', {
          params:params
          // params: {
          //   //"competitionId": "166",//赛事ID，多个以逗号分隔  可空
          //   // "complate": 1, //为1时，查完场  可空
          //   "defaultDate": "2020-06-26", //查该日期以后的比赛 可空}
          //   //"queryDate":"2020-06-27"  //查该日期的比赛 可空
          // }
        }).then((res)=> {
          res.data.msg.forEach((item)=>{
            item.score = `${item.zscoreTotle}- ${item.kscoreTotle}`
            item.zteamName = `${item.zteamName}(${item.zrank})`
            item.kteamName = `${item.kteamName}(${item.krank})`
            // item.victory = item.zscoreTotle- item.kscoreTotle > 0 ? '胜':'败'
            item.updateTime = this.$moment(item.updateTime).format("YYYY-MM-DD kk:mm:ss")
            item.matchTime=this.$moment(item.matchTime).format("YYYY-MM-DD kk:mm:ss")

          })
          this.tableData=res.data.msg
        })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }



</script>
<style scoped>
  .head{
    background: rgb(0,0,0,0.1);
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
  .switchs{
    display: flex;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    width: 222px;
    height: 51px;
    margin: 0 auto;
    margin-top: 48px;
    align-items: center;
  }
  .images{
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    left: 0;
    /*opacity: 0.4;*/
    /*filter:alpha(opacity=40);*/
  }

  .top{
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
  .has-gutter{
    border-bottom: 1px solid #e7e7e7;
  }
  tr{
    border-bottom: 1px solid #e7e7e7;
  }
  tr:nth-child(n):hover{
    background: #efefef;
  }
  thead{
    border-bottom: 1px solid #e7e7e7;
  }
  .top span{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
  }
  .demonstration{
    color: #ffffff;
    font-weight: 600;
  }
  td{
    text-align: center;
  }
  .tr{
    border-bottom: solid 2px #efefef;
  }
</style>
<style>
  .index{}
  .index  .el-table th, .el-table tr {
    background-color: rgba(0,0,0,0);
    text-align: center;
  }
  .tr:first-child{
    border-left: none;
  }
  th{
    border-left: solid 1px #efefef;
    border-bottom: solid 1px #efefef;
  }
  .index  .has-gutter:first-child{
    border-bottom: solid  4px #e7e7e7;
    text-align: center;
  }
  .index  .el-table_1_column_1  {
    text-align: center;
  }
  .index .cell{
    text-align: center;
  }
</style>
