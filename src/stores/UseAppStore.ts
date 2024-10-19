import { create } from 'zustand'
import { RecipeSliceType, createRecipesSlice } from './recipeSlice'
import { devtools } from 'zustand/middleware'
import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice'
import { NotificacionSliceType, createNotificationSlice } from './notificationSlice'

export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificacionSliceType >()(devtools((...a) => ({

    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)

})))