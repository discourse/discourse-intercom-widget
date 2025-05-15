import { apiInitializer } from "discourse/lib/api";

// prettier-ignore
// eslint-disable-next-line
let startIntercom = () => { let w = window; let ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', intercomSettings); } else { let d = document; let i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; function l() { let s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = `https://widget.intercom.io/widget/${ settings.app_id }`; let x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); } l(); } };

export default apiInitializer((api) => {
  window.intercomSettings = {
    app_id: settings.app_id,
  };
  const currentUser = api.getCurrentUser();
  if (currentUser) {
    currentUser.checkEmail().then(() => {
      window.intercomSettings.email = currentUser.email;
      startIntercom();
    });
  }
});
