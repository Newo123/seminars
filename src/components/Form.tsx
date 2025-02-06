import { FormEventHandler } from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { ISeminarUpdate } from '../types/seminar';
import { ModalState } from './Seminars';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface IProps extends ISeminarUpdate {
	onSubmit: FormEventHandler<HTMLFormElement> | undefined;
	register: UseFormRegister<ISeminarUpdate>;
	formState: FormState<ISeminarUpdate>;
	setOpen: (data: ModalState) => void;
}

export function Form({
	onSubmit,
	register,
	formState,
	title,
	description,
	photo,
	setOpen,
}: IProps) {
	return (
		<form onSubmit={onSubmit} className='space-y-4 min-w-[350px]'>
			<h3 className='text-xl font-semibold mb-4'>Редактирование</h3>
			<div className='space-y-2'>
				<Label htmlFor='title'>Заголовок</Label>
				<Input
					id='title'
					{...register('title', {
						required: true,
					})}
					defaultValue={title}
					disabled={formState.isSubmitting}
				/>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='photo'>Фото</Label>
				<Input
					id='photo'
					{...register('photo', {
						required: true,
					})}
					defaultValue={photo}
					disabled={formState.isSubmitting}
				/>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='description'>Описание</Label>
				<Input
					id='description'
					{...register('description', {
						required: true,
					})}
					defaultValue={description}
					disabled={formState.isSubmitting}
				/>
			</div>
			<div className='flex justify-end space-x-2'>
				<Button
					type='button'
					variant='outline'
					disabled={formState.isDirty || formState.isSubmitting}
					onClick={() => setOpen({ isOpen: false, who: 'form' })}
				>
					Отмена
				</Button>
				<Button
					type='submit'
					disabled={formState.isSubmitting || !formState.isDirty}
				>
					Редактировать
				</Button>
			</div>
		</form>
	);
}
