<template>

  <div class="tab">
  <div>
      <el-select v-model="value2" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.shortName"
          :value="item.id">
        </el-option>
      </el-select>
  </div>
  <div class="block">
     <span class="demonstration">赛事选择</span>
     <el-date-picker
       v-model="value1"
       type="date"
       placeholder="选择日期">
     </el-date-picker>
   </div>
    <div class="box">
      <tbody>
        <tr id="tr0_217846">
          <th width="160">赛事</th>
          <th width="160"><span id="th_s_217846">时间</span><span style="color:#ff0000;margin-left:10px;" id="th_t_217846"></span></th>
          <th width="100">状态</th>
          <th width="77">一节</th>
          <th width="77">二节</th>
          <th width="77">三节</th>
          <th width="77">四节</th>
          <th width="82" id="th_f_217846">全场</th>
          <th style="line-height:27px" width="76">总分</th>
          <th width="82">胜负</th>
          <th width="126">让分胜负</th>
          <th width="144">大小分</th>
          <th width="100" style="border-right:1px solid #c9e1f0">其他</th>
        </tr>
        <template v-for="cm in data">
        <tr id="tr1_2178461" >
          <td v-text="cm.competitionName"></td>
          <td v-text="cm.updateTime"></td>
          <td v-text="cm.status" id="td_as1_217846"></td>
          <td id="td_as1_217846"></td>
          <td id="td_as2_217846"></td>
          <td id="td_as3_217846"></td>
          <td id="td_as4_217846"></td>
          <td id="td_as5_217846"></td>
          <td id="td_as6_217846"></td>
          <td id="td_as7_217846"></td>
          <td id="td_as8_217846"></td>
          <td id="td_as9_217846"></td>
          <td id="td_as10_217846"></td>
        </tr>
        <tr id="tr4_217846">
          <td v-text="cm.competitionName"></td>
          <td v-text="cm.updateTime"></td>
          <td id="td1_as1_217846"></td>
          <td id="td1_as1_217846"></td>
          <td id="td1_as2_217846"></td>
          <td id="td1_as3_217846"></td>
          <td id="td1_as4_217846"></td>
          <td id="td1_as5_217846"></td>
          <td id="td1_as6_217846"></td>
          <td id="td1_as7_217846"></td>
          <td id="td1_as8_217846"></td>
          <td id="td1_as9_217846"></td>
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
        this.axios.get('api/quartz/basketball/findCurrentMatchByParams', {
          params: {
          //"competitionId": "166",//赛事ID，多个以逗号分隔  可空
           // "complate": 1, //为1时，查完场  可空
            "defaultDate": "2020-06-26", //查该日期以后的比赛 可空}
             //"queryDate":"2020-06-27"  //查该日期的比赛 可空
          }
        }).then((res)=> {
          console.log(res);
            res.data.msg.forEach((item)=>{
              item.updateTime = this.getdate(item.updateTime)
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
</style>
