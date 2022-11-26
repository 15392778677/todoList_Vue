<template>
<div class="todoListBox">
  <div class="header-Box">
    <div class="header-Left">
      <div class="jiahao" >+</div>
      <h2>Todo List</h2>
    </div>
    <div class="header-right">
      <button class="headerAllSelector" @click="handleSelectAll()">全选</button>
      <button class="headerAllCancel" @click="handleAdd()">添加</button>
    </div>
  </div>
   <!-- 类容区域 -->
  <div class="Content-Box">
     <!-- 传入的item和index的顺序还不能相反 -->
    <div class="Content-items" v-for="(item,index) in todoLists" :key="item.id">
      
       <!-- checked-box -->
      <div class="Content-left" @click="handleSelect(index,item.id)">
        <span :style="item.isChecked ?'opacity:1' :'opacity:0'"></span>
      </div>
      <!-- input框 -->
      <!-- disabled 属性是使输入框变得不可选中，划掉输入框的字 ：class是给input加一个样式 字体变灰，同时 底线白色 -->
      <input type="text" class="Content-input" v-model="item.text" :disabled="item.isChecked" :class="item.isChecked ? 'line-through' : ''" @blur="handlelBlur()"> 
    
     <div class="Content-right">
          <!-- info 框 -->
        <p>{{item.Time}}</p>
         <button class="delect" @click="handledelitem(index,item.id)" v-show="item.isChecked" >删除</button>
     </div>
    </div>

  </div>

  <div class="footer-Box">
    <span :style="isAllChecked() ? 'opacity:1' : 'opacity:0'" @click="handledelAll()">clear</span>
  </div>
</div>
</template>

<script>
import { reactive} from 'vue';
import randomid from './hooks/Random_id'
import dayjs from 'dayjs'    //可以将new Date获取的数据格式化，使用时需要先在项目里安装 npm install dayjs -s 安装后还要记得引入import dayjs from 'dayjs' 
export default {
  name: 'App',
  
   //读取本地存储 不要放在setup里面 放在外面可以加载时就运行函数
  setup(){
    
    let todoLists = reactive([])
     //添加一个
   function handleAdd(){

    //   push是向下push 如果要实现 添加一条从上面添加可以使用unshift
  /*       this.todoLists.push({
          id:this.randomid(),
          isChecked:false,
          text:"",
          Time:dayjs(new Date).format("YY-MM-DD HH:mm")
        }) */
        todoLists.unshift({
          id:randomid(),
          isChecked:false,
          text:"",
          Time:dayjs(new Date).format("YY-MM-DD HH:mm")
        })

   }
   
   //删除一个
   function handledelitem(index,id){
            // console.log(index);
            // console.log(id);

            if(todoLists[index].id === id)
            {
                todoLists.splice(index,1)
                storage()
            }
   }

   //选择框
   function handleSelect(index,id){
      if(todoLists[index].id === id)
      {
        todoLists[index].isChecked = !todoLists[index].isChecked;
         storage();
      }
   }
    
   //全选功能
    /* 有一些小bug 这个全选的前提是全部的isChecked都是一样的属性 */
   /* 已解决 这个问题 
   *  解决方案在取反之前判断一下 情况一：所有的都选中
   *  情况二: 有未被选中
   * 然后分别取反即可 
   */
   function handleSelectAll(){
       if(isAllChecked() === true)
       {
        todoLists.forEach(function(item){
          item.isChecked = !item.isChecked
         }) 
       }else{
        todoLists.forEach(function(item){
             if(item.isChecked===false)
          item.isChecked = !item.isChecked
         })     
       }
        storage();
   }

   //判断是否输入完成
   function handlelBlur(){
      storage();
   }
  

 
  //清空所有选中
  function handledelAll()
  {
       todoLists.splice(0,todoLists.length)
       storage();
  }

  //判断所有被选中
  function isAllChecked()
  {
    let p = true
    todoLists.forEach(item=>{
       if(item.isChecked != true) { p=false}
    })
    return p
  }

      //本地存储
      function storage(){
    window.localStorage.setItem('ListTodo',JSON.stringify(todoLists));
  }

  //setup在created和beforeCreated前加载，因此Vue2中需要在created中运行的函数可以直接在setup中调用
 let handleDate = ()=>
 {
     let getList = reactive(JSON.parse(window.localStorage.getItem("ListTodo")))
     if(getList === null || getList.length <=0)
     {
      todoLists.push( {
          id:randomid(),
          text:"请点击上方的添加按钮添加事件",
          isChecked:false,
          Time:dayjs(new Date).format("YY-MM-DD HH:mm")
        })
     }
     else{
      todoLists = getList
     }
    
 }

    handleDate();

    return { handleSelect,
             handleSelectAll, 
             handleAdd,
             todoLists,
             randomid,
             dayjs,
             handledelitem,
             storage,
             handlelBlur,
             isAllChecked,
             handledelAll}
   }
  }
  
</script>

<style>
.todoListBox{
width: 800px;
height:600px;
background: #3c3e4f;
border-radius: 10px;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
padding: 20px;
color: #fff;

}

.header-Box{
     display: flex;
     justify-content: space-between;
     border-bottom:#ccc 1px solid;
     align-items: center;
     
}
.header-Left{
      display: flex;
      align-items: center;
     
}

.jiahao{
  width: 50px;
  height: 50px;
  border-radius:50%;
  background-color: #9999E6;
  font-size: 30px;
  text-align: center;
  margin-right: 20px;

}

 button{
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: #fff;
  margin-left: 10px;
}

.headerAllSelector{
      background-color: #c43f38;
}
.headerAllCancel{
  background-color:#70B870;

}
.Content-Box{
  margin-top: 50px;
  height: 450px;
  overflow-y:scroll;
}

.Content-Box::-webkit-scrollbar {
                display: none;
}
.Content-items{
  display: flex;
  justify-content: space-between;
  background:#6B6F7D;
  border-radius: 5px;
  padding: 0 10px;
  align-items: center;
  margin-top: 20px;

}
.Content-left{
    width: 10px;
    height: 10px;
    border: 1px solid #ccc;
    border-radius: 50%;
    position: relative;
    padding: 10px 10px;
}
.Content-left span{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #9999E6;
  border-radius: 50%;
   position: absolute;
   top:50%;
   left: 50%;
   transform:translate(-50%,-50%);
}
.Content-input{
  /* 能自动撑开所在div的剩余所有宽度 */
  flex:1;     
  margin:0 10px;
  outline: none;
  background:transparent;
  border: none;
  border-bottom: 1px solid;
  padding:5px 10px;
  color:white;
  font-weight:bold;
}

.Content-right{
   display:flex;
   align-items: center;
}

.Content-right button{
  background-color:#c43f38;
}

.line-through{
  color:rgba(255, 255 ,255 ,0.5);  /* 文字的颜色 */ 
  text-decoration: line-through rgba(255, 255, 255, 0.8);  /* 横线的颜色 */   
  
}
 .footer-Box span{
  display:inline-block; 
   float: right;
}

</style>
