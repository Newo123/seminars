import { ISeminar } from '@/types/seminar';
import axios, { AxiosResponse } from 'axios';

const $api = axios.create({
	baseURL: 'http://localhost:3000/api',
});

class SeminarService {
	// метод получения семинаров
	async getAll(): Promise<ISeminar[]> {
		return $api
			.get<any, AxiosResponse<ISeminar[]>>('/seminars')
			.then(response => response.data);
	}
	// метод обновления семинара
	async updateById(payload: ISeminar): Promise<{ message: string }> {
		return $api.put(`/seminars/${payload.id}`, payload);
	}

	// метод удаления семинара
	async deleteById(id: number): Promise<{ message: string }> {
		return $api.delete(`/seminars/${id}`);
	}
}

export const seminarService = new SeminarService();
