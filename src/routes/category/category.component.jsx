import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './category.style.scss';
import { Fragment, useEffect, useState } from 'react';
import { selectCategoriesMap, selectIsCategoriesLoading } from '../../store/categories/category.selector';
import Spinner from '../../components/spine/spiner.component';

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading)
    const [products, setProducts] = useState(categoriesMap[category])
    
    useEffect(() =>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])

    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading ? <Spinner/> : <div className='category-container'>
            
                {
                    products &&
                    products.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
            }
            
        </Fragment>
       
    )
}

export default Category;