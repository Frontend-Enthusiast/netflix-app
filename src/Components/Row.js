import axios from './axios';
import React, { useEffect, useState } from 'react'
import './Row.css'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const handleClick = async (movie) => {
    if (trailerUrl) { setTrailerUrl('') }
    else {
      await movieTrailer(movie?.title || "").then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      }
      ).catch((error) => console.log(error));
    }
  };
  const opts = {
    height: "390",
    width: "99%",
    palyerVars: {
      autoPlay: 0,
    }
  }
  const base_url = "https://image.tmdb.org/t/p/original";
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img onClick={() => { handleClick(movie) }} className={`row__poster ${isLargeRow && 'large__poster'}`}
            key={movie.id} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}></img>
        ))}
      </div>
      <div>{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}</div>
    </div>
  )
}

export default Row