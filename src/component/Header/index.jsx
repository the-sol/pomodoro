import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import styles from './Header.module.css'
import PomoLogo from '../../Logo/PomoLogo.png'
import SettingLogo from '../../Logo/SettingLogo.png'
import LoginLogo from '../../Logo/LoginLogo.png'

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Image className={styles.pomo_logo} src={PomoLogo} rounded />
      <Navbar.Brand href="#home">TheSol-pomodoro</Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Image className={styles.setting_logo} src={SettingLogo} rounded />
        <Nav.Link href="#setting">Setting</Nav.Link>
        <Image className={styles.login_logo} src={LoginLogo} rounded />
        <Nav.Link href="#login">Login</Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
