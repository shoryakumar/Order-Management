export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const getUserInfo = () => {
  if (typeof window === 'undefined') return null;
  return {
    email: localStorage.getItem('userEmail'),
    name: localStorage.getItem('userName'),
  };
};

export const logout = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  window.location.href = '/';
}; 