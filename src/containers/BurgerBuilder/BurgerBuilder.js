import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        // sum up all the values or the ingredientsd value
        // turn ingredients into an array of values
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
            // use reduce to turn it into a single number
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 })
        //console.log(ingredients)
        //console.log(sum)
    }

    addIngredients = type => {
        const oldCount = this.state.ingredients[type];
        // console.log((oldCount))
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredients = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        // console.log((oldCount))
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = (e) => {
        this.setState({ purchasing: true });
        e.preventDefault();
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        alert('You continue!')
    }
    render() {
        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            // console.log(disableInfo[key])
            disableInfo[key] = disableInfo[key] <= 0
        }
        //console.log(disableInfo)
        // {salad:true, meat:false....} - true for disable
        // this.updatePurchaseState();
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredients}
                    ingredientRemove={this.removeIngredients}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;