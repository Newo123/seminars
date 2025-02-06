import { ISeminar } from '../types/seminar';
import { ModalState } from './Seminars';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import placehoder from '/public/placehoder.png';

export function SeminarsItem(
	seminar: ISeminar & { setOpen: (property: ModalState) => void }
) {
	return (
		<Card className='flex flex-col'>
			<CardHeader>
				<CardTitle>{seminar.title}</CardTitle>
				<CardDescription>
					{seminar.date} в {seminar.time}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex-grow'>
				<img
					src={seminar.photo || placehoder}
					alt={seminar.title}
					width={750}
					height={730}
					className='w-full h-48 object-cover mb-4 rounded-md'
				/>
				<p>{seminar.description}</p>
			</CardContent>
			<CardFooter className='gap-3'>
				<Button
					className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors'
					onClick={() =>
						seminar.setOpen({ isOpen: true, who: 'form', seminar })
					}
				>
					Редактировать
				</Button>

				<Button
					className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors'
					onClick={() =>
						seminar.setOpen({ isOpen: true, who: 'confirmation', seminar })
					}
				>
					Удалить
				</Button>
			</CardFooter>
		</Card>
	);
}
