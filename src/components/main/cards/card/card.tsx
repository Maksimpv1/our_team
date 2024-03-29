import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { useAppDispatch, useAppSelectortype } from "../../../../redux/store/store";
import { removeUser, setLoginState, setUser } from "../../../../redux/reducers/teamReducer";

import styles from "./card.module.scss"

interface IWindowSize {
    windowWidth: number;
  }
  

export const Card = () => {
    const paramss = useParams();

    const navigate = useNavigate();

    const loginState = useAppSelectortype((state) => state.info.loginState)

    const [windowSize, setWindowSize] = useState<IWindowSize>({
        windowWidth: window.innerWidth
      });

    const dispatch = useAppDispatch()
    const user = useAppSelectortype((state) => state.info.user)

    const idUser:number | null =  paramss.id ? +paramss.id : null

    const handleResize = () => {
        setWindowSize({ windowWidth: window.innerWidth });
      };

    useEffect(()=>{
        window.scrollTo(0, 0);
        if (paramss.id && idUser !== null) {
            dispatch(setUser(idUser));
          }
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])
    useEffect(()=>{
        const userToken = localStorage.getItem('userToken'); 
        if(!userToken){
            navigate('/Login')
        }
    },[loginState])

    const handleGoBack = () => {
        navigate(-1);
    };
    const handleClick = () => {
        dispatch(removeUser())        
        localStorage.removeItem('userToken');
    }


    return(
        <div>
            <header className={styles.container}>
                {windowSize.windowWidth > 800 ? (
                    <button onClick={handleGoBack}>Назад</button>
                    ) : (
                    <button onClick={handleGoBack}>
                        <svg 
                            width="7" 
                            height="14" 
                            viewBox="0 0 7 14" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83749 14.0013C5.68809 14.0018 5.54048 13.9688 5.4055 13.9048C5.27052 13.8407 5.15161 13.7473 5.05749 13.6313L0.227488 7.63125C0.0804062 7.45232 0 7.22788 0 6.99625C0 6.76463 0.0804062 6.54018 0.227488 6.36125L5.22749 0.361252C5.39723 0.157036 5.64114 0.0286112 5.90556 0.0042315C6.16999 -0.0201482 6.43327 0.0615137 6.63749 0.231252C6.8417 0.400991 6.97013 0.644902 6.99451 0.909329C7.01889 1.17375 6.93723 1.43704 6.76749 1.64125L2.29749 7.00125L6.61749 12.3613C6.73977 12.508 6.81745 12.6868 6.84133 12.8763C6.86521 13.0659 6.83429 13.2583 6.75223 13.4308C6.67018 13.6034 6.54042 13.7488 6.37831 13.8499C6.2162 13.9509 6.02852 14.0035 5.83749 14.0013Z" fill="#F8F8F8"/>
                        </svg> 
                    </button>
                )}
                    {windowSize.windowWidth > 800 ? (
                    <button onClick={handleClick}>Выход</button>
                    ) : (
                    <button onClick={handleClick}>
                        <svg 
                        width="40" 
                        height="40" 
                        viewBox="0 0 40 40" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.79 24.29C19.18 24.68 19.81 24.68 20.2 24.29L23.79 20.7C23.8827 20.6075 23.9563 20.4976 24.0064 20.3766C24.0566 20.2557 24.0824 20.126 24.0824 19.995C24.0824 19.864 24.0566 19.7343 24.0064 19.6134C23.9563 19.4924 23.8827 19.3825 23.79 19.29L20.2 15.7C20.013 15.513 19.7594 15.408 19.495 15.408C19.2306 15.408 18.977 15.513 18.79 15.7C18.603 15.887 18.498 16.1406 18.498 16.405C18.498 16.6694 18.603 16.923 18.79 17.11L20.67 19H12C11.45 19 11 19.45 11 20C11 20.55 11.45 21 12 21H20.67L18.79 22.88C18.4 23.27 18.41 23.91 18.79 24.29ZM27 11H13C12.4696 11 11.9609 11.2107 11.5858 11.5858C11.2107 11.9609 11 12.4696 11 13V16C11 16.55 11.45 17 12 17C12.55 17 13 16.55 13 16V14C13 13.45 13.45 13 14 13H26C26.55 13 27 13.45 27 14V26C27 26.55 26.55 27 26 27H14C13.45 27 13 26.55 13 26V24C13 23.45 12.55 23 12 23C11.45 23 11 23.45 11 24V27C11 28.1 11.9 29 13 29H27C28.1 29 29 28.1 29 27V13C29 11.9 28.1 11 27 11Z" fill="#F8F8F8"/>
                        </svg>
                    </button>
                )}
                <div className={styles.header_wrapper}>
                    <div className={styles.card_photo}>
                        <img src={user?.avatar}/>
                    </div>
                    <div className={styles.header_info}>                        
                        <h2>{user?.first_name} {user?.last_name}</h2>
                        <p>Партнер</p>
                    </div>
                </div>
            </header>
            <div className={styles.main_wrapper}>
                <div className={styles.main_text}>
                <p>Клиенты видят в нем эксперта по вопросам разработки комплексных
                    решений финансовых продуктов, включая такие аспекты, как организационная
                    структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам
                    лучше понимать структуру рисков их бизнеса, улучшать процессы за счет
                    применения новейших технологий и увеличивать продажи, используя самые
                    современные аналитические инструменты.
                </p>
                <p>В работе с клиентами недостаточно просто решить конкретную проблему
                    или помочь справиться с трудностями. Не менее важно уделять внимание
                    обмену знаниями: "Один из самых позитивных моментов — это осознание
                    того, что ты помог клиенту перейти на совершенно новый уровень
                    компетентности, уверенность в том, что после окончания проекта 
                    у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
                </p>
                <p>Помимо разнообразных проектов для клиентов финансового сектора,
                    Сорин ведет активную предпринимательскую деятельность.
                    Он является совладельцем сети клиник эстетической медицины в Швейцарии,
                    предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
                </p>
                </div>                
                <div className={styles.main_info}>
                    <p><span><svg 
                                width="22" 
                                height="22" 
                                viewBox="0 0 22 22" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.554 5.24003L6.171 1.33503C5.781 0.88503 5.066 0.88703 4.613 1.34103L1.831 4.12803C1.003 4.95703 0.766003 6.18803 1.245 7.17503C4.10662 13.1 8.88505 17.8851 14.806 20.755C15.792 21.234 17.022 20.997 17.85 20.168L20.658 17.355C21.113 16.9 21.114 16.181 20.66 15.791L16.74 12.426C16.33 12.074 15.693 12.12 15.282 12.532L13.918 13.898C13.8482 13.9712 13.7563 14.0195 13.6564 14.0354C13.5565 14.0513 13.4541 14.0339 13.365 13.986C11.1354 12.7021 9.286 10.8503 8.005 8.61903C7.95703 8.52978 7.93966 8.42726 7.95556 8.32719C7.97145 8.22711 8.01974 8.13502 8.093 8.06503L9.453 6.70403C9.865 6.29003 9.91 5.65003 9.554 5.23903V5.24003Z" stroke="#512689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                        </span>+7 (954) 333-44-55</p>
                    <p><span>
                            <svg 
                                width="22" 
                                height="16" 
                                viewBox="0 0 22 16" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V14C0.5 14.3978 0.658035 14.7794 0.93934 15.0607C1.22064 15.342 1.60218 15.5 2 15.5H20C20.3978 15.5 20.7794 15.342 21.0607 15.0607C21.342 14.7794 21.5 14.3978 21.5 14V2C21.5 1.60218 21.342 1.22064 21.0607 0.93934C20.7794 0.658035 20.3978 0.5 20 0.5ZM18.35 2L11 7.085L3.65 2H18.35ZM2 14V2.6825L10.5725 8.615C10.698 8.7021 10.8472 8.74877 11 8.74877C11.1528 8.74877 11.302 8.7021 11.4275 8.615L20 2.6825V14H2Z" fill="#512689"/>
                            </svg>
                        </span>{user?.email}</p>
                </div>
            </div>
        </div>      
    )
}