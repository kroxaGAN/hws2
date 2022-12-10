const initState = {
    themeId: 1,
}
type statePropsType={
    themeId: number
}

export const themeReducer = (state:statePropsType = initState, action: changeThemeIdType): statePropsType => { // fix any
    switch (action.type) {
        // дописать
        case "SET_THEME_ID":{
            return {...state, themeId:action.id}
        }
        default:
            return state
    }
}

type changeThemeIdType=ReturnType<typeof changeThemeId>
export const changeThemeId = (id: number) => ({ type: 'SET_THEME_ID', id } as const) // fix any
