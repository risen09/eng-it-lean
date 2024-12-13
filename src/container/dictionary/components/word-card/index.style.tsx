import styled from "@emotion/styled";

export const WordCardStyled = styled.button`
	--bg-color: rgb(255, 255, 255);

  display: flex;
  text-align: start;
  flex-direction: column;
  background-color: var(--bg-color);
  width: 550px;
  padding: 20px;
  margin: 5px;
	border: solid var(--bg-color);
	border-radius: 15px;
  filter: drop-shadow(5px 5px 5px rgba(180, 180, 180, 0.4));
	
	&:hover {
		--bg-color: rgb(127, 127, 127);
	}

	&:active {
		--bg-color: rgb(63, 63, 63);
`;

export const WordCardTitle = styled.h3`
  margin: 0;
`;
