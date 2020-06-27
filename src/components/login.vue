<template>
  <div class="index">
    <div class="head">
    <header>
      <div>
        <a>
          <img src="../assets/logo1.png"/>
        </a>
      </div>
    </header>
    <div class="match_operate" style="height:auto;">
      <div class="float_l">
        <div class="block">
          <span class="demonstration">查询</span>
          <el-date-picker
            v-model="value1"
            :change=dateChange()
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
    </div>
      <div class="switchs">
        <el-switch
          v-model="value2"
          inactive-color="#efefef"
          active-text="赛事赛程"
          inactive-text="试试赛程">
        </el-switch>
      </div>
    <div class="tab">
      <el-table
        :data="tableData"
        style="width: 100%;border-radius: 5px; border-bottom: solid 1px #efefef;">
        <el-table-column
          prop="competitionName"
          label="赛事"
          width="180">
        </el-table-column>
        <el-table-column
          prop="matchTime"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="zteamName"
          label="主场名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="kteamName"
          label="客场名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="score"
          label="比分">
        </el-table-column>
        <el-table-column
          prop="zrank"
          label="主队排名">
        </el-table-column>
        <el-table-column
          prop="krank"
          label="客队排名">
        </el-table-column>
        <el-table-column
          prop="victory"
          label="胜负">
        </el-table-column>
      </el-table>
      <!--<div class="top">-->
        <!--<span ><em><img src="../assets/wenz.png" title="文字直播" alt="文字直播"></em><i>文字直播</i></span>-->
        <!--<span><em><img src="../assets/black.png" class="ball" title="进球" alt="进球"></em><i>进球</i></span>-->
        <!--<span><em><img src="../assets/red.png" class="ball" title="点球" alt="点球"></em><i>点球</i></span>-->
        <!--<span><em><img src="../assets/blue.png" class="ball" title="乌龙球" alt="乌龙球"></em><i>乌龙球</i></span>-->
        <!--<span><em><img src="../assets/redcard.png" title="红牌" alt="红牌"></em><i>红牌</i></span>-->
      <!--</div>-->
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        value2:false,
        tableData: [{
          competitionName: '中超',
          matchTime: '2016-05-02',
          zteamName: '主场名称',
          kteamName: '客场名称',
          score:'比分',
          zrank: '主队排名',
          krank: '客队排名',
          visitingfield: '胜负',
        }]
      }
    },
    mounted(){
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
        this.axios.get('api/quartz/soccer/findMatchByParams', {
          params: {
          //"competitionId": "166",//赛事ID，多个以逗号分隔  可空
           // "complate": 1, //为1时，查完场  可空
            "defaultDate": "2020-06-26", //查该日期以后的比赛 可空}
             //"queryDate":"2020-06-27"  //查该日期的比赛 可空
          }
        }).then((res)=> {
            res.data.msg.forEach((item)=>{
            item.score = `${item.zscoreTotle}- ${item.kscoreTotle}`
            item.victory = item.zscoreTotle- item.kscoreTotle > 0 ? '胜':'败'
             item.matchTime = this.getdate(item.matchTime)
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
</style>
<style>
  .index{}
  .index  .el-table th, .el-table tr {
    background-color: rgba(0,0,0,0);
    text-align: center;
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