"use client";
import { useState, useEffect } from "react";
import UserButtonClick from "./components/UserButtonClick";
import InputHash from "./components/InputHash";

export default function Home() {
  const [films, setFilms] = useState<any[]>([]);
  const [optionData, setOptionData] = useState<any[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<any>({});
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [noOptionSelected, setNoOptionSelected] = useState<boolean>(true);
  const options = ["Characters", "Species", "Starships", "Vehicles", "Planets"];

  function handleFilmClick(film: any) {
    setNoOptionSelected(true);
    setLoadingData(true);
    setSelectedFilm(film);
    localStorage.setItem("Film", JSON.stringify(film));
  }

  async function handleFetch(option: string) {
    setLoadingData(true);
    setNoOptionSelected(false);
    const promises = selectedFilm[option].map((URL: string) =>
      fetch(URL).then((res) => res.json())
    );
    try {
      const data = await Promise.all(promises);
      setOptionData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    const savedFilm = JSON.parse(localStorage.getItem("Film") ?? "false");
    setSelectedFilm(savedFilm ?? {});
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <header className="header footer-center bg-neutral text-neutral-content p-10 text-4xl mb-10 rounded">
        Star Wars
      </header>
      {/* films */}
      <div className="flex">
        <div className="gap-4">
          <div className="place-self-center ml-5 text-2xl font-bold">Films</div>
          <div className="divider ml-9"></div>
          {films.map((film: any) => (
            <UserButtonClick
              key={film.title}
              selection={film}
              handleClick={handleFilmClick}
              className={"btn btn-block my-1 m-5 text-lg"}
              content={film.title}
            />
          ))}
        </div>
        <div className="gap-4">
          {/* options */}
          {selectedFilm && (
            <>
              <div className="place-self-center ml-20 text-2xl font-bold">
                {selectedFilm.title}
              </div>
              <div className="divider ml-20"></div>
              {options.map((option) => (
                <UserButtonClick
                  key={option}
                  selection={option.toLowerCase()}
                  handleClick={handleFetch}
                  className={"btn btn-block my-1 m-10 min-w-72 text-lg"}
                  content={option}
                />
              ))}
            </>
          )}
        </div>
        <div className="gap-4">
          {/* data */}
          {!loadingData ? (
            <div className="overflow-y-auto max-h-[50vh] m-10">
              <table className="table min-w-80">
                <tbody>
                  {optionData.map((option: any) => (
                    <tr key={option.name}>
                      <td>{option.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : noOptionSelected ? (
            <div className="w-96 h-96"></div>
          ) : (
            <div className="w-96 h-96 flex justify-center content-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
        </div>
      </div>
      {/* input */}
      <InputHash title={"Password"} />

      {/* footer */}
      <footer className="footer bg-neutral text-neutral-content p-10 mt-10">
        <nav className="mx-auto">
          <h6 className="footer-title mx-16">By Ezra Bales</h6>
          <p>Copyright © {new Date().getFullYear()} - Most rights reserved</p>
        </nav>
      </footer>
    </>
  );
}
