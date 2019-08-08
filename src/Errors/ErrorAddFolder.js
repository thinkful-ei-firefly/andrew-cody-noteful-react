import React from 'react'

class ErrorAddFolder extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(){
    // console.log('made it to ErrorAddFolder getderivedstate')
    return {hasError: true}
  }

  componentDidCatch(){}

  render(){
    // console.log('made it to ErrorAddFolder render')
    if(this.state.hasError){
      return <h2>Error with AddFolder</h2>
    }
    console.log('mad ie')
    return this.props.children
  }
}

export default ErrorAddFolder