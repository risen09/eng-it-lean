import React from "react";
import AppRouter from "./container/main";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
		<>
			<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
			<AppRouter />
		</>
	);
};

export default App;
