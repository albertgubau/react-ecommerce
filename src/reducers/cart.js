//----------------------------USEREDUCER--------------------------------
// Para ello necesitamos el estado inicial y un reducer
// El estado incial puede ser cualquier cosa (array, objeto, etc.)
export const cartInitialState =
  JSON.parse(window.localStorage.getItem("cart")) || [];

export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

export const updateLocalStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};

//El reducer transforma un estado dada una acción y devuelve otro estado
export const cartReducer = (state, action) => {
  //Destructuring de la action para tener el tipo y el payload
  const { type: actionType, payload: actionPayload } = action;
  //Hacemos switch segun la acción, en este caso añadir a carrito
  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      //Destructuring del id a partir del payload
      const { id } = actionPayload;
      //Encontramos si el producto ya esta en el carrito
      const productInCartIndex = state.findIndex((item) => item.id === id);

      //Si hemos encontrado el producto entonces develvemos un nuevo estado (nuevo carrito con cantidad actualizada de  ese producto)
      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1; //Copia profunda del carrito
        return newState;
      }

      //Si el producto no está en el carrito
      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ];
      updateLocalStorage(newState);
      return newState;
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      //Destructuring del id a partir del payload
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState);
      return newState;
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorage(cartInitialState);
      return cartInitialState;
    }
  }
};
//----------------------------------------------------------------------
