// Seachbar.js
import { useContext } from 'react'
import { SearchContext } from "../context/SearchContext";

function SearchBar(props) {
	let {term, handleSearch} = useContext(SearchContext);

	return (
		<form onSubmit={(e) => handleSearch(e, term.current.value)}>
			<input
                ref={term}
				type="text"
				placeholder="Enter a search term here"
			/>
			<input type="submit" />
		</form>
	);
}

export default SearchBar;
