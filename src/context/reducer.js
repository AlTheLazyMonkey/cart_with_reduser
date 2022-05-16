import { AUMENTA_QTY, CONTATORE, COSTO_TOTALE, DATA_FETCHING_FAIL, DATA_FETCHING_STARTED, DATA_FETCHING_SUCCESS, DELETE_ITEM, DIMINUISCI_QTY, SVUOTA_CARRELLO } from "./actions";

const reducer = (state, { type, payload }) => {
  if (type === DATA_FETCHING_STARTED) return { ...state, isLoading: true };
  else if (type === DATA_FETCHING_SUCCESS) return { ...state, isLoading: false, isError: false, products: payload.map(e => { return { ...e, qty: 1 }; }) };
  else if (type === DATA_FETCHING_FAIL) return { ...state, isLoading: false, isError: true };
  else if (type === SVUOTA_CARRELLO) return { ...state, products: [] };
  else if (type === DELETE_ITEM) return { ...state, products: state.products.filter(e => e._id !== payload) };
  else if (type === AUMENTA_QTY) return { ...state, products: state.products.map(e => { return e._id === payload ? { ...e, qty: e.qty++} : e; }) };
  else if (type === DIMINUISCI_QTY) return { ...state, products: state.products.map(e => { return e._id === payload ? { ...e, qty: e.qty--} : e; }) };
  else if (type === COSTO_TOTALE) return { ...state, total: state.products.reduce((c, v) => (c + v.qty * v.price), 0)}
  else if (type === CONTATORE) return { ...state, itemCounter: state.products.reduce((c, v) => (c + v.qty), 0)}
  return state;
};

export default reducer;
