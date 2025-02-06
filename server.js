import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs-extra';

const app = express();
const PORT = 3000;
const filePath = './seminars.json';

app.use(bodyParser.json());
app.use(cors());

app.get('/api/seminars', async (req, res) => {
	try {
		const file = await fs.readJson(filePath);
		res.status(200).json(file.seminars);
	} catch (error) {
		return res.status(500).json({ message: 'Error reading seminars.json' });
	}
});

app.put('/api/seminars/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;

		const file = await fs.readJson(filePath);
		const index = await file.seminars.findIndex(seminar => seminar.id === id);

		if (index === -1) {
			return res.status(404).json({ message: 'Семинар не найден' });
		}

		file.seminars[index] = await { ...file.seminars[index], ...data, id };

		await fs.writeJson(filePath, file, { spaces: 2 });

		res.status(200).json({ message: 'Семинар успешно обновлен' });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
});

app.delete('/api/seminars/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const file = await fs.readJson(filePath);

		const index = await file.seminars.findIndex(seminar => seminar.id === id);

		if (index === -1) {
			res.status(404).json({ message: 'Семинар не найден' });
		}

		file.seminars.splice(index, 1);

		await fs.writeJson(filePath, file, { spaces: 2 });

		res.status(200).json({ message: 'Семинар успешно удален' });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
});

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
});
