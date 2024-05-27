// components/NavBar.js
import Link from 'next/link'
import { Container, Nav, Navbar } from 'react-bootstrap'

const NavBar = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Container>
				<Navbar.Brand href='/'>Электронний реєстр</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Link className='nav-link' href={'/'}>Головна</Link>
						<Link className='nav-link' href={'/add-person'}>Додати особу до реєстру</Link>
						<Link className='nav-link' href={'/find-person'}>Знайти особу в реєстрі</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default NavBar
