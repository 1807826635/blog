/* eslint-disable */
<template>
  <div class="tab">

  <div style="margin-top: 5%;margin-bottom: 5%;">
      <span class="demonstration">赛事类型</span>
      <el-select v-model="value2" @change="select" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.shortName"
          :value="item.id">
        </el-option>
      </el-select>
<!--  </div>
  <div class="block"> -->
     <span class="demonstration">赛事选择</span>
     <el-date-picker
       v-model="value1"
       @change="select"
       type="date"
       placeholder="选择日期">
     </el-date-picker>
     <el-switch
       v-model="value3"
       inactive-color="#efefef"
       @change="select"
       active-text="完场"
       inactive-text="关闭完场">
     </el-switch>
   </div>
    <table class="el-table">
      <thead>
        <tr id="tr0_217846">
          <th width="9%">赛事</th>
          <th width="9%"><span id="th_s_217846">时间</span><span style="color:#ff0000;margin-left:10px;" id="th_t_217846"></span></th>
          <th width="9%">队名</th>
          <th width="9%">一节</th>
          <th width="9%">二节</th>
          <th width="9%">三节</th>
          <th width="9%">四节</th>
          <th width="9%" id="th_f_217846">加时得分</th>
          <th style="line-height:27px" width="9%">总分</th>
<!--          <th width="126">是否中立赛事</th>
          <th width="126">队伍id</th>
          <th width="200" style="border-right:1px solid #c9e1f0;">其他</th> -->
        </tr>
        <template v-for="(item,index) in data" style="padding-bottom: 0px;">
          <tr id="tr1_2178461" v-bind:key="index">
            <td style="border-bottom: 1px solid #c9e1f0;" v-text="item.competitionName" rowspan="2"  :style="{background:item.color}"></td>
            <td style="border-bottom: 1px solid #c9e1f0;" v-text="item.matchTime" rowspan="2"></td>
            <td v-text="item.zteamName" id="td_as11_217846">
              <font>{}</font>
            </td>
            <td v-text="item.zscore1"  id="td_as1_217846"></td>
            <td v-text="item.zscore2"  id="td_as2_217846"></td>
            <td v-text="item.zscore3"  id="td_as3_217846"></td>
            <td v-text="item.zscore4"  id="td_as4_217846"></td>
            <td v-text="item.zscore5"  id="td_as5_217846"></td>
            <td v-text="item.zscoreTotle"  id="td_as6_217846"></td>
<!--            <td v-text="item.n"  id="td_as7_217846"></td>
            <td v-text="item.zteamId" id="td_as8_217846"></td>
            <td id="td_as10_217846"></td> -->
          </tr>
          <tr id="tr4_217846" v-bind:key="item.id">
            <!--<td :style="{background:item.color}"></td>-->
            <!--<td></td>-->
            <td v-text="item.kteamName" id="td1_as11_217846"></td>
            <td v-text="item.kscore1" id="td1_as1_217846"></td>
            <td v-text="item.kscore2" id="td1_as2_217846"></td>
            <td v-text="item.kscore3" id="td1_as3_217846"></td>
            <td v-text="item.kscore4" id="td1_as4_217846"></td>
            <td v-text="item.kscore5" id="td1_as5_217846"></td>
            <td v-text="item.kscoreTotle" id="td1_as6_217846"></td>
<!--            <td v-text="item.n" id="td1_as8_217846"></td>
            <td v-text="item.kteamId" id="td1_as9_217846"></td>
            <td id="td1_as10_217846"></td> -->
          </tr>
      </template>
      </thead>
   </table>
   <div>
     <img class="images" src="../assets/timg.png">
   </div>
  </div>
  <!-- </div> -->
</template>

<script>
/* eslint-disable */
  export default {
    data() {
      return {

        options: [],
        value2: [],
        value3:false,
        value1: '',
        data:[],
        // activeName: 'second'
      };
    },
    mounted() {
      this.get(),
      this.cate()
    },
    methods: {
      get() {
        // var select = this.value2;
        let time =(new Date()).getTime();
        // 一天前
        let Dates =this.$moment(time).subtract(1,'days').format('YYYY-MM-DD')
        // 当前时间
        let defaultDate=this.$moment(time).format('YYYY-MM-DD')

        var select = (this.value2).toString()

        var d = new Date(this.value1);
        d =this.$moment(d).format('YYYY-MM-DD');

        // 是否选择时间
        if(d === 'Invalid date'){
          d = '';
        }else{
          Dates = '';
        }

        var f = this.value3;
        // console.log(f)
        // 是否完场
        if(f){
          f = 1;
        }else{
          f = 0;
        }
        let  params={competitionId:select,
                      defaultDate:Dates,
                      complate:f,
                      queryDate:d  //查该日期的比赛 可空
                    }

        this.axios.get('api/quartz/basketball/findMatchByParams',{params}).then((res)=> {

            res.data.msg.forEach((item)=>{
              item.updateTime = this.$moment(item.updateTime).format("YYYY-MM-DD kk:mm:ss")
              item.matchTime = this.$moment(item.matchTime).format("YYYY-MM-DD kk:mm:ss")
              // item.matchTime = this.getdate(item.matchTime)
              item.zteamName = `${item.zteamName}(${item.zrank})`
              item.kteamName = `${item.kteamName}(${item.krank})`
            })
            this.data=res.data.msg
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      cate(){
      // 分类
        this.axios.get('api/quartz/basketball/findAllCompetition', {
          params: {

          }
        }).then((res)=> {
            this.options=res.data.msg
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      getdate() {
        let now = new Date(),
          y = now.getFullYear(),
          m = now.getMonth() + 1,
          d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
      },
      select(){
        this.get()

      }
    }
  };
</script>
<style>
  .box{
    margin-bottom: 20px;
  }
  .tab {
    width: 60%;
    margin: 0 auto;
    /* border: 1px solid #000; */
  }
  #tr0_217846{
        height: 30px;
        line-height: 30px;
        color: #003f94;
        background: #e8f6ff;
  }
  #tr0_217846 th{
        border-left: 1px solid #c9e1f0;
        border-bottom: 1px solid #c9e1f0;
        height: 40px;
        line-height: 40px;
        empty-cells: show;
        width: 7%;
  }
  #tr1_2178461 td{
        border-left: 1px solid #c9e1f0;
        border-bottom: 1px solid #c9e1f0;
        height: 20px;
        line-height: 40px;
        empty-cells: show;
  }
  #tr4_217846 td{
        border-left: 1px solid #c9e1f0;
        border-bottom: 1px solid #c9e1f0;
        height: 40px;
        line-height: 40px;
        empty-cells: show;
  }
  #td_as10_217846{
    border-right: 1px solid #c9e1f0;
  }
  #td1_as10_217846{
    border-right: 1px solid #c9e1f0;
  }
  tr{
    text-align: center;
  }
  #tr0_217846 th{
    color: #000000;
    text-align: center;
    border-top: 1px solid #c9e1f0;
  }
  #tr1_2178461 td{
    color: #000000;
    text-align: center;
  }
  #tr4_217846 td{
    color: #000000;
    text-align: center;
    padding-bottom: 10px;
  }
  .demonstration {
      color: #ffffff;
      font-weight: 600;
  }
  .images {
    width: 100%;
    /* height: 600px; */
    position: absolute;
    top: 0;
    left: 0;
      background-size:cover;
      position:fixed;
      z-index: -1;
      height:100%;
    /*opacity: 0.4;*/
    /*filter:alpha(opacity=40);*/
  }

</style>
