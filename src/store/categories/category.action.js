import { async } from "@firebase/util";
import { getCategoriesAndDocuments } from "../../routes/utils/firebase/firebase";
import { createAction } from "../../routes/utils/firebase/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.type";


export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
    
export const fetchCategoriesSuccess = (categoriesArray) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);  
