// exportするためトップレベルで宣言
export const hideDrawer = () => {
  const drawer = document.getElementById('drawer');
  drawer.setAttribute('data-active', 'false');
  drawer.close();
};

document.addEventListener('DOMContentLoaded', () => {
  // menu
  const hamburger = document.querySelector('.js-hamburger');
  const drawer = document.getElementById('drawer');
  const drawerCloseButton = document.querySelector('.js-drawer-close');
  const showDrawer = () => {
    if (drawer.open) {
      drawer.close();
    }
    drawer.setAttribute('data-active', 'true');
    drawer.showModal();
  };
  hamburger.addEventListener('click', showDrawer);
  drawerCloseButton.addEventListener('click', hideDrawer);
});
