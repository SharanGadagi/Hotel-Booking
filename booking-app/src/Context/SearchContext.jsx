import { createContext,useReducer } from "react"

const INITIAL_STATE={
    city:undefined,
    date:[],
    persons:{
        adult:undefined,
        children:undefined,
        room:undefined
    }
}

export const SearchContext=createContext(INITIAL_STATE);

const SearchReducer=(state,action)=>{
    switch(action.type){
        case "NEW_-SEARCH":
            return action.payload;
            case "RESET_SEARCH":
                return INITIAL_STATE;
                default:
                    return state
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  
    return (
      <SearchContext.Provider
        value={{
          city: state.city,
          date: state.date,
          persons: state.persons,
          dispatch,
        }}
      >
        {children}
      </SearchContext.Provider>
    );
  };


