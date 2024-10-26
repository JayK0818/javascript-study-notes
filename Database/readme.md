# 数据库

## MySql

1. 数据库是一些关联表的集合
2. 列: 一列包含了相同类型的数据
3. 行: 一行是一组相关的数据
4. 主键: 主键是唯一的。一个数据表中只能包含一个主键
5. 外键: 外键用于关联两个表
6. 索引: 使用索引可以快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。

## 安装

配置环境变量:

```js
// 以下为mac配置环境变量

// vim ~/.zshrc
export PATH="/usr/local/mysql/bin:$PATH"

// 刷新环境变量
source ~/.zshrc
```

## 连接数据库及操作

注意输入的命令需要加 ; .

```js
// 1. 连接数据库
mysql -u root -p

/**
 * -u 用于指定用户名
 * -p 需要输入密码
*/

// 查看数据库
SHOW DATABASES; // show databases

// 要使用的数据库
USE database_name;

// 创建数据库
create database database_name;

// 删除数据库
drop database database_name;


// 创建用户表
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY, // id 自增 为主键
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  birth_date DATE,
  is_active BOOLEAN DEFAULT TRUE
);

// 显示数据表
show tables;

// 查看当前表详细信息
desc users;

// 删除数据表
drop table table_name;

// 查询数据
SELECT column1, column2 ... FROM table_name
SELECT * from table_name
/**
 *
 *column1, column2 表示列的字段名。 使用* 表示选择所有列。 table_name表示表名。
*/

SELECT * FROM users WHERE is_active = TRUE;
// WHERE 是指定条件过滤

SELECT * FROM users ORDER BY birth_date DESC
// ORDER BY 指定结果集的排序  ASC(升序), DESC (降序)

SELECT * FROM users LIMIT 10; // limit限制返回的行数
```

## MongoDB

  MongoDB是一个文档型数据库, 数据以类似JSON的文档形式存储。
  MongoDB的设计理念是为了应对大量数据, 高性能和灵活性需求。MongoDB将数据记录存储为文档,并将它的汇集在集合中。数据库存储一个或
  多个文档集合。单个集合中的文档不需要具有相同的字段集, 并且在集合内的不同文档中, 字段的数据类型可以不同。

数据库（Database）：存储数据的容器，类似于关系型数据库中的数据库。
集合（Collection）：数据库中的一个集合，类似于关系型数据库中的表。
文档（Document）：集合中的一个数据记录，类似于关系型数据库中的行。BSON是JSON文档的二进制表示形式。

### Mongosh安装

  数据库和mongosh安装在 /usr/local 目录下, 安装之后配置环境变量.

```shell
cd ~/.zshrc
export PATH='/usr/local/mongodb/bin:$PATH'
export PATH='/usr/local/mongosh/bin:$PATH'

mongod --version
```

  MongoDB Shell 是MongoDB提供的官方交互式界面。允许用户与MongoDB数据库进行交互,执行命令和操作数据库。

```shell
mongosh --version #查看安装版本

mongosh # 使用默认端口27017连接到本地主机上运行的MongoDB部署。
# mongosh "mongodb://localhost:27017"

mongosh "mongodb://localhost:9999"
mongosh --port 9999
```

```js
use database // 创建数据库

db.collection.insertOne() // 插入一条数据
db.collection.insertMany()  // 多条数据

db.collection.find()
// SELECT * FROM movies
db.collection.find({
  title: 'Hello'
})

// 更新
db.collection.updateOne()
db.collection.updateMany()
db.collection.replaceOne()

db.collection.deleteMany()
db.collection.deleteOne()
```

### 嵌入式文档
  
  MongoDB使用 点符号来访问数组的元素和访问嵌入式文档的字段。

```js
db.inventory.insertMany([
  {
    item: 'journal',
    qty: 25,
    size: { h: 14, w: 21, uom: 'cm' },
    status: 'A'
  }
])

db.inventory.find({
  "size.uom": "in"
});
// 匹配嵌入式文档
db.inventory.find({
  size: { h: 14, w: 21, uom: 'cm' }
});

// 匹配数组
db.inventory.find({
  tags: ['red', 'blank']
})

// 嵌入式文档数组
[
  {
    item: 'journal',
    stock: [
      { warehouse: 'A', qty: 5 },
      { warehouse: 'C', qty: 15 }
    ]
  }
]
// 查询嵌套在数组中的文档
db.inventory.find({
  stock: { warehouse: 'A', qty: 5 } // 整个嵌入式文档的相等匹配要求与指定文档精确匹配, 包括字段顺序。
})

db.inventory.find({
  stock: { qty: 5, warehouse: 'A' } // 这么查询不匹配inventory中的任何文档
})

// 指定文档的查询条件
db.inventory.find({
  "stock.qty": { $lte: 20 }
})
```

  MongoDB不建议对嵌入文档进行比较, 因为这些操作需要与指定的文档完全匹配, 包括字段顺序。

