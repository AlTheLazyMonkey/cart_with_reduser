import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { AUMENTA_QTY, CONTATORE, COSTO_TOTALE, DATA_FETCHING_FAIL, DATA_FETCHING_STARTED, DATA_FETCHING_SUCCESS, DELETE_ITEM, DIMINUISCI_QTY, SVUOTA_CARRELLO } from "./actions";
import axios from "axios";
const url = "https://react--course-api.herokuapp.com/api/v1/data/cart";

const initialState = {
  products: [],
  isLoading: true,
  isError: false,
  total: 0,
  itemCounter: 0,
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // Utilizzo useReducer con state iniziale
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteItem = (_id) => {
    dispatch({ type: DELETE_ITEM, payload: _id });
  }

  const deleteAll = () => {
    dispatch({ type: SVUOTA_CARRELLO });
  }

  const aumentaQty = (_id) => {
    dispatch({ type: AUMENTA_QTY, payload: _id });
  }

  const diminuisciQty = (_id) => {
    dispatch({ type: DIMINUISCI_QTY, payload: _id });
  }

  useEffect(() => {
    dispatch({ type: CONTATORE });
    dispatch({ type: COSTO_TOTALE });
  }, [state.products]);

  // Data fetcing
  useEffect(() => { // Come funzione di useEffect non posso usare funzioni asincrone
    // IIFE Dichiaro una funzione che viene eseguita nel momento in cui viene dichiarata
    (async () => {
      dispatch({ type: DATA_FETCHING_STARTED });
      try {
        const response = await axios.get(url);
        dispatch({ type: DATA_FETCHING_SUCCESS, payload: response.data.data });
      } catch (err) {
        dispatch({ type: DATA_FETCHING_FAIL });
      }
    })();
  }, []);

  return <AppContext.Provider value={{ ...state, deleteItem, deleteAll, aumentaQty, diminuisciQty }}>
    {children}
  </AppContext.Provider>
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useGlobalContext };