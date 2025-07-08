export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const getUserInfo = () => {
  if (typeof window === 'undefined') return null;
  return {
    email: localStorage.getItem('userEmail'),
    name: localStorage.getItem('userName'),
    customer_id: localStorage.getItem('customerId'),
  };
};

export const logout = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('customerId');
  window.location.href = '/';
}; 