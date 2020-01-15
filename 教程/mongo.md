1. 添加一个字段.  url 代表表名 , 添加字段 content。 字符串类型。

```
db.url.update({}, {$set: {content:""}}, {multi: 1})
```

---
2. 删除一个字段

```
db.url.update({},{$unset:{'content':''}},false, true)
```

---
3. 批量增加

```
db.getCollection('audio').find().forEach(
     function(item) {
        function GetRandomNum(Min,Max){   
            var Range = Max - Min;   
            var Rand = Math.random();   
            return(Min + Math.round(Rand * Range));   
        }
        db.getCollection('audio').update({"_id":item._id},
        {$set: {price_one:GetRandomNum(1,250)}})
    })
```
---

```
db.getCollection('audio').aggregate([{ $sample: { size: 50000 }}]).forEach(
    function(item) {
        function GetRandomNum(){   
        var x = 260;     
        var y = 1999;     
        var rand = parseInt(Math.random() * (x - y + 1) + y);
        return rand;   
        }
        db.getCollection('audio').update({'_id':item._id}, {$set: {price_unlimited:GetRandomNum()}},false, true)
    })
```

---
限制查询的结果条数为10条
```
db.C.find().limit(10)  
```

---
忽略匹配的前10条，显示从第11条匹配的文档开始所有的文档
```
db.C.find().skip(10)
```
---
6.//修改字段名称，把synonymsList表的name_status修改为status

```
db.getCollection('synonymsList').update({},
{$rename : {"name_status" : "status"}}, false, true)
```

---

```
var result = db.getCollection('audio').aggregate
([
{$unwind:"$type"},
{$project : {type : 1, _id: 0}}
]);

while(result.hasNext())

db.temp.insert(result.next())
```

---------------------------------------------------------------
统计结果：
```
.count()
```

---

```
var result = db.getCollection('temp').aggregate
([
{$group : {_id : "$type", num : {$sum : 1}}}
])

while(result.hasNext())

db.temp2.insert(result.next())
```

---

```
db.getCollection('audios').find({ type: { $elemMatch:
{ $eq: "电影",$eq:"电视",$eq:"Loops",$eq:"Basses"}}})
```

---
```
db.getCollection('filtrates').find({}).sort({'music_num':-1})
```

---
```
db.getCollection('audios').update({"type":null},{$set:{"type.$":"music"}}, {multi: 1})
```
---
```
db.getCollection('audios').aggregate
([
{$unwind:"$type"},
{$group : {_id: "$type", num : {$sum : 1}}}
]);
```
---
```
db.getCollection('audios').aggregate
([
{$match:{"type":{"$ne": '电视'}}},
{$unwind:"$type"},
{$group : {_id: "$type", num : {$sum : 1}}}
]);
```
---

```
// 使用这个
db.getCollection('audios').aggregate
([
{$match:{"type":"xxxx","type":"xxx",,,,,,,,}},{$unwind:"$type"},
{$group : {_id: "$type", num : {$sum : 1}}}
]);
```

------------------------------------------------------------

```
db.getCollection('audios').update({"type": { $elemMatch: { $eq: "xxxxx"}}}, 
                {$set: {createTime:ISODate("2018-03-20 02:25:11.447Z")}},false, true)
```

---

```
db.getCollection('audios').find({"type": { $elemMatch: { $eq: "music",$eq: "Loops"}}})
```

---

```
/* 条件查询
*操作 格式 范例 RDBMS中的类似语句
*/
// 等于
{<key>:<value>} db.col.find({"by":"luyaran"}) where by = 'luyaran'
// 小于
{<key>:{$lt:<value>}} db.col.find({"likes":{$lt:50}}) where likes < 50
// 小于或等于
{<key>:{$lte:<value>}} db.col.find({"likes":{$lte:50}}) where likes <= 50
// 大于
{<key>:{$gt:<value>}} db.col.find({"likes":{$gt:50}}) where likes > 50
// 大于或等于
{<key>:{$gte:<value>}} db.col.find({"likes":{$gte:50}}) where likes >= 50
// 不等于
{<key>:{$ne:<value>}} db.col.find({"likes":{$ne:50}}) where likes != 50
```

---------------------------------------------------------------

```
db.getCollection('favorites').aggregate([
{$match:{"userId":ObjectId("5cac67fd57ad951e58371f42")}},
        {$lookup:
            {
                from:'audios', //关联查询表2
                localField:'audioId', //关联表1的商品编号ID
                foreignField:'_id',  //匹配表2中的ID与关联表1商品编号ID对应
                as:'audioInfo'  //满足 localField与foreignField的信息加入audio集合
            }
        }
])
```

---------------------------------------------------

```
// 在原有基础上加一
db.getCollection('audios').update(
{"_id" : ObjectId("5c7f70d7e8382b564e7ef193")}, 
{$inc: {sales:1}})
```
