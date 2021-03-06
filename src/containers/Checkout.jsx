import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppContext from '../context/AppContext';
import '../styles/components/Checkout.css';

const Checkout = () => {
    const {state, removeFromCart } = useContext(AppContext);
    const {cart } = state;

    const handleRemove = product =>()=>{
        removeFromCart(product);
    }

    const handleSumTotal = ()=>{
        const reducer = ( accumulator, currentValue )=>accumulator + currentValue.price;
        const sum = cart.reduce(reducer,0);
        return sum;
    }
 
    return(
        <>
        <Helmet>
            <title>Lista de Pedidos</title>
        </Helmet>
  <div className="Checkout">
    <div className="Checkout-content">
      <h3>{cart.length > 0 ? 'Lista de Pedidos:':'Aun no tienes productos en tu carro...'}</h3>
        {cart.map(item=>(
            <div className="Checkout-item">
              <div className="Checkout-element">
                 <h4>{item.title}</h4>
                 <span>$&nbsp;{item.price}</span>
              </div>
             {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type="button" onClick={handleRemove(item)}>
              <i className="fas fa-trash-alt" />
            </button>
        </div>))}


    </div>
    {cart.length > 0 && (
            <div className="Checkout-sidebar">
            <h3>{`Precio Total: $ ${handleSumTotal()}`}</h3>
            <Link to="/checkout/information">
              <button type="button">Continuar Pedido</button>
            </Link>
          </div>
    )}

  </div>
  </>
  )
}

export default Checkout;
