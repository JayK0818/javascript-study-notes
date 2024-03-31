# AST

抽象语法树(Abstract Syntax Tree) 是源代码语法结构中的一种抽象表示。它以树状的形式表现编程语言的语法结构, 树上的每个节点都表示源代码中的一种结构。

1. 分词: 将整个代码字符串分隔成最小语法单元数组 (每个关键字, 标识符, 操作符 是一个 token)
2. 语法分析: 在分词基础上建立分析语法单元之间的关系

3. @babel/parser: 转换为 AST 语法抽象树
4. @babel/traverse: 对 AST 节点进行递归遍历
5. @babel/types: 对具体的 AST 节点进行修改
6. @babel/generator: AST 抽象语法树生成新的代码

Babel 的三个主要处理步骤 分别是: parse(解析) / 转换(transform) / 生成(generate)

ThisExpression | Identify | Literal | ArrayExpression | ObjectExpression | FunctionExpression |
ArrowFunctionExpression | ClassExpression | Super | NewExpression | CallExpression | UpdateExpression |
AwaitExpression | ...

```ts
export default function ({ types: t }) {
  return {
    visitor: {
      // visitor contents
    },
  };
}
```
