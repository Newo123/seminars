export interface ISeminar {
	id: number;
	title: string;
	description: string;
	photo: string;
	date: string;
	time: string;
}

export interface ISeminarUpdate
	extends Omit<ISeminar, 'id' | 'date' | 'time'> {}
