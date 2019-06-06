import { createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'

import { rootReducer } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {}


export default () => {
    return createStore(rootReducer, initialState, composeWithDevTools(
                // applyMiddleware(...middleware) // to add other middleware
        )
    )
}
