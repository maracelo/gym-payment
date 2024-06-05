import { useState, useEffect } from "react";
import { SearchBarIcon, SearchBar as SearchBarS, NoResult } from "./styled";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

import ChangeEventInput from "../../types/ChangeEventInput";
import { setSearchList } from "../../redux/reducers/searchListReducer";
import useAppSelector from "../../redux/typedUseSelectorHook";
import getSearchList from "../../helpers/getSearchList";
import { setSearch } from "../../redux/reducers/searchReducer";

function SearchBar(){
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const accessTState = useAppSelector(state => state.accessToken);

  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [inputSearchValue, setInputSearchValue] = useState<string>('');
  const [noResult, setNoResult] = useState<boolean>(false);
  const [currTimeout, setCurrTimeout] = useState<null|NodeJS.Timeout>(null); 

  useEffect(() =>{
    document.body.addEventListener('click', (e: any) =>{
      if(!e.target.id || (e.target.id !== 'searchBar' && e.target.id !== 'searchIcon')){
        setShowSearchBar(false);
      }
    });
  }, []);

  const handleShowSearchBar = () =>{
    setShowSearchBar(!showSearchBar);
    (document.querySelector('#searchBar') as HTMLElement).focus();
  };

  const handleSearchBarChange = async (e: ChangeEventInput) =>{
    setInputSearchValue(e.target.value);
    dispatch( setSearch(e.target.value) );
    if(currTimeout) clearTimeout(currTimeout);

    if(e.target.value !== ''){
      const timeout = setTimeout(async () =>{
        const refreshToken = cookies.get('RefreshToken');

        const users = await getSearchList(e.target.value, accessTState.accessToken, refreshToken);
        dispatch( setSearchList(users) );
    
        if(users.length > 0) setNoResult(false);
        else setNoResult(true);
      }, 1000);

      setCurrTimeout(timeout);
    }else{
      setNoResult(false);
      dispatch( setSearchList([]) );
    }
  };

  return (
    <>
      <SearchBarS
        id="searchBar"
        className={showSearchBar ? 'show' : ''}
        value={inputSearchValue} onChange={handleSearchBarChange}
        placeholder="Type a name"
      />
      {noResult && showSearchBar && <NoResult>No result</NoResult>}
      <SearchBarIcon
        id='searchIcon'
        className={showSearchBar ? 'show' : ''}
        src={import.meta.env.VITE_BASE_URL + "assets/images/search.png"}
        alt="search icon"
        onClick={handleShowSearchBar} />
    </>
  );
}

export default SearchBar;