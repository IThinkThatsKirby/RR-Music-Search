import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
// import { Fragment } from "react/cjs/react.production.min";
import React, { Suspense } from "react";
import Loading from "./components/Loading.js";
import { SearchContext } from "./context/SearchContext";
import { useRef } from "react";
import { DataContext } from "./context/DataContext";

function App() {
	let searchInput = useRef("");
	let [search, setSearch] = useState("");
	let [message, setMessage] = useState("Search for Music!");
	let [data, setData] = useState([]);

	const API_URL = "https://itunes.apple.com/search?term=";

	useEffect(() => {
		if (search) {
			const fetchData = async () => {
				document.title = `${search} Music`;
				const response = await fetch(API_URL + search);
				const resData = await response.json();
				if (resData.results.length > 0) {
					return setData(resData.results);
				} else {
					return setMessage("Not Found");
				}
			};
			fetchData();
		}
	}, [search]);

	const handleSearch = (e, term) => {
		e.preventDefault();
		setSearch(term);
	};

	const showGallery = () => {
		if (data) {
			return (
				<Suspense fallback={<Loading />}>
					<Gallery />
				</Suspense>
			);
		}
	};

	return (
		<div>
			{message}
			<Router>
				<Routes>
					<Route path={"/"}>
						<SearchContext.Provider
							value={{
								term: searchInput,
								handleSearch: handleSearch,
							}}
						>
							<SearchBar />
						</SearchContext.Provider>
						<DataContext.Provider value={data}>
							{showGallery()}
						</DataContext.Provider>
					</Route>
					<Route path="/album/:id">
						<AlbumView />
					</Route>
					<Route path="/artist/:id">
						<ArtistView />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
