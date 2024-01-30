export const getaccesstoken: ()=> string | null = ()=>{
    const cookies = document.cookie.split('; ');
    console.log(cookies)
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
  
      if (name === 'authtoken') {
        // Replace 'yourTokenCookieName' with the actual name of your token cookie
        return value;
      }
    }
  
    return null; // Return null if the token cookie is not found
}
export const getrefreshtoken: ()=> string | null = ()=>{
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
  
      if (name === 'refreshtoken') {
        // Replace 'yourTokenCookieName' with the actual name of your token cookie
        return value;
      }
    }
  
    return null; // Return null if the token cookie is not found
}
const clearCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const clearCookies = (): void => {
  clearCookie('authtoken');
  clearCookie('refreshtoken');
};
