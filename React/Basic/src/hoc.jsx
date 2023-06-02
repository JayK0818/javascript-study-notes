const mouseMoveFactory = (Component) => {
  return class MouseMove extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        x: 0,
        y: 0
      }
    }
    componentDidMount () {
      document.addEventListener('mousemove', this.mousemove, false)
    }
    mousemove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }
    componentWillUnMount () {
      document.removeEventListener('mousemove', this.mousemove, false)
    }
    render() {
      const data = {
        ...this.state,
        ...this.props
      }
      return (
        <Component {...data}/>
      )
    }
  }
}

const MousePosition = mouseMoveFactory((props) => {
  return (
    <>
      <div>{props.name}</div>
      <div>x: <i>{props.x}</i></div>
      <div>y: <i>{props.y}</i></div>  
    </>
  )
})

// ---------------------- 属性代理 -----------------------------
const InputFactory = (Component) => {
  return class Input extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        text: 'hello High Order Component'
      }
    }
    handleContentChanged = (event) => {
      this.setState({
        text: event.target.value.trim()
      })
    }
    componentDidMount() {
      console.log('hoc-did-mount')
    }
    componentDidUpdate() {
      console.log('hoc-did-updated')
    }
    render() {
      console.log('hoc-render')
      return (
        <Component
          value={this.state.text}
          onChange={this.handleContentChanged}
          placeholder={this.props.placeholder}
        />
      )
    }
  }
}
// 包裹函数组件
const NameInput = InputFactory(({value, onChange, placeholder}) => (
  <input type='text' value={value} onChange={onChange} placeholder={placeholder}/>
))
const PasswordInput = InputFactory(({value, onChange, placeholder}) => (
  <input type='password' value={value} onChange={onChange} placeholder={placeholder}/>
))
// 包裹class组件
const EmailInput = InputFactory(class EmailInput extends React.Component {
  constructor(props) {
    super(props)
    console.log('email-props', props)
  }
  componentDidMount() {
    console.log('child-did-mount')
  }
  componentDidUpdate() {
    console.log('child-did-updated')
  }
  render() {
    console.log('input render')
    return (
      <input type='email' value={this.props.value} onChange={this.props.onChange}/>
    )
  }
})

// ---------------------- 渲染劫持 ------------------------------
// 如果用到super.render() Component必须为函数组件
const LoginWrapper = (Component) => {
  return class LoginComponent extends Component {
    render () {
      if (this.props.isLogin) {
        return super.render()
      }
      return <div>Hello, Please Login</div>
    }
  }
}

const UserLogin = LoginWrapper(class LoginComponent extends React.Component {
  render () {
    return <div>Hello, Welcome back</div>
  }
})

const App = () => (
  <>
    <MousePosition name={'hello'}/>
{/*     <NameInput placeholder='用户名'/>
    <PasswordInput placeholder='密码'/> */}
    <EmailInput placeholder='邮箱'/>
    <UserLogin isLogin={true}/>
    <UserLogin isLogin={false}/>
  </>
)

ReactDOM.createRoot(document.getElementById('hoc-app')).render(<App/>)