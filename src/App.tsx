import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Seminars } from './components/Seminars';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Seminars />
		</QueryClientProvider>
	);
}
