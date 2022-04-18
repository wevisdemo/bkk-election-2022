export function loadUIComponents() {
  if (document.head.querySelector('#ui-webcomponent-script')) {
    return;
  }

  const externalScript = document.createElement('script');
  externalScript.setAttribute('id', 'ui-webcomponent-script');
  externalScript.setAttribute('src', '/ui/ui.umd.js');
  externalScript.setAttribute('async', true);
  document.head.appendChild(externalScript);
}
