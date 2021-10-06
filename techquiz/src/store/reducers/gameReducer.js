const initState = {
    gameError: null,
    selectedCategories: null,
    isCorrectAnswer: null,
    redirectTo : null,
    correctAnswers : null,
    answer : null,
    questionTimer: null,
    categoriesImgPath : {
        Linux: "https://api.iconify.design/fa-brands:linux.svg",
        DevOps: "https://api.iconify.design/cib:azure-devops.svg",
        MySQL: "https://api.iconify.design/cib:mysql.svg",
        PHP: "https://api.iconify.design/fa-brands:php.svg",
        BASH: "https://api.iconify.design/bi:terminal.svg",
        Docker: "https://api.iconify.design/file-icons:docker.svg",
        HTML: "https://api.iconify.design/dashicons:html.svg",
        WordPress: "https://api.iconify.design/bx:bxl-wordpress.svg",
        Laravel: "https://api.iconify.design/cib:laravel.svg",
        Kubernetes: "https://api.iconify.design/logos:kubernetes.svg",
        JavaScript: "https://api.iconify.design/bx:bxl-javascript.svg"
    }
}

const gameReducer = (state = initState, action) => {
    switch (action.type){
        case 'GENERATE_CATEGORIES_SUCCESS':
            return{
                ...state,
                gameError: null,
                selectedCategories: action.payload
            }
        case 'INITIALIZE_TIMER':
            return{
                ...state,
                questionTimer: action.payload
            }

        case 'DECREMENT_TIMER':
            return{
                ...state,
                questionTimer: action.payload
            }

        case 'UPDATED_SCORE_SUCCESS':
            return{
                ...state
            }
        case 'UPDATED_SCORE_FAILURE':
            return{
                ...state,
                gameError: action.error.message
            }

        case 'UPDATED_ACTIVE_QUESTION_SUCCESS':
            return{
                ...state
            }

        case 'UPDATE_ACTIVE_QUESTION_FAILURE':
            return{
                ...state,
                gameError: action.error.message
            }

        case 'STOP_TIMER':
            return{
                ...state,
                questionTimer: action.payload
            }
        case  'RESTORE_CORRECT_ANSWER':
            return {
                ...state,
                correctAnswers: null
            }
        case 'ACTIVE_QUESTION_UPDATED':
            return {
                ...state
            }
        case 'ACTIVE_QUESTION_FAILURE':
            return {
                ...state,
                gameError: "Couldn't update question"
            }
        case 'REDIRECT':
            return{
                ...state,
                redirectTo: action.payload
            }

        case 'RESTORE_REDIRECT_TO':
            return{
                ...state,
                redirectTo: null
            }
        case 'GAME_OVER_SUCCESS':
            return {
                ...state,
                redirectTo: action.payload
            }
        case 'RESTORED_HAS_CHOSEN_CATEGORY_SUCCESS':
            return{
                ...state
            }
        case 'RESTORED_HAS_CHOSEN_CATEGORY_FAILURE':
            return{
                ...state,
                gameError: action.error.message
            }


        default:
            return state;
    }
}

export default gameReducer
