<template>
<!--  <div>
    <div>
       <el-tabs v-model="activeName" @tab-click="handleClick">
         <el-tab-pane label="足球中心" name="first">足球中心</el-tab-pane>
         <el-tab-pane label="篮球中心" name="second">篮球中心</el-tab-pane>

       </el-tabs>
     </div>
 -->
  <div class="tab">
  <div>
      <el-select v-model="value2" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
          <th width="160">西班牙篮球联赛</th>
          <th width="160"><span id="th_s_217846">未开场</span><span style="color:#ff0000;margin-left:10px;" id="th_t_217846"></span></th>
          <th width="77">一节</th>
          <th width="77">二节</th>
          <th width="77">三节</th>
          <th width="77">四节</th>
          <th width="82" id="th_f_217846">全场</th>
          <th style="line-height:27px" width="76">总分</th>
          <th width="82">胜负</th>
          <th width="126">让分胜负</th>
          <th width="144">大小分</th>
          <th width="200" style="border-right:1px solid #c9e1f0">其他</th>
        </tr>
        <tr id="tr1_2178461">
          <td>周日301</td>
          <td>布尔戈斯</td>
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
          <td>周日301</td>
          <td>布尔戈斯</td>
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value2: [],
        value1: '',
        // activeName: 'second'
      };
    },
    mounted() {
      this.get()
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
            console.log(res)
            // res.data.msg.forEach((item)=>{
            // item.score = `${item.zscoreTotle}- ${item.kscoreTotle}`
            // item.victory = item.zscoreTotle- item.kscoreTotle > 0 ? '胜':'败'
            //  item.matchTime = this.getdate(item.matchTime)
            // })
            // this.tableData=res.data.msg
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
</style>
