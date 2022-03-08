import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

//pass our reducers to the Redux createStore function, which returns a store object. We then pass this object to the react-redux Provider component, which is rendered at the top of our component tree.
//This ensures that any time we connect to Redux in our app via react-redux connect, the store is available to our components.
import { createStore, applyMiddleware   } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
//Redux Thunk middleware allows to write action creators that //return a function instead of an action. The thunk can be used to
// delay the dispatch of an action, or to dispatch only if a certain condition is met.
import rootReducer from './stores/rootReducer';


import Tabs from "./navigation/tabs";

//app stack navigator 
const Stack = createStackNavigator();

//we need createStore function so that components are available to our app when loading
//then we need to connect the REdux components to navigation tab.js file
const store = createStore (
    rootReducer,
    applyMiddleware(thunk)
)

const App = () => {
    return (
        //The <Provider> component makes Redux store available to any nested components that need to access the Redux store. 
        //Since any React component in a React Redux app can be connected to the store, 
        //most applications will render a <Provider> at the top level, with the entire app's component tree inside of it
        <Provider store={store}> {/** this will allow our app access to tabAction & tabReducer.js files  */}
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'MainLayout'}
                >
                <Stack.Screen
                    name="MainLayout"
                    component={Tabs}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>     
    )
}
export default App;


//Most apps extend the functionality of their Redux store by adding middleware or store enhancers
// (note: middleware is common, enhancers are less common). 
//Middleware adds extra functionality to the Redux dispatch function; enhancers add extra functionality to the Redux store.
//We will add two middlewares and one enhancer:
//The redux-thunk middleware, which allows simple asynchronous use of dispatch.
//A middleware which logs dispatched actions and the resulting new state.
//An enhancer which logs the time taken for the reducers to process each action.