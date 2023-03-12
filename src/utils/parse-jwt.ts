export const parseJwt = (): any => {
  let token = localStorage.getItem('tokenWomar');
  if (token !== null) {
    let base64Url = token.split('.')[1];
    if (base64Url) {
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
    return '';
  }
  return '';
};
