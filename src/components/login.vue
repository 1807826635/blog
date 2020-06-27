<template>
  <div>
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
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-select v-model="value" placeholder="赛事筛选">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        style="width: 100%;border-radius: 5px; border-bottom: solid 1px #efefef;">
        <el-table-column
          prop="id"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="competition"
          label="赛事"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="homeranking"
          label="主排名">
        </el-table-column>
        <el-table-column
          prop="homecourt"
          label="主场">
        </el-table-column>
        <el-table-column
          prop="score"
          label="比分">
        </el-table-column>
        <el-table-column
          prop="visitingfield"
          label="客场">
        </el-table-column>
        <el-table-column
          prop="homeranking"
          label="客排名">
        </el-table-column>
        <el-table-column
          prop="victory"
          label="胜负">
        </el-table-column>
        <el-table-column
          prop="live"
          label="直播">
        </el-table-column>
      </el-table>
      <div class="top">
        <span ><em><img src="../assets/wenz.png" title="文字直播" alt="文字直播"></em><i>文字直播</i></span>
        <span><em><img src="../assets/black.png" class="ball" title="进球" alt="进球"></em><i>进球</i></span>
        <span><em><img src="../assets/red.png" class="ball" title="点球" alt="点球"></em><i>点球</i></span>
        <span><em><img src="../assets/blue.png" class="ball" title="乌龙球" alt="乌龙球"></em><i>乌龙球</i></span>
        <span><em><img src="../assets/redcard.png" title="红牌" alt="红牌"></em><i>红牌</i></span>
      </div>
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
        tableData: [{
          id: '1',
          competition: '中超',
          date: '2016-05-02',
          status: '完',
          homeranking: '1',
          homecourt: '南昌队',
          score: '5-6',
          visitingfield: '赣州',
          homeranking: '8',
          victory: '完',
          直播: '直播中',
        }, {
          id: '2',
          competition: '中超',
          date: '2016-05-02',
          status: '完',
          homeranking: '1',
          homecourt: '南昌队',
          score: '5-6',
          visitingfield: '赣州',
          homeranking: '8',
          victory: '完',
          直播: '直播中',
        }, {
          id: '2',
          competition: '中超',
          date: '2016-05-02',
          status: '完',
          homeranking: '1',
          homecourt: '南昌队',
          score: '5-6',
          visitingfield: '赣州',
          homeranking: '8',
          victory: '完',
          直播: '直播中',
        }, {
          id: '2',
          competition: '中超',
          date: '2016-05-02',
          status: '完',
          homeranking: '1',
          homecourt: '南昌队',
          score: '5-6',
          visitingfield: '赣州',
          homeranking: '8',
          victory: '完',
          直播: '直播中',
        }
          , {
            id: '2',
            competition: '中超',
            date: '2016-05-02',
            status: '完',
            homeranking: '1',
            homecourt: '南昌队',
            score: '5-6',
            visitingfield: '赣州',
            homeranking: '8',
            victory: '完',
            直播: '直播中',
          }
          , {
            id: '2',
            competition: '中超',
            date: '2016-05-02',
            status: '完',
            homeranking: '1',
            homecourt: '南昌队',
            score: '5-6',
            visitingfield: '赣州',
            homeranking: '8',
            victory: '完',
            直播: '直播中',
          }
          , {
            id: '2',
            competition: '中超',
            date: '2016-05-02',
            status: '完',
            homeranking: '1',
            homecourt: '南昌队',
            score: '5-6',
            visitingfield: '赣州',
            homeranking: '8',
            victory: '完',
            直播: '直播中',
          }
          , {
            id: '2',
            competition: '中超',
            date: '2016-05-02',
            status: '完',
            homeranking: '1',
            homecourt: '南昌队',
            score: '5-6',
            visitingfield: '赣州',
            homeranking: '8',
            victory: '完',
            直播: '直播中',
          }
          , {
            id: '2',
            competition: '中超',
            date: '2016-05-02',
            status: '完',
            homeranking: '1',
            homecourt: '南昌队',
            score: '5-6',
            visitingfield: '赣州',
            homeranking: '8',
            victory: '完',
            直播: '直播中',
          }
          , {
            id: '2',
            competition: '中超',
            date: '2016-05-02',
            status: '完',
            homeranking: '1',
            homecourt: '南昌队',
            score: '5-6',
            visitingfield: '赣州',
            homeranking: '8',
            victory: '完',
            直播: '直播中',
          }
          , {
            id: '2',
            competition: '中超',
            date: '2016-05-02',
            status: '完',
            homeranking: '1',
            homecourt: '南昌队',
            score: '5-6',
            visitingfield: '赣州',
            homeranking: '8',
            victory: '完',
            直播: '直播中',
          }, {
            id: '2',
            competition: '中超',
            date: '2016-05-02',
            status: '完',
            homeranking: '1',
            homecourt: '南昌队',
            score: '5-6',
            visitingfield: '赣州',
            homeranking: '8',
            victory: '完',
            直播: '直播中',
          }
          ]
      }
    },
    mounted(){
      this.get()
    },
    methods: {
      get() {
        this.axios.get('api/quartz/soccer/findMatchByParams', {
          params: {
          //"competitionId": "166",//赛事ID，多个以逗号分隔  可空
          // "complate": 1, //为1时，查完场  可空
            "defaultDate": "2020-06-26", //查该日期以后的比赛 可空}
             //"queryDate":"2020-06-27"  //查该日期的比赛 可空
          }
        })
          .then(function (response) {
            console.log(response);
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
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 900px;
    top: 0;
    padding-top: 100px;
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
</style>
<style>
  .el-table th, .el-table tr {
    background-color: rgba(0,0,0,0);
  }
  .has-gutter:first-child{
    border-bottom: solid  4px #e7e7e7;
  }
</style>