import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelectortype } from '../../../redux/store/store'
import { addLikedCards, deleteLikedCards } from '../../../redux/reducers/teamReducer'

import styles from './cards.module.scss'

interface Iuser{
    user:{
        avatar:string,
        first_name:string,
        last_name:string,
        id:number,
    }
}

export const Cards: React.FC<Iuser> = ( {user} ) => {

    const [liked, setLiked] = useState<boolean>(false)
    const LikeList = useAppSelectortype((state)=>state.info.Liked)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = () => {
        navigate(`/Card/${user.id}`);
    }

    const addToFavorits = async () => {
        dispatch(addLikedCards({ id : user.id }))
    } 
    const deleteFavorits = async () => {
        dispatch(deleteLikedCards({ id : user.id }))
        console.log("del")
    }


    useEffect(()=>{      
        const bol = LikeList.Liked?.some((item:any) => item.id === user.id);
        setLiked(bol ? bol : false)
    },[LikeList])
    return(
            <div className={styles.container} >
                <div className={styles.cards_photo}>
                    <img src={user.avatar}/>
                </div>
                <p>{user.first_name} {user.last_name}</p>
                {!liked ? <div className={styles.cards_like} onClick={addToFavorits}>
                    <svg 
                    width="16" 
                    height="14" 
                    viewBox="0 0 16 14" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.85 1C2.72375 1 1 2.72173 1 4.84548C1 8.69096 5.55 12.1869 8 13C10.45 12.1869 15 8.69096 15 4.84548C15 2.72173 13.2762 1 11.15 1C9.848 1 8.6965 1.64569 8 2.63398C7.64499 2.1289 7.17336 1.71669 6.62504 1.43226C6.07672 1.14784 5.46785 0.999565 4.85 1Z" stroke="#151317" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div> :
                <div className={styles.cards_like} onClick={deleteFavorits}>
                <svg className={styles.cards_likeActive}
                width="16" 
                height="14" 
                viewBox="0 0 16 14" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M4.85 1C2.72375 1 1 2.72173 1 4.84548C1 8.69096 5.55 12.1869 8 13C10.45 12.1869 15 8.69096 15 4.84548C15 2.72173 13.2762 1 11.15 1C9.848 1 8.6965 1.64569 8 2.63398C7.64499 2.1289 7.17336 1.71669 6.62504 1.43226C6.07672 1.14784 5.46785 0.999565 4.85 1Z" stroke="#151317" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </div>
                }
                <button onClick={handleClick}> View card</button>
            </div>
    )
}