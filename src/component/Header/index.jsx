import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import styles from './Header.module.css'
import PomoLogo from '../../Logo/PomoLogo.png'
import SettingLogo from '../../Logo/SettingLogo.png'
import LoginLogo from '../../Logo/LoginLogo.png'

const Header = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Image className={styles.Pomologo} src={PomoLogo} rounded />
                <Navbar.Brand href="#home">TheSol-pomodoro</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Image className={styles.Setlogo} src={SettingLogo} rounded />
                        <Nav.Link href="#setting">Setting</Nav.Link>
                        <Image className={styles.Loglogo} src={LoginLogo} rounded />
                        <Nav.Link href="#login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
