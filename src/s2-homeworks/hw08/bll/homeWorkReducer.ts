import {UserType} from "../HW8";

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }



export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            // sort() создаёт новый массив? или нужно в ручную?...
            let copyState=[...state]

            if (action.payload==='up'){
               return  copyState.sort(function(a, b){
                   let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                   if (nameA < nameB) //сортируем строки по возрастанию
                       return -1
                   if (nameA > nameB)
                       return 1
                   return 0 // Никакой сортировки
               })
            }
            if (action.payload==='down'){
                return  copyState.sort(
                    function(a, b){
                        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                        if (nameA < nameB) //сортируем строки по возрастанию
                            return -1
                        if (nameA > nameB)
                            return 1
                        return 0 // Никакой сортировки
                    }
                ).reverse()
            }

            return copyState // need to fix
        }
        case 'check': {
            // filter() создаёт новый массив? или нужно в ручную?...
            return state.filter(el=>el.age>action.payload) // need to fix
        }
        default:
            return state
    }
}
