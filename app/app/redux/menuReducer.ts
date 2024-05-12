import { TOGGLE_MENU } from './consts'
import { MenuAction } from './actions'

export interface MenuState {
    isOpen: boolean
}

const initialState: MenuState = {
    isOpen: false,
}

const menuReducer = (
    state: MenuState = initialState,
    action: MenuAction
): MenuState => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                isOpen: !state.isOpen,
            }
        default:
            return state
    }
}

export default menuReducer
