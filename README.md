### 中间件: app.use(中间件)，是一种流程或者方法的总结，可以是一个方法也可以是一个文件。
#### 特点：
#### 1. 本身是一个async函数
#### 2. 在调用next()的时候, async函数就会依序的调用接下来注册的中间件
#### 3.洋葱圈机制：从外部中间件执行到内部中间件，再从内部中间件执行到外部中间件。
##### 执行async函数内部的代码的时候，碰到next(),执行下一个中间件，若前面加了await，则等待下一个中间件执行完后，在回来执行这个 awiat next() 下面的代码。
```
await 代码a();
console.log(1);

function a() {
  console.log(2);
}

await的意思是： 等待await后面的代码执行完成，才执行'await 代码' 下面的代码，await为等待的意思。await必须放在async函数内，async为异步的意思。
```

### API
#### ctx: 上下文对象，里面含有request、response等各种信息
#### 1.ctx在整一个app中间件的生命周期内是通用的（一个请求中），在许多个中间件中是一样的，用的同一个
#### 2.ctx上可以任意挂载东西 eg: ctx.user = { name: 'tom' }; 执行顺序还是上面所写的执行顺序，但是官方推荐挂载在state这个命名空间上， 即 ctx.state.user = { name: 'tom' };

#### ctx.cookie.get/set 操作cookie
#### ctx.throw(404, 'Not Found 哈哈哈')抛出错误，返给前端

#### ctx.respond = false; 禁用调koa的对response的自动处理。

### 数据库（https://www.postgresql.org/docs/10/app-pg-ctl.html）
```
步骤
1. 初始化数据库
initdb ./pgdata                在./pgdata文件夹下初始化db（database：数据库）

2. 启动服务并开启日志
pg_ctl -D ./pgdata -l ./logs/pg.log start
(原命令 pg_ctl -D ./pgdata -l logfile start)

(stop服务 pg_ctl -D ./pgdata -l ./logs/pg.log stop)
(重新启动服务 pg_ctl -D ./pgdata -l ./logs/pg.log restart)

这里特殊，若启动失败（有一种原因是之前已经启动了）
注意：brew services list 里面是brew启动的服务 而不包括 我自己手动执行postgres执行的命令服务

若用brew来管理postgres服务，则进行以下步骤
(1).检测是否启动
brew services list
(2).若已经启动，断开
brew services stop postgresql
(3)若断开，启动
brew services start postgresql
(以下可能用不到，通过杀死进程来解决)
查看进程占用情况 lsof -i tcp:5432 杀死进程 kill -9 391（PID由上句查询得到）


3.创建用户
createuser -s wh

4.创建所有者为wh，名为pg_playground的数据库
createdb --owner=wh pg_playground

5.连接数据库
psql pg_playground

6.进入数据库后
(1).检查是否正常连接
pg_playground=# SELECT version();

# 结果如下为正常连接
PostgreSQL 10.6 on x86_64-apple-darwin18.2.0, compiled by Apple LLVM version 10.0.0 (clang-1000.11.45.5), 64-bit
(1 row)

(2).退出数据库
pg_playground=# \q
```

#### 创建表用关键字CREATE TABLE
```
pg_playground=# CREATE TABLE test_table_1 (
pg_playground=(# string_test_1 varchar(32),
pg_playground=(# unique_id UUID,
pg_playground=(# content  JSON,
pg_playground=(# number_test_1 int
pg_playground=(# );
```
#### 主键（PRIMARY vKEY） 全表唯一、不能为空
```
pg_playground=# CREATE TABLE test_table_1 (
pg_playground(# id INT PRIMARY KEY,
pg_playground(# name varchar(32)
pg_playground(# );
```
### 类型
```
文本类型
varchar(32) 可变的字符串(32位) 这个与下面就不一样，长度最长为32位，大部分用这个
char(32) 规定长度 如果输入a 和一个 ab 他会帮你填空格，最后结果都是32位
TEXT 想存多长寸多长 一半没限制 文本

数字类型
INT  整数（4字节）
SMALLINT 默认位数2字节
BIGINT 字节更大一些
DECIMAL 表示一个非常大的数，长度也可以改变
NUMERIC 浮点数也可以表示一个正常的数字 精确的 长度可以指定一个变化
DOUBLE PRECISION 双精度浮点数
REAL 浮点数

二进制类型
BYTEA 八位位组

时间日期
TIMESTAMP 时间戳
DATE 
INTERVAL 时间的间隔

布尔类型
BOOLEAN true/false

枚举类型
pg_playground=# CREATE TYPE mode AS ENUM('mode_1','mode_2','mode_3');
出现 CREATE TYPE 为成功
mode_test_3 mode 往这个mode里面插入数据就只能插入对应'mode_1','mode_2','mode_3' 的类型
```
### 更改表 ALTER TABLE
#### 新增加一列（ADD COLUMN）
```
#                           表的名字                 key      key的类型U    
pg_playground=# ALTER TABLE test_table_6 ADD COLUMN new_uuid UUID;
```     

