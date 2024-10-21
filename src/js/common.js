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
  const hideDrawer = () => {
    drawer.setAttribute('data-active', 'false');
    drawer.close();
  };
  hamburger.addEventListener('click', showDrawer);
  drawerCloseButton.addEventListener('click', hideDrawer);
  // メニュークリック時、ページ内リンクのためにメニューを閉じる
  const menuItem = document.querySelectorAll('.js-menu-link');
  menuItem.forEach(link => {
    if (link) {
      link.addEventListener('click', hideDrawer);
    }
  });
  // simulation
  const genderButtons = document.querySelectorAll('.l-simulation__input--gender');
  genderButtons.forEach(button => {
    button.addEventListener('click', () => {
      genderButtons.forEach(btn => {
        btn.classList.remove('l-simulation__input--active');
      });
      button.classList.add('l-simulation__input--active');
    });
  });
  // example
  const exampleTabItems = document.querySelectorAll(".l-example__tab-item");
  const exampleVisibilityPanels = document.querySelectorAll(".l-example__visibility");

  exampleTabItems.forEach((tab) => {
    tab.addEventListener("click", () => {
      exampleTabItems.forEach((item) => {
        item.setAttribute("aria-selected", "false");
      });

      tab.setAttribute("aria-selected", "true");

      const targetId = tab.getAttribute("aria-controls");

      exampleVisibilityPanels.forEach((panel) => {
        panel.setAttribute("hidden", "until-found");
      });

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.parentElement.removeAttribute("hidden");
      }
    });
  });
  // generation
  const generationTabButtons = document.querySelectorAll(".l-generation__button");
  const generationContentPanels = document.querySelectorAll(".l-generation__visibility");

  generationTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      generationTabButtons.forEach((btn) => {
        btn.setAttribute("aria-selected", "false");
      });

      button.setAttribute("aria-selected", "true");

      const targetId = button.getAttribute("aria-controls");

      generationContentPanels.forEach((panel) => {
        panel.setAttribute("hidden", "until-found");
      });

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.parentElement.removeAttribute("hidden");
      }
    });
  });
  // fixed cta
  const ctaBanner = document.querySelector('.l-fixed-cta');
  const footerWrapper = document.querySelector('.l-footer__copy-wrapper');
  const exampleSection = document.getElementById('example');
  const footerMargin = 28;

  const updateCTAPosition = () => {
    const footerRect = footerWrapper.getBoundingClientRect();

    if (footerRect.top <= window.innerHeight) {
      ctaBanner.style.position = 'absolute';
      ctaBanner.style.insetBlockEnd = `${footerWrapper.offsetHeight + footerMargin}px`;
    } else {
      ctaBanner.style.position = 'fixed';
      ctaBanner.style.insetBlockEnd = '12px';
    }
  };

  const checkExampleSection = () => {
    const exampleRect = exampleSection.getBoundingClientRect();

    if (exampleRect.top < window.innerHeight) {
      ctaBanner.classList.add('l-fixed-cta--visible');
      window.addEventListener('scroll', updateCTAPosition);
      window.addEventListener('resize', updateCTAPosition);
      updateCTAPosition();
    } else {
      ctaBanner.classList.remove('l-fixed-cta--visible');
      window.removeEventListener('scroll', updateCTAPosition);
      window.removeEventListener('resize', updateCTAPosition);
    }
  };

  window.addEventListener('scroll', checkExampleSection);
  window.addEventListener('resize', checkExampleSection);

  checkExampleSection();
});
