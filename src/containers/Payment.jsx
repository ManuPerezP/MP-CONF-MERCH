import React, {useContext} from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from '../context/AppContext';

import '../styles/components/Payment.css';

const Payment = ({history}) => {
        const {state, addNewOrder} = useContext(AppContext);
        const {cart, buyer} = state;

    const payPalOptions = {
        clientId: 'access_token$sandbox$545rnyg8bph7ns3f$47b58e5a888460f6b57a37cc45f810ac',
        intent: 'capture',
        currency: 'USD'
    }

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect'
    }

    const handlePaymentSuccess = (data) =>{
        console.log(data);
        if(data.status === 'COMPLETED'){
            const newOrder = {
                buyer,
                product: cart,
                payment: data
            }

            addNewOrder(newOrder);
            history.push('/checkout/success');
        }
    }

    const handleGo = ()=>{

        const newOrder = {
            buyer,
            product: cart
        }

        addNewOrder(newOrder);

        history.push('/checkout/success');
    }

    const handleSumTotal = ()=>{
        const reducer = ( accumulator, currentValue )=>accumulator + currentValue.price;
        const sum = cart.reduce(reducer,0);
        return sum;
    }

    return(
            <div className="Payment">
                <div className="Payment-content">
                    <h3>Resumen del pedido:</h3>
                    {
                        cart.map((item)=>(
                            <div className="Payment-item" key={item.title}>
                                <div className="Payment-element">
                                    <h4>{item.title}</h4>
                                    <span>$&nbsp;{item.price}</span>
                                </div>
                            </div>
                        ))
                    }
                    <div className="Payment-button">
                        <PayPalButton 
                            paypalOptions={payPalOptions}
                            buttonStyles={buttonStyles}
                            amount={handleSumTotal()}
                            onPaymentStart={()=>console.log('start payment')}
                            onPaymentSuccess={data=>handlePaymentSuccess(data)}
                            onPaymentError={error=>console.log(error)}
                            onPaymentCancel={data=>console.log(data)}
                        />

                        <button type='button' onClick={handleGo}> Go</button>
                    </div>
                </div>
            </div>
    )
        
}

export default Payment;