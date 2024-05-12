import { configureStore } from '@reduxjs/toolkit'
import menuReducer, { MenuState } from './menuReducer'

export interface StoreInterface {
    menu: MenuState
}

const store = configureStore({
    reducer: {
        menu: menuReducer,
    },
})

export default store
