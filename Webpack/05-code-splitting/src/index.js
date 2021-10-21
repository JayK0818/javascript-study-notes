// import Vue from 'vue'
// const root = document.createElement('div')

// const Counter = {
//   data() {
//     return {
//       counter:0
//     }
//   }
// }
// const instance = Vue.createApp(Counter);
// const vm = instance.mount(root)
// console.log('hello world')

// console.log(instance, vm);

function createElement() {
  const button = document.createElement('button');
  button.textContent = 'hello world';
  return button;
}
const button = createElement();

button.addEventListener('click',function() {
  import(/*webpackChunkName print*/'./print').then(({print}) => {
    print('hello world')
  })
},false)
document.body.appendChild(button);

