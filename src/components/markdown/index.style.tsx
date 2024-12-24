import styled from '@emotion/styled';

const mainColor = '#4caf50';
const borderColor = '#000000';

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 16px;
  overflow: hidden;
  border: none;
  background-color: ${mainColor};
  filter: drop-shadow(5px 5px 5px rgba(180, 180, 180, 0.8));
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid ${borderColor};

  &:not(:first-of-type) {
    border-left: none;
  }

  &:first-of-type {
    border-left: none;
  }

  &:last-of-type {
    border-right: none;
  }

  &:first-of-type ~ :first-of-type {
    border-top: none;
  }

  &:last-of-type ~ :last-of-type {
    border-bottom: none;
  }
`;

export const TableHead = styled(TableCell)`
	font-weight: bold;
`;

export const List = styled.ul`
	background-color: ${mainColor};
	border-radius: 15px;
  filter: drop-shadow(5px 5px 5px rgba(180, 180, 180, 0.8));
	padding-top: 5px;
	padding-bottom: 5px;

	ol {
		filter: none
	}

	ul {
		filter: none
	}

`;

export const NumberedList = styled.ol`
	// background-color: ${mainColor};
	// border-radius: 15px;
  // filter: drop-shadow(5px 5px 5px rgba(180, 180, 180, 0.8));
	// padding-top: 5px;
	// padding-bottom: 5px;

	// ol {
	// 	filter: none
	// }

	// ul {
	// 	filter: none
	// }

`;
