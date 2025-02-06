import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { useSeminarMutation } from '../hooks/useSeminarMutation';
import { seminarService } from '../services/SeminarService';
import { ISeminar, ISeminarUpdate } from '../types/seminar';
import { Form } from './Form';
import { SeminarsItem } from './SeminarsItem';
import { Spinner } from './Spinner';
import { Button } from './ui/button';

export type ModalState = {
	isOpen: boolean;
	who: 'form' | 'confirmation';
	seminar?: ISeminar;
};
export function Seminars() {
	// seminarService.getAll - метод получения всех семинаров.
	const {
		data: seminars,
		isPending,
		error,
	} = useQuery({
		queryKey: ['seminars'],
		queryFn: seminarService.getAll,
	});

	const [open, setOpen] = useState<ModalState>({
		isOpen: false,
		who: 'form',
	});

	// кастомный hook для мутаций обновлени и удаления
	const { mutationDeleteById, mutationUpdateById } = useSeminarMutation();

	const { handleSubmit, formState, register, reset } = useForm<ISeminarUpdate>({
		mode: 'onBlur',
	});

	// обработчик сабмита на обновление формы
	const onSubmit = ({ description, photo, title }: ISeminarUpdate) => {
		if (!open.seminar) return;
		mutationUpdateById.mutate(
			{ ...open?.seminar, title, description, photo },
			{
				onSuccess: () => {
					setOpen({ isOpen: false, who: 'form' });
					reset();
				},
			}
		);
	};

	// обработчик клика на удаление семинара
	const onDelete = () => {
		if (!open.seminar?.id) return;
		mutationDeleteById.mutate(open.seminar?.id, {
			onSuccess: () => {
				setOpen({ isOpen: false, who: 'confirmation' });
			},
		});
	};

	// до получения данных из useQuery видим спинер
	if (isPending) {
		return <Spinner />;
	}
	// кейс ошибка useQuery
	if (error) {
		return (
			<div className='text-2xl text-red-600 w-full h-screen flex items-center justify-center'>
				Error: {error.message}
			</div>
		);
	}

	return (
		<>
			<div className='container py-10'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{seminars.map(seminar => (
						<SeminarsItem key={seminar.id} {...seminar} setOpen={setOpen} />
					))}
				</div>
			</div>
			{open.isOpen && (
				<ReactModal
					isOpen={open.isOpen}
					appElement={document.body}
					style={{
						overlay: {
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						},
						content: {
							position: 'relative',
							inset: 'initial',
							background: 'white',
						},
					}}
				>
					{open.who === 'form' && open.seminar ? (
						<Form
							onSubmit={handleSubmit(onSubmit)}
							formState={formState}
							setOpen={setOpen}
							register={register}
							{...open.seminar}
						/>
					) : (
						<div className='flex flex-col gap-4'>
							<h5>Вы действительно хотите удалить семинар?</h5>
							<div className='flex items-center justify-center gap-8'>
								<Button
									type='button'
									variant='outline'
									onClick={() =>
										setOpen({ isOpen: false, who: 'confirmation' })
									}
								>
									Отмена
								</Button>
								<Button onClick={onDelete}>Принять</Button>
							</div>
						</div>
					)}
				</ReactModal>
			)}
		</>
	);
}
