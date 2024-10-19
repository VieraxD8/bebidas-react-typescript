import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { RecipeSliceType, createRecipesSlice } from "./recipeSlice";
import { NotificacionSliceType, createNotificationSlice } from "./notificationSlice";


export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe)  => void
    favoriteExistes: (id: Recipe['idDrink']) => boolean
    loadFromStorage: ()  => void

}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipeSliceType & NotificacionSliceType, [], [], FavoritesSliceType> = (set, get, api) =>  ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        
        if(get().favoriteExistes(recipe.idDrink)){
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink )
            }))
            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Se elimino de favoritos', 
                error: false
            })
        }else {
           
            set( (state)  => ({
                favorites: [ ...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Se agrego a favoritos', 
                error: false
            })
        }
        createRecipesSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExistes: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')

        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})

// Slice Pattern 


