import { jest } from '@jest/globals';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
	return {
		...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
		  useParams: jest.fn().mockReturnValue(1),
		useNavigate: () => mockNavigate,
	};
		
});
