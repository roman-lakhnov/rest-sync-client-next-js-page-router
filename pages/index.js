// pages/index.js

// Імпортуємо компоненти з бібліотек
import NavBar from '@/components/NavBar'
import Link from 'next/link'
import { Button, Col, Container, Row } from 'react-bootstrap'

// Головна сторінка
export default function Home({ selectedPerson }) {
	const handleDownload = () => {
		window.location.href = '/cert/cert.pem' // посилання на серверний файл
	}

	return (
		<div>
			{/* Відображення верхнього меню навігації */}
			<NavBar selectedPerson={selectedPerson} />
			{/* Контейнер з вмістом сторінки */}
			<Container className='mt-5'>
				{/* Секція з головним вмістом сторінки */}
				<section className='hero'>
					{/* Заголовок */}
					<h1>Вітаємо у Реєстрі</h1>
					{/* Опис */}
					<p>
						Наш веб-клієнт дозволяє легко створювати та шукати записи в
						електронному реєстрі. Ви можете виконувати такі дії:
					</p>
					{/* Список можливостей */}
					<ul>
						<li>
							Додати нову особу до реєстру, надавши детальну особисту
							інформацію.
						</li>
						<li>
							Шукати існуючі записи, використовуючи часткові або повні дані.
						</li>
						<li>
							Переглядати детальну інформацію про конкретну особу за допомогою
							її унікального ідентифікатора.
						</li>
						<li>Через профіль особи редагувати або відаляти існуючі записи.</li>
					</ul>
					{/* Посилання на сторінки додавання та пошуку особи */}
					<p>
						Щоб почати, ви можете відвідати сторінку{' '}
						<Link href='/add-person'>Додати особу</Link> для створення нового
						запису або сторінку <Link href='/find-person'>Знайти особу</Link>{' '}
						для пошуку існуючих записів.
					</p>
					<p>
						Ми сподіваємось, що ви знайдете наш сервіс корисним та зручним у
						використанні.
					</p>

					<Row className='align-items-center mt-4'>
						<Col md='auto'>
							<p className='mb-0'>Щоб завантажити сертифікат натисніть сюди:</p>
						</Col>
						<Col md='auto'>
							<Button
								variant='secondary'
								href='/api/download'
								download='cert.pem'
							>
								Завантажити cert.pem
							</Button>
						</Col>
					</Row>
				</section>
			</Container>
		</div>
	)
}
