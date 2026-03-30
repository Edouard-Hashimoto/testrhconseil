export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = useCookie('auth_session');

  if (!authCookie.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login');
  }
});
