<template>
  <div class="index">
    <div class="head">
      <div class="match_operate" style="height:auto;">
        <div class="float_l">
          <div class="block">
          <!--<span class="demonstration">查询</span>-->
          <!--<el-date-picker-->
          <!--v-model="value1"-->
          <!--:change=dateChange()-->
          <!--type="date"-->
          <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
          <span class="demonstration">赛事类型</span>
          <el-select v-model="value3" @change="get" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.shortName"
              :value="item.id">
            </el-option>
          </el-select>
          <span class="demonstration" style="margin-left: 2%;" >总音效</span>
           <el-switch
             @change="soundEffect"
            v-model="value5"
            inactive-color="#efefef"
            active-text="开"
            inactive-text="关">
           </el-switch>
          <!-- </template> -->
          <!-- <div style="display: flex;margin-left: 2%;"> -->
           <span class="demonstration" style="margin-left: 2%;">消息提示</span>
            <el-switch
              @change="messageTips"
             v-model="value6"
             inactive-color="#efefef"
             active-text="开"
             inactive-text="关">
            </el-switch>
          </div>
        </div>
      </div>

      <div class="tab">
        <table class="el-table">
          <thead class="thead">
          <th width="160">置顶</th>
          <th width="160">赛事</th>
          <th width="160">时间</th>
          <th width="160">主场名称</th>
          <th width="160">比分</th>
          <th width="160">客场名称</th>
          <th width="160">半场</th>
          <th width="160">备注</th>
          <th width="160">动画直播</th>
          <th width="160">提示音</th>
          </thead>
          <template v-for="(item,index) in tableData">
            <tr class="tr" v-bind:key="index">
              <th width="160">
                <el-checkbox name="type" v-model="item.topping"  @change="top(item,index)"></el-checkbox>
              </th>
              <th width="160" :style="{background:item.color}">{{item.competitionName}}</th>
              <th width="160">{{item.matchTime}}</th>
              <th width="160">{{item.zteamName}}<span style="color: #ffcc00;">{{item.zrank}}</span></th>
              <th width="160" style="color: #0000FF;">{{item.score}}</th>
              <th width="160">{{item.kteamName}}<span style="color: #ffcc00;">{{item.krank}}</span></th>
              <th width="160" style="color: #ED225D;">{{item.half}}</th>
              <th width="160">{{item.note}}</th>
              <!-- <th width="160">{{item.isVideo}}</th> -->
              <th width="160">
                <template>
                  <!-- {{item.isVideo}} -->
                  <el-button type="text" v-if="item.isVideo == '1'"  @click="open(item.id)">
                    <img src="../assets/wenz.png"/>
                  </el-button>
                </template>
              </th>
              <th width="160">
                <el-switch
                   v-model="item.listene"
                   active-text=""
                   inactive-text="">
                 </el-switch>
                    <audio id="audio" preload="auto">
                      <source src="../assets/12898.mp3" />
                    </audio>
              </th>
            </tr>
            <tr v-bind:key="index+'n'" style="height: 10px;"></tr>
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
        value4: 'true',
        value5: true,
        value6: true,
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
    destroyed() {
      console.log('销毁')
     this.ws.close() //离开路由之后断开websocket连接
    },
    watch: {
      tableData: {
        immediate: true,
        handler (newV, oldV) {
          return newV
        },
        deep: true
      }
    },
    methods: {
      top(item,index){
        let d = this.deepClone(this.tableData)
        console.log(d[index],typeof d)
        let settingArr = Object.keys(d).map(key => {
          return d[key];  //把每个对象返回出去生成一个新的数组中相当于0:{id:1}
        });
        settingArr[index].topping = !settingArr[index].topping
        settingArr.splice(index,1);
        settingArr.unshift(item);
        this.tableData =this.deepClone(settingArr)
        this.$forceUpdate();
      },
      reverseArr() {
        // 置低
        this.tableData.reverse()
      },
      dateChange() {
      },
      deepClone  (src) {
        return JSON.parse(
          JSON.stringify(src)
        )
      },
      aplayAudio () {
        console.log('ss')
        const audio = document.getElementById('audio')
        // 从头播放
        audio.currentTime = 0;
        audio.play()
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
          // defaultDate: '2020-06-20',
          defaultDate:Dates,
          complate: f,
        }
        this.axios.get('api/quartz/soccer/findCurrentMatchByParams', {params}).then((res) => {
          res.data.msg.forEach((item) => {
            item.score = `${item.zscoreTotle}-${item.kscoreTotle}`
            if(item.score=='null-null'){
              item.score='-';
            }
            item.listene= true
            if(item.zrank==null){
              item.zrank='';
            }else{
              item.zrank = `(${item.zrank})`
            }
            if(item.krank==null){
              item.krank='';
            }else{
              item.krank = `(${item.krank})`
            }
            item.topping= false
            // item.victory = item.zscoreTotle- item.kscoreTotle > 0 ? '胜':'败'
            item.updateTime = this.$moment(item.updateTime).format("YYYY-MM-DD kk:mm:ss")
            item.matchTime = this.$moment(item.matchTime).format("YYYY-MM-DD kk:mm:ss")
          })
          this.tableData =this.deepClone(res.data.msg)
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
          });
      },
            open(id) {
              this.$alert("<iframe id='iframeId' src='http://wlive-mc.sportsdt.com/wlive/hezejingyue/index.shtml?id="+id+"' frameborder='0' class='pc iframe'  scrolling='auto'></iframe>", '足球直播', {
                dangerouslyUseHTMLString: true
              });
            // }
    // }
    //       })
      },
      updata(upbase){
        let isHave =false
        let that = this
        let tableDatas = this.deepClone(that.tableData)
        upbase.score = `${upbase.zscoreTotle}-${upbase.kscoreTotle}`
        if(upbase.score='null-null'){
          upbase.score='-';
        }
        if(upbase.zrank==null){
          upbase.zrank='';
        }else{
          upbase.zrank = `(${upbase.zrank})`
        }
        if(upbase.krank==null){
          upbase.krank='';
        }else{
          upbase.krank = `(${upbase.krank})`
        }

        // item.victory = item.zscoreTotle- item.kscoreTotle > 0 ? '胜':'败'
        upbase.updateTime = this.$moment(upbase.updateTime).format("YYYY-MM-DD kk:mm:ss")
        upbase.matchTime = this.$moment(upbase.matchTime).format("YYYY-MM-DD kk:mm:ss")
         for(let i in  tableDatas){
           if(tableDatas[i].id ===upbase.id){
             let listene = tableDatas[i].listene
             console.log(listene)
             tableDatas[i] = upbase
             isHave =true
             	tableDatas[i].zredcard=tableDatas[i].zRedcard
             	tableDatas[i].kredcard=tableDatas[i].kRedcard
             	tableDatas[i].zyellowcard=tableDatas[i].zYellowcard
             	tableDatas[i].zscore=tableDatas[i].zScore
             	tableDatas[i].kscoreTotle=tableDatas[i].kScoreTotle
             	tableDatas[i].zrank=tableDatas[i].zRank
             	tableDatas[i].zscoreTotle=tableDatas[i].zScoreTotle
             	tableDatas[i].zteamName=tableDatas[i].zTeamName
             	tableDatas[i].kyellowcard=tableDatas[i].kYellowcard
             	tableDatas[i].kteamId=tableDatas[i].kTeamId
             	tableDatas[i].kteamName=tableDatas[i].kTeamName
             	tableDatas[i].kscore=tableDatas[i].kScore
             	tableDatas[i].kscorepoint=tableDatas[i].kScorepoint
             	tableDatas[i].tstartTime=tableDatas[i].tStartTime
             	tableDatas[i].zscorepoint=tableDatas[i].zScorepoint
             	tableDatas[i].krank=tableDatas[i].kRank
             	tableDatas[i].zteamId=tableDatas[i].zTeamId
             if(listene){
               that.aplayAudio()
             }
             if(this.value6){
               this.$message({
                 dangerouslyUseHTMLString: true,
                 message: "<strong><i style='padding: 10px;color:#ED225D'>"+tableDatas[i].competitionName+"</i><i style='padding: 10px'>|</i><i style='padding: 10px;color:#0000FF'>"+tableDatas[i].zTeamName+"</i><i style='padding: 10px'>|</i><i style='padding: 10px;color:#0000FF'>"+tableDatas[i].zScoreTotle+"</i><i>-</i><i style='padding: 10px;color:#ffcc00'>"+tableDatas[i].kScoreTotle+"</i><i style='padding: 10px'>|</i><i style='padding: 10px;color:#ffcc00'>"+tableDatas[i].kTeamName+"</i></strong>",
                 showClose:true,
                 duration:10000
               });
              }
           }
         }
        if(!isHave){
          upbase.listene = true
          if(this.value5){
            that.aplayAudio()
          }
          tableDatas.push(upbase)
        }
        that.tableData=tableDatas
        this.$forceUpdate();
      },
      soundEffect(){
        if(!this.value5){
          this.tableData.forEach((item) => {
            item.listene=false
          })
        }else{
          this.tableData.forEach((item) => {
            item.listene=true
          })
        }
      },
      messageTips(){

      },
      initWebSocket(params) {
        let that = this
        that.ws = new WebSocket("ws://47.56.185.111:8080/quartz/websocket");
        // var ws = new WebSocket("ws://localhost:8096/websocket/111405");
        that.ws.onopen = (e) => {
        //  console.log(e)
        }
        that.ws.onmessage = function (e) {
           console.log(e.data)
          if(e.data != '连接成功'){
            let data = JSON.parse(e.data)
            if(data.type=='soccer'){
              console.log(data.type)
              that.updata(data)
            }
          }
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
    /* background: rgb(0, 0, 0, 0.1); */
    border-radius: 10px;
    z-index: 2;
    position: absolute;
    width: 97%;
    height: 900px;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 100px;
    margin-top: 5%;
    /* padding-top: 100px; */
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
    /* height: 600px; */
    position: absolute;
    top: 0;
    left: 0;
      background-size:cover;
      position:fixed;

      height:100%;
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
    width: 60%;
    margin: 0 auto !important;
    padding-top: 12px;
    margin-top: 34px;
  }

  .tab {
    padding-bottom: 10px;
    width: 60%;
    text-align: center;
    margin: 0 auto;
    /* margin-top: 40px; */
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
    border-top: solid 2px #efefef;
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
#iframeId{
  width: 100%;
  height: 800px;
}
.el-message-box{
  width: 50%;
  height: 80%;
}
.thead{
  background-color: #545c64;
  /* color: #FFFFFF; */
}
.thead th{
  /* background-color: #545c64; */
  color: #FFFFFF;
      /* padding: 0 !important; */
}
.tr th{
  /* background-color: #545c64; */
  border-top: #e7e7e7;
  color: #000000;
  font-weight:200;
  padding: 0 !important;
}
</style>