#### 更新某一列的数据类型(ALTER COLUMN key TYPE newType)
```
pg_playground=# ALTER TABLE test_table_1 ALTER COLUMN string_test_1 TYPE char(32);
```

### 删除表 DROP TABLE
```
pg_playground=# DROP TABLE test_table_1;
```

### 查看有哪些可用的命令(\h)
```
# 这里\h没有用分号，是因为这里是条命令，并不是sql语句。
pg_playground=# \h
---------------------------------------------------  
# 查看DROP TABLE 怎么用
g_playground=# \h DROP TABLE

打出以下信息：
Command:     DROP TABLE
Description: remove a table
Syntax:
DROP TABLE [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]
```

### 查看表信息
```
1.当前数据库下面有哪些表（\d）

pg_playground=# \d
会打出
           List of relations
 Schema |     Name     | Type  | Owner
--------+--------------+-------+-------
 public | test_table_1 | table | bobi
(1 row)

2.查看具体的表信息(\d tableName)

pg_playground=# \d test_table_1
                   Table "public.test_table_1"
 Column |         Type          | Collation | Nullable | Default
--------+-----------------------+-----------+----------+---------
 id     | integer               |           | not null |
 name   | character varying(32) |           |          |
Indexes:
    "test_table_1_pkey" PRIMARY KEY, btree (id)
```
### 对key增加一些约束
```
pg_playground=# CREATE TABLE users (
# name 文本类型 不为空 4 < 长度 < 16
name TEXT NOT NULL CHECK(CHAR_LENGTH(name) > 4 AND CHAR_LENGTH(name) < 16),
# age 整数类型 如果没有值默认为18
age INT CHECK(age >= 0) DEFAULT 18);

pg_playground=# \d users
得出以下:

               Table "public.users"
 Column |  Type   | Collation | Nullable | Default
--------+---------+-----------+----------+---------
 name   | text    |           | not null |
 age    | integer |           |          | 18
Check constraints:
    "users_age_check" CHECK (age >= 0)
    "users_name_check" CHECK (char_length(name) > 4 AND char_length(name) < 16)
```

### 增 -> 插入（INSERT INTO）
```
#指定列名，建议用这一种         表名   列名         值为
pg_playground=# INSERT INTO users (name, age) VALUES ('weihao', 18);

# 插入默认值（不写age为默认）
pg_playground=# INSERT INTO users (name) VALUES ('morenzhi');

# 如果不写列名会按照默认的顺序进行插入
pg_playground=# INSERT INTO users VALUES ('douyujun',19);


pg_playground=# SELECT * FROM users;
查询得到：   
  name  | age
--------+-----
 weihao |  18
(1 row)
```

### 删 -> 删除语句 DELETE
```
# 删除表内所有内容
DELETE FROM users;
pg_playground=# DELETE FROM users;
DELETE 3
pg_playground=# SELECT * FROM users;
 name | age
------+-----
(0 rows)

# 删除指定name 为 weihao 的字段
DELETE FROM users WHERE name = 'weihao'
pg_playground=# DELETE FROM users WHERE name = 'asdaa';

```
#### 改 -> 更新 UPDATE
```
将年龄为18改为22
pg_playground=# UPDATE users SET age=22 WHERE age=18;
将年龄为22d
pg_playground=# UPDATE users SET name='linjunjie' WHERE age=22;
# 当年龄为30 更新年龄到33 
pg_playground=# UPDATE users age=33 WHERE age = 30;
# 当年龄为33 更新名字为linjunjie
pg_playground=# UPDATE users SET name = 'linjunjie' WHERE age = 33;

```

