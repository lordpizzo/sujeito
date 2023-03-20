import styles from './styles.module.scss'
import logo from '../../../public/images/PizzoSoft_final.png'
import Image from 'next/image'
import Link from 'next/link'
import ActiveLink from '../ActiveLink'


export default function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href='/'>
					<Image src={logo} alt='pizzosoft' />
				</Link>
				<nav>
					<ActiveLink href='/' activeClassName={styles.active}>
						Home
					</ActiveLink>
					<ActiveLink href='/posts' activeClassName={styles.active}>
						Conteúdos
					</ActiveLink>
					<ActiveLink href='/sobre' activeClassName={styles.active}>
						Quem Somos
					</ActiveLink>
				</nav>
				<Link className={styles.readybutton} type='button' href="/">
					Solicite um Orçamento
				</Link>
			</div>
		</header>
	)
}