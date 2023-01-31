import {Fragment} from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/categorry-preview/category-preview.component";
import { selectCategoriesMap, selectIsCategoriesLoading } from "../../store/categories/category.selector";
import Spinner from "../../components/spine/spiner.component";

const CategoriesPreview = () =>{
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading)
    
    return (
       <Fragment>
        { isLoading ? (<Spinner/>) :( Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products}/>
                );
            })
        )}
       </Fragment>
    )
}

export default CategoriesPreview;