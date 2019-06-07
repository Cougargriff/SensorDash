import { createStore } from 'redux'
import { rootReducer } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'



const initialState = {
   
}


export default () => {
    return createStore(rootReducer, initialState, composeWithDevTools(
            //{trace: true, traceLimit: 25}
                // applyMiddleware(...middleware) // to add other middleware
        )
    )
}
