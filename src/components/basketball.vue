/* eslint-disable */
<template>
  <div class="tab">
  <div>
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
       active-text="完场"
       inactive-text="关闭完场">
     </el-switch>
   </div>
    <div class="box">
      <tbody>
        <tr id="tr0_217846">
          <th width="100">赛事</th>
          <th width="160"><span id="th_s_217846">时间</span><span style="color:#ff0000;margin-left:10px;" id="th_t_217846"></span></th>
          <th width="160">队名</th>
          <th width="77">一节</th>
          <th width="77">二节</th>
          <th width="77">三节</th>
          <th width="77">四节</th>
          <th width="82" id="th_f_217846">加时得分</th>
          <th style="line-height:27px" width="76">总分</th>
          <th width="126">是否中立赛事</th>
          <th width="126">队伍id</th>
          <th width="200" style="border-right:1px solid #c9e1f0;">其他</th>
        </tr>
        <template v-for="(item,index) in data">
          <tr id="tr1_2178461" v-bind:key="index">
            <td style="border-bottom: 0px;" v-text="item.competitionName" :style="{background:item.color}"></td>
            <td style="border-bottom: 0px;" v-text="item.matchTime"></td>
            <td v-text="item.zteamName" id="td_as11_217846">
              <font>{}</font>
            </td>
            <td v-text="item.zscore1"  id="td_as1_217846"></td>
            <td v-text="item.zscore2"  id="td_as2_217846"></td>
            <td v-text="item.zscore3"  id="td_as3_217846"></td>
            <td v-text="item.zscore4"  id="td_as4_217846"></td>
            <td v-text="item.zscore5"  id="td_as5_217846"></td>
            <td v-text="item.zscoreTotle"  id="td_as6_217846"></td>
            <td v-text="item.n"  id="td_as7_217846"></td>
            <td v-text="item.zteamId" id="td_as8_217846"></td>
            <td id="td_as10_217846"></td>
          </tr>
          <tr id="tr4_217846" v-bind:key="item.id">
            <td :style="{background:item.color}"></td>
            <td></td>
            <td v-text="item.kteamName" id="td1_as11_217846"></td>
            <td v-text="item.kscore1" id="td1_as1_217846"></td>
            <td v-text="item.kscore2" id="td1_as2_217846"></td>
            <td v-text="item.kscore3" id="td1_as3_217846"></td>
            <td v-text="item.kscore4" id="td1_as4_217846"></td>
            <td v-text="item.kscore5" id="td1_as5_217846"></td>
            <td v-text="item.kscoreTotle" id="td1_as6_217846"></td>
            <td v-text="item.n" id="td1_as8_217846"></td>
            <td v-text="item.kteamId" id="td1_as9_217846"></td>
            <td id="td1_as10_217846"></td>
          </tr>
      </template>
      </tbody>
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
        value3:'',
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
        this.axios.get('api/quartz/basketball/findCurrentMatchByParams', {
          params: {
          // "competitionId": select,//赛事ID，多个以逗号分隔  可空
           // "complate": 1, //为1时，查完场  可空
            "defaultDate": "2020-06-26", //查该日期以后的比赛 可空}
             //"queryDate":"2020-06-27"  //查该日期的比赛 可空
          }
        }).then((res)=> {
          console.log(res);
            res.data.msg.forEach((item)=>{
              item.matchTime = this.getdate(item.matchTime)
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
        // console.log(this.value2)
        var select = (this.value2).toString()
        var time = this.value1;
        console.log(time,select)
        let  params={competitionId:select,
                      defaultDate:"2020-06-26",
                    }
        console.log(params);
        this.axios.get('api/quartz/basketball/findCurrentMatchByParams',{params}).then((res)=> {
          // console.log(res);
            res.data.msg.forEach((item)=>{
              item.matchTime = this.getdate(item.matchTime)
              item.zteamName = `${item.zteamName}(${item.zrank})`
              item.kteamName = `${item.kteamName}(${item.krank})`
            })
            this.data=res.data.msg
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
</script>
<style>
  .box{
    margin-bottom: 20px;
  }
  .tab {
    width: 90%;
    margin: 0 auto;
    border: 1px solid #c9e1f0;
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
  }
  #tr1_2178461 td{
        border-left: 1px solid #c9e1f0;
        border-bottom: 1px solid #c9e1f0;
        height: 40px;
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
</style>
