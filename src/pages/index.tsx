import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import techsImage from '../../public/images/techs.svg'
export default function Home() {
	return (
		<>
			<Head>
				<title>PizzoSoft</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.containerHeader}>
					<section className={styles.ctaText}>
						<h1>Levando você ao  próximo nivel</h1>
						<span>Uma plataforma bla bla bla</span>

						<Link href=''>
							<button>
								Começar agora
							</button>
						</Link>

					</section>
					<img src="/images/banner-conteudos.png" alt="Banners" />
				</div>
				<hr className={styles.divisor} />

				<div className={styles.sectionContent}>
					<section>
						<h2>Primeiro Link PizzoSoft</h2>
						<span>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</span>
					</section>

					<img src="/images/financasApp.png" alt="Conteúdos Mobile" />
				</div>

				<hr className={styles.divisor} />

				<div className={styles.sectionContent}>
					<img src="/images/webDev.png" alt="Conteúdos Mobile" />

					<section>
						<h2>Segundo Link PizzoSoft</h2>
						<span>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...</span>
					</section>

				</div>

				<div className={styles.nextLevelContent}>
					<Image src={techsImage} alt='Techs Image' />

					<h2>
						Mais de <span className={styles.alunos}>15 mil</span> já levaram a sua carreira ao próximo nível.
					</h2>
					<span>Why do we use it?</span>

					<Link href=''>
						<button>
							Começar agora!
						</button>
					</Link>
				</div>
			</main>
		</>
	)
}
