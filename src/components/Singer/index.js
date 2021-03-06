function nomalData(data){
  //  处理数据
  let obj={hot:[]}   
  // 按照首字母进行分组
  for (let index = 0; index < data.length; index++) {
    let {Findex,Fother_name,Fsinger_mid,Fsinger_name} = data[index]
    //图片
    let avator =`https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`
    let singerItem= {Findex,Fother_name,Fsinger_mid,Fsinger_name,avator}
    // 将前10条数据加入到最热内部
    if(index<10){
      obj.hot.push(singerItem)
    }
    //如果obj对象中没有当前字母，则向对象中创建当前字母的数组
    if(!obj[Findex]){
      obj[Findex]=[singerItem]
    }else{
      // 向首字母里添加歌手
      obj[Findex].push(singerItem)
    }   
  }
  // 将对象转变为数组
  //将最热的数据和其他数据分开来
  let hot=[]
  let other=[]
  for (const key in obj) {
    if(key==='hot'){
      hot.push({Findex:key,list:obj[key]})
    }else if(key!=9){
      other.push({Findex:key,list:obj[key]})
    }
  }
  //按照下标进行排序
  other.sort((a,b)=>{return a.Findex.charCodeAt()-b.Findex.charCodeAt()})
  
  // 将最热和排序过的数据进行合并
  let result =hot.concat(other)
  return result 
 }
 export {nomalData}