```js
"<array>.<index>"

{
  contributes: [ "Turing machine", "Turing test"],
}
// "contributes.1" 指定contributes第一个元素

{
  name: { first: "Alan", last: "Turing" },
  contact: { phone: { type: "cell", number: "111-222-3333" } },
  // “name.last”
  // "contact.phone.number"
}
```

### 限制返回字段

```js
const res = db.inventory.find({
  status: 'A'
}).project({
  item: 1,
  status: 1
})
// 匹配文档中仅返回 item, status 和默认情况下的 _id 字段

db.inventory.find({
  status: 'A'
}).project({
  item: 1,
  status: 1,
  _id: 0
})
// 删除返回的_id字段。


const cursor = db
.collection('inventory')
.find({
  status: 'A'
})
.project({ item: 1, status: 1, 'size.uom': 1 }) // 返回嵌入式文档中指定字段
```

### 批量写入

```js
  db.pizzas.bulkWrite([
    { insertOne: { document: { _id: 3, type: "beef", size: "medium", price: 6 } } },
    { insertOne: { document: { _id: 4, type: "sausage", size: "large", price: 10 } } },
    { updateOne: {
        filter: { type: "cheese" },
        update: { $set: { price: 8 } }
    } },
    { deleteOne: { filter: { type: "pepperoni"} } },
    { replaceOne: {
        filter: { type: "vegan" },
        replacement: { type: "tofu", size: "small", price: 4 }
    } }
  ])
```

### 管道聚合(Aggregation Pipeline)

  聚合管道由一个或多个处理文档的阶段组成.

- 每个阶段对输入文档执行一个操作。
- 从一个阶段输出的文档将传递到下一个阶段。

```js
// 以下demo 来自官网
db.orders.insertMany( [
   { _id: 0, name: "Pepperoni", size: "small", price: 19,
     quantity: 10, date: ISODate( "2021-03-13T08:14:30Z" ) },
   { _id: 1, name: "Pepperoni", size: "medium", price: 20,
     quantity: 20, date : ISODate( "2021-03-13T09:13:24Z" ) },
   { _id: 2, name: "Pepperoni", size: "large", price: 21,
     quantity: 30, date : ISODate( "2021-03-17T09:22:12Z" ) },
   { _id: 3, name: "Cheese", size: "small", price: 12,
     quantity: 15, date : ISODate( "2021-03-13T11:21:39.736Z" ) },
   { _id: 4, name: "Cheese", size: "medium", price: 13,
     quantity:50, date : ISODate( "2022-01-12T21:23:13.331Z" ) },
   { _id: 5, name: "Cheese", size: "large", price: 14,
     quantity: 10, date : ISODate( "2022-01-12T05:08:13Z" ) },
   { _id: 6, name: "Vegan", size: "small", price: 17,
     quantity: 10, date : ISODate( "2021-01-13T05:08:13Z" ) },
   { _id: 7, name: "Vegan", size: "medium", price: 18,
     quantity: 10, date : ISODate( "2021-01-13T05:10:13Z" ) }
])

// 聚合
db.orders.aggregate( [
   // Stage 1: Filter pizza order documents by pizza size
   {
      $match: { size: "medium" }
   },
   // Stage 2: Group remaining documents by pizza name and calculate total quantity
   {
      $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
   }
])

// 输出
[
   { _id: 'Cheese', totalQuantity: 50 },
   { _id: 'Vegan', totalQuantity: 10 },
   { _id: 'Pepperoni', totalQuantity: 20 }
]
```

  在MongoDB中, 存储在集合中的每个文档都需要一个唯一的 **_id** 字段作为主键。如果插入的文档省略了 **_id** 字段,
  MongoDB驱动程序会自动为 **_id** 字段生成一个 ObjectId.

[MongoDB下载](https://www.mongodb.com/try/download/community)

[MongoDB-官网](https://www.mongodb.com/zh-cn/docs/manual/)

[MongoDB-MacOX安装](https://www.runoob.com/mongodb/mongodb-osx-install.html)

[MongoShell-CRUD](https://www.mongodb.com/zh-cn/docs/mongodb-shell/crud/)
