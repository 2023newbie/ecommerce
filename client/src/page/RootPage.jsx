import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from '../components/share/Navbar/Navbar'
import Footer from '../components/share/Footer/Footer'
import Message from '../components/share/Popup/Message'
import Loader from '../components/share/Loader/Loader'

const RootPage = () => {
  const navigation = useNavigation()
  const isLoad = navigation.state === 'loading'

  return (
    <>
      {isLoad && <Loader />}
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
      <Message />
      <Footer />
    </>
  )
}

export default RootPage
