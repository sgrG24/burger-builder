import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


const INGRIDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0, 
            cheese: 0
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0)
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGRIDIENTS_PRICE[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice})
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGRIDIENTS_PRICE[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice})
        this.updatePurchasable(updatedIngredients);
    }


    render() {
        const disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;