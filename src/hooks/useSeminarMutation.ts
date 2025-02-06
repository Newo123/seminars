import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { seminarService } from '../services/SeminarService';
import { ISeminar } from '../types/seminar';

export function useSeminarMutation() {
	const queryClient = useQueryClient();

	// каждый раз после успешной мутации вызывается ревалидация семинаров и обновление состояния
	const mutationUpdateById = useMutation({
		mutationFn: (payload: ISeminar) => seminarService.updateById(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['seminars'] });
		},
		onError: error => {
			if (error instanceof AxiosError) {
				alert(error.response?.data.message);
			}
		},
	});
	const mutationDeleteById = useMutation({
		mutationFn: (id: number) => seminarService.deleteById(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['seminars'] });
		},
		onError: error => {
			if (error instanceof AxiosError) {
				alert(error.response?.data.message);
			}
		},
	});

	return { mutationUpdateById, mutationDeleteById };
}
