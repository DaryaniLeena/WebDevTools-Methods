import { React, useState } from "react";
import ReactDOM from "react-dom";
import { getSearchedMovie } from "../../services/service";
import { useHistory } from "react-router-dom";
import "./Search.css";

function Searchform() {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        const query = e.target.value;
        console.log(query);
        setSearchTerm(query);
        if (query.length >= 2) {
            history.push(`/search/${query}`);
        } else if (query.length === 0) {
            history.push(`/`);
        }
    };

    //   React.useEffect(() => {
    //     getSearchedMovie(searchTerm)
    //     .then((results) => {
    //         setSearchResults(results);
    //     })
    //     .catch((err) => console.log("error in search"));
    //   }, [searchTerm]);
    return (
        <input
            type="text"
            placeholder="Search by movie title"
            onChange={handleChange}
            value={searchTerm}
            className="search-input"
        />

        // <div className="App">
        //   <input
        //     type="text"
        //     placeholder="Search"
        //     value={searchTerm}
        //     onChange={handleChange}
        //   />
        //   <ul>
        //     {searchResults.map(item => (
        //       <li>{item}</li>
        //     ))}
        //   </ul>
        // </div>
    );
}
export default Searchform;
