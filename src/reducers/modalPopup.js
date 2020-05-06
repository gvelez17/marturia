const initialState = {
    isOpen: false,
    message: ''
}

const modal = (state = initialState, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {isOpen: true, message: action.message}
        case 'CLOSE_MODAL':
            return {isOpen: false, message: action.message}
        default:
            return {isOpen: false, message: ''}
    }
      
}

export default modal;