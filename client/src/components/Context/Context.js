import React,{useReducer} from 'react';

  //TO add Items to Cart
  const addItems = (items = [], payload,id) => {
        let check = items.some( item => item.id === id);
        check === true ? payload.quantity = payload.quantity + 1 : items.push(payload)  
        return items;
  };


  //To Increase Quantity of each item
  const incQuantity = (items = [],payload, id)=>{
    const newItems = items.map(item => item);
    const isOnTheList = !newItems.includes(id)
    if(isOnTheList){
      newItems.map((e)=> { return e.id === id ? (e.quantity= e.quantity + 1) : ' ' })
    }
    return newItems
  }



  //To decrease the Quantity of the each item and to remove the item if Quantity is 1
  const decQuantity = (items = [],id)=>{
    const newItems = items.map(item => item);
    newItems.map((e,index)=>{ return e.id === id && e.quantity >= 2 ? e.quantity = e.quantity - 1 
                                      : (e.id === id && (e.quantity === 0 || e.quantity === 1)) ? newItems.splice(index,1) 
                                      : ' '
    });
    return newItems
  }

  //To display the Total amount of the Cart
  const cartTotal = (items = [],id, payload)=>{
    const newItems = items.map(item => item);
    const newValue = newItems.map(item => item.price * item.quantity);
    const Total = newValue.reduce((prev, next) => prev + next)
    return Total
  }
  
  //To decrease the Total value of the cart when dec Item Quantity
  const decItemsTotal = (items= [],id,total)=>{
    const newItems = items.map(item => item);
    const subValue = newItems.map(e=>{return e.id ===id ? e.price: 0});
    const newSub = total - subValue.find(e=>e>1);
    return newSub;
  }

  //To inc the Total value of the cart when inc Item Quantity
  const incItemsTotal = (items=[],id,total)=>{
    const newItems = items.map(item => item);
    const checkQuan = newItems.map(e=>{return (e.id===id &&e.quantity>1) ? (total = total + e.price) : 0})
    return total
  }


let reducer = (state, action) => {
    switch (action.type) {
      case "onclick_cart":
        console.log("cart",state)
        return { ...state,
            count: state.count+1,
            items: addItems(state.items, action.product,action.id),
            total: cartTotal(state.items,action.id, action.product)};
      case "onclick_plus":
        return{...state,
          count:state.count+1,
          items: incQuantity(state.items,action.product,action.id),
          total:incItemsTotal(state.items,action.id,state.total)
        };
      case "onclick_minus":
        return{...state,
          count: state.count-1,
          items: decQuantity(state.items,action.id),
          total: decItemsTotal(state.items,action.id,state.total)
        };
      case "onclick_quickview":
        return{...state,
          items: action.product
        }
      default:
        return state;
    }
  };
 

const initialState = {
    count:0,
    items: [],
    total:0
}

const CounterContext = React.createContext(null);

function CounterProvider(props){

    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <CounterContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CounterContext.Provider>
    );
}

export { CounterContext, CounterProvider };
