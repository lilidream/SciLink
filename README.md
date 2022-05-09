# SciLink

## 实例
创建实例
```js
var graph = new SciLink({
    container: "dom-id", // 必要，容器id
    // 其他选项与G6.Graph相同
})
```
## 数据
输入的关系图节点数据分为 **节点** 与 **连接** 两大类。

它们以JSON格式储存，下面是示例：
```json
{
    nodes: [
        {
            "id": 节点id,
            "type": 节点类型：["element", "equation", "geo", "atmArea", "progress"],
            "name": 节点名称,
            "height":100,
            "content": 节点文字描述内容,
            "latex": 物理量或公式的latex, 仅物理量和公式有效,
            "group": 属于的组的id，非必要
        },
        {其他节点...}
    ],
    links: [
        {
            from: 起点节点id,
            to: 结束节点id,
            type: 连接类型, 1/2/3
            label: 连接文本内容, String
        }
    ],
    groups:[
        
    ]
}
```
### 节点 nodes
nodes为由节点Object组成的数组，数组中的Object属性为：
| 属性 | 类型 | 默认值 | 必填 | 说明 | 合法值 |  有效类型  |
| -- | -- | -- | -- | -- | -- | -- |
| id | String |  | 是 | 节点的id，唯一 | 无限定 | 全部 |
| type | String |  | 是 | 节点类型，见下 | "element", "equation", "object", "space", "time", "process" | - |
| name | String |  | 否 | 节点显示的名称，不填则显示id | 无限定 | 全部 |
| height | float | 16 | 否 | 节点高度大小，宽度将根据宽度计算 | 无限定 | 全部 |
| content | String |  | 否 | 节点内容的文字描述，仅`type`为`process`时有效 | 无限定 | process |
| latex | String |  | 否 | 公式的Latex语句，`\`需要写为`\\`，如`\\frac{1}{2}`| 符合Latex语法 | element, equation |
| group | String |  | 否 | 所属分组的id | 任一分组的id | 全部 |
| color | String |  | 否 | 节点底色 | HEX | 全部 |
| padding | float | 5 | 否 | 节点框内边距 |  | 全部 |
| fontSize | float | 12 | 否 | 文字字体大小 |  | 全部 |
|  |  |  |  |  |  |


节点类型 `type` 属性有效值分别对应为：
 - `element` 单物理量，如温度、气压、湿度等
 - `equation` 公式，如方程、定义式等
 - `object` 实体，如太平洋、南海、青藏高原等
 - `space` 空间范围
 - `time` 时间范围
 - `process` 物理过程，如水汽凝结等

### 联系 links
联系类型：

| 属性 | 类型 | 默认值 | 必填 | 说明 | 合法值 |
| -- | -- | -- | -- | -- | -- |
| from | String |  | 是 | 起始节点id | 无限定 |
| to | String |  | 是 | 结束节点id | 无限定 |
| type | int | 1 | 否 | 连接类型 | `1`,`2`,`3` |
| label | String |  | 否 | 连接上显示的文字标签 | 无限定 |

其中，联系类型为：
 - `1`, 无箭头，指有关
 - `2`, 单指向，定义、推导、结论、过程
 - `3`, 双箭头，可相互推导计算，可逆过程


## 实例方法

### 数据
接入[G6的数据方法](https://antv-g6.gitee.io/zh/docs/api/graphFunc/data)，若需直接使用G6的方法，可使用SciLink内的G6实例：`SciLink.g6`的方法。


#### SciLink.data(data)
为关系图添加数据，
