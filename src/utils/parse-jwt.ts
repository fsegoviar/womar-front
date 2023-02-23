export const parseJwt = (): any => {
  let token = localStorage.getItem('tokenWomar');
  if (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  return '';
};
