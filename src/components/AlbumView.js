// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])
    useEffect(() => {
        const API_URL = "https://itunes.apple.com/search?term=";
			const fetchData = async () => {
				const response = await fetch(API_URL+{id});
				const resData = await response.json();
                setAlbumData(resData.results)
				}
			fetchData()
		
	}, [id]);



    return (
        <div>
            <h2>The id passed was: {id}</h2>
            <p>{albumData.collectionName}</p>
        </div>
    )
}

export default AlbumView
