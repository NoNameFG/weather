import Header from '../Header/Header.jsx'

const withHeader = Component => (props) => (
  <>
    <Header/>
    <Component {...props}/>
  </>
)

export default withHeader
