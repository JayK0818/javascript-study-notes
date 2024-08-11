value=1
function foo() {
  echo $value
}

function bar() {
  local value=2;
  foo;
}
bar;
# 输出2， 因为是动态作用域