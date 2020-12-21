import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';


const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{testTransform: 'captilize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            );
        })


    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your buger have following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Success' clicked={props.puchaseContinued}>CONTINUE</Button>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
        </Aux>
    );
}

export default orderSummary;