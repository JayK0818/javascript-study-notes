const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//--------------------------------------- 配置devServer ---------------------------------------
// module.exports = {
//   entry: path.join(__dirname,'src/index.js'),
//   mode:'development',
//   devtool:'eval',
//   output:{
//     filename:'bundle.js',
//     path:path.join(__dirname,'dist'),
//     clean:true
//   },
//   plugins:[
//     new HtmlWebpackPlugin({
//       title:'hello world'
//     })
//   ],
//   devServer:{
//     port:'5050',
//     host:'0.0.0.0',
//     static:path.join(__dirname,'dist'),
//     compress:true
//   }
// }


// ------------------------------------------------- 比较每个sourceMap ---------------------------------------

// eval 不会生成sourceMap, 将模块代码放到eval函数执行，携带一个url标注 sourceMap的文件路径

// eval-source-map  定位到行 列信息
// cheap-eval-source-map  定位行问题,没有列信息
// cheap-module-eval-source-map 定位行问题, 显示源代码
const modes = [
  'eval','eval-cheap-source-map','eval-cheap-module-source-map','eval-source-map','cheap-source-map',
  'cheap-module-source-map','source-map','inline-cheap-source-map', 'inline-cheap-module-source-map',
  'inline-source-map', 'eval-nosources-cheap-source-map'
]

// module.exports = modes.map(item => {
//   return {
//     entry:path.join(__dirname,'src/index.js'),
//     devtool:item,
//     mode:'none',
//     output:{
//       filename:`js/${item}.js`,
//       path:path.join(__dirname,'dist'),
//       clean:true
//     },
//     // module:{
//     //   rules:[
//     //     {
//     //       test:/\.js$/,
//     //       use:[
//     //         {
//     //           loader:'babel-loader',
//     //           options:{
//     //             presets:['@babel/preset-env']
//     //           }
//     //         }
//     //       ]
//     //     }
//     //   ]
//     // },
//     plugins:[
//       new HtmlWebpackPlugin({
//         filename:`${item}.html`
//       })
//     ]
//   }
// })

// --------------------------------- 热更新 ------------------------------------
const webpack = require('webpack')
module.exports = {
  mode:'development',
  entry:path.join(__dirname,'src/index.js'),
  devtool:'eval-cheap-module-source-map',
  output:{
    filename:'[name].bundle.js',
    path:path.join(__dirname,'dist'),
    clean:true
  },
  devServer:{
    port:'5050',
    hot:true,
    static:path.join(__dirname,'dist'),
    compress:true,
    host:'0.0.0.0'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'hot module replacement'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}


// -------------------------------------- webpack导出函数 ------------------------------------
// module.exports = (env,argv) => {
//   console.log(argv)
//   const config = {
//     entry:path.join(__dirname,'src/index.js'),
//     output:{
//       filename:'[name].bundle.js',
//       path:path.join(__dirname,'dist'),
//       clean:true
//     },
//     module:{
//       rules:[
//         {
//           test:/\.css$/,
//           use:['style-loader','css-loader']
//         }
//       ]
//     }
//   }
//   if(argv.mode === 'development'){
//     config.mode = 'development'
//     config.devtool = 'eval-source-map'
//     // config.devServer = {
//     //   hot:true,
//     //   port:'5050',
//     //   host:'0.0.0.0',
//     //   static:path.join(__dirname,'dist'),
//     //   compress:true
//     // }
//     config.plugins = [
//       ...config.plugins,
//       new HtmlWebpackPlugin({
//         title:'测试'
//       })
//     ]
//   }else{
//     config.mode = 'production'
//     config.devtool = false;
//   }
//   return config;
// }


// const webpack = require('webpack');

// module.exports = {
//   mode:'none',
//   entry:path.join(__dirname,'src/index.js'),
//   // devtool:'eval-cheap-module-source-map',
//   output:{
//     filename:'[name].bundle.js',
//     path:path.join(__dirname,'dist'),
//     clean:true
//   },
//   module:{
//     rules:[
//       {
//         test:/\.css$/,
//         use:['style-loader','css-loader']
//       }
//     ]
//   },
//   optimization:{
//     sideEffects:true, //
//     // usedExports:true, // ---------------------- 打包实际import引入的代码
//     // concatenateModules:true
//     // minimize:true     // ---------------------- 压缩代码
//   },
//   plugins:[
//     new webpack.DefinePlugin({
//       API_BASE_URL:JSON.stringify('http://www.baidu.com'),
//       PRODUCTION:JSON.stringify(true),
//       VERSION:JSON.stringify('5fa3b9'),
//       BROWSER_SUPPORTS_HTML5:true
//     })
//     // new HtmlWebpackPlugin({
//     //   title:'define-plugin'
//     // })
//   ]
//   // devServer:{
//   //   port:'5050',
//   //   host:'0.0.0.0',
//   //   static:path.join(__dirname,'dist'),
//   //   compress:true,
//   //   hot:true
//   // }
// }