#### 查 -> 查询语句 SELECT
``` 
# 这是获取表内所有字段
pg_playground=# SELECT * FROM test_table_1; (!一定要写上分号才管用)

# 结果为（第一行为表头）
string_test_1 | number_test_1
---------------+---------------
(0 rows)

#🔝指定name age 的字段
pg_playground=# SELECT name,age FROM users;
   name   | age
----------+-----
 weihao   |  18
 morenzhi |  18
 douyujun |  19
(3 rows)

# 指定name字段
SELECT name FROM users;

pg_playground=# SELECT name FROM users;

   name
----------
 weihao
 morenzhi
 douyujun
(3 rows)

# 指定 name 为 weihao 的字段

SELECT * FROM users WHERE name = 'weihao';
pg_playground=# SELECT * FROM users WHERE name = 'weihao';
  name  | age
--------+-----
 weihao |  18
(1 row)

# EXPLAIN 查询语句执行具体信息
pg_playground=# EXPLAIN SELECT * FROM users WHERE AGE = 45;
                      QUERY PLAN
-------------------------------------------------------
# 从上向下依次执行
 Seq Scan on users  (cost=0.00..25.88 rows=6 width=36)
   Filter: (age = 45)
(2 rows)
```
#### log打印 命令查询时间
```
vim pgdata/postgresql.conf 
在最下面添加以下代码
log_min_duration_statement = 0
log_statement = all
log_duration = on

pg_ctl -D ./pgdata -l ./logs/pg.log restart 重启下数据库

tail -f ./logs/pg.log 查看log新输出的内容

# 取得最大的10条                            排序（根据serial_no）降序 限制为10条
pg_playground=# SELECT * FROM index_table ORDER BY serial_no DESC LIMIT 10;
```
#### 创建索引
```
索引作用： 让查找更加高效快速

# 索引类型
hash
btree（默认 q）
brin
地理位置

# 创建分别以name、age为主的索引
CREATE INDEX name_age ON users (name, age);

# 创建类型为hash的索引 hash在做等于比较时会非常快（以精确的值查询某个内容会非常快）
CREAT INDEX name_hash ON users USING HASH (name);

pg_playground=# \d users;
查询得到如下：
Indexes:
    "name_age" btree (name, age)
    "name_hase" hash (name)
```

### 项目 koa_server
```
# 创建文件夹 koa_server
mkdir koa_server
cd koa_server
npm init 
git init
(以下依赖全部装入dependencies，npm i name 竟然会装入到这个下面)
npm i koa -S
npm i pg
npm i sequelize
npm i koa-router
npm i koa-body
创建文件夹 models routers services
```

### 备注
```
1.当执行node xxx.js 遭遇端口占用时
若在Terim2中, control + c 即可
若在vscode中, control + option + m 即可
推荐都在Terim2中运行，方便管理

2.不用打开网页查看结果
直接运行 curl localhost:8080 即可

# 我需要获得的信息
attributes: []

# 获取所有数据 获取单个数据
findAll findOne 

# router挂载新增
.use(postRouter.allowedMethods());
用途： 定义的为post请求的路由，当用get请求时会失败。

注意的地方：
1.以下的这种get请求得不到数据

async function getList() {
  let list = await UserModel.findAll();
  list = list.map(user => user.dataValues);
  return list;
}

router
  .get('/user', async (ctx, next) => {
    ctx.body = getList();
    # 注意这里必须使用await
    ctx.body = await getList();
  });

2. 以下不加await得不到return
async function yuanshi() {
  let aaa;
  // 这里不加await不行！return 没有值
  await sequelize.query("SELECT name FROM users")
    .spread((results, metadata) => {
      // 结果将是一个空数组，元数据将包含受影响的行数。
      // console.log(results, 'results')
      // console.log(metadata, 'metadata')
      aaa = results;
      console.log(aaa, 'aaa')
    })
  console.log(aaa, '123');
  return aaa;
}

3. findAll 得到的是一个数组
[
    {}, {}, {}
]
数组中的每一项是一个对象
对象中有dataValues
->
const result = await Model.findAll();
result.map(r => r.dataValues)


当Model create后返回的不用专门取dataValues,默认拿到的就是dataValues
const created = await Model.create(data);
# 不用再 return created.dataValues;
return created;

4. 一般get传query，post传body

5.findAndCountAll - 在数据库中搜索多个元素，返回数据和总计数
https://demopark.github.io/sequelize-docs-Zh-CN/models-usage.html

6.
// 删除所有表
sequelize.drop();
// 删除当前Model
HmModel.drop();
// 同步所有尚未在数据库中的模型
sequelize.sync();
```