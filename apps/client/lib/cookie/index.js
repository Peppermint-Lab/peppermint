// FILE TO PERFORM SEVERAL FUNCTIONS RELATED TO COOKIES
// =============================================================================
// 
// Check if cookie exists
// Check if cookie is valid
// Revalidate cookie if expired
// return true or false
// function to return session token 

import { getCookie } from 'cookies-next';


export const checkCookieExists = () => {

    const access = getCookie('session'); 

}