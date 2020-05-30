class TabPanel extends HTMLElement {
  constructor() {
    super();
    this.tabs = [];
    this.selectedTab = null;
  }
  connectedCallback()
  {
    const pmTabs = this.querySelector("wc-tabs");
    this.tabs = [...this.querySelectorAll("wc-tab")];
    pmTabs.addEventListener("click", (e) =>
    {
      this.select(e.target.id);
    });

    pmTabs.addEventListener("keydown", ({key}) =>
    {
      if (key === "ArrowDown" || key === "ArrowRight")
        this.selectNextTab();
      if (key === "ArrowUp" || key === "ArrowLeft")
        this.selectPrevTab();
    });
  }

  select(id, focus = true)
  {
    if (!id)
      return;

    this.tabs.forEach((tab) =>
    {
      tab._hide();
      if (tab.id === id)
      {
        tab._show(focus);
        this.selectedTab = tab;
      }
    });
  }

  _getSelectedTabIndex()
  {
    return this.tabs.indexOf(this.selectedTab);
  }

  selectNextTab()
  {
    const index = this._getSelectedTabIndex() + 1;
    this.select(this.tabs[index >= this.tabs.length ? 0 : index].id);
  }
  selectPrevTab()
  {
    const index = this._getSelectedTabIndex() - 1;
    this.select(this.tabs[index >= 0 ? index : this.tabs.length - 1].id);
  }
}

class Tabs extends HTMLElement {
  constructor() {
    super(); 
  }
}

class Tab extends HTMLElement {
  constructor() {
    super();
    this.panel = null;
    this.tabPanel = null;
  }

  connectedCallback()
  {
    this.setAttribute("role", "tab");
    this.panel = document.querySelector(`[aria-labelledby=${this.id}]`);
    this.tabPanel = this.closest("wc-tab-panel");
  }

  _show(focus)
  {
    this.setAttribute("aria-selected", true);
    this.setAttribute("tabindex", "0");
    if (focus)
      this.focus();
    this.panel._show();
    this._dispatchTabChange();
  }

  _dispatchTabChange()
  {
    const event = new CustomEvent("tabChange", {"detail": this.id});
    this.tabPanel.dispatchEvent(event);
  }

  _hide()
  {
    this.removeAttribute("aria-selected");
    this.setAttribute("tabindex", "-1");
    this.panel._hide();
  }
}

class Panels extends HTMLElement {
  constructor() {
    super();
  }
}

class Panel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback()
  {
    this.setAttribute("role", "tabpanel");
    this.setAttribute("hidden", true);
  }

  _show()
  {
    this.removeAttribute("hidden");
  }

  _hide()
  {
    this.setAttribute("hidden", true);
  }
}

customElements.define('wc-tab-panel', TabPanel);
customElements.define('wc-tab', Tab);
customElements.define('wc-tabs', Tabs);
customElements.define('wc-panels', Panels);
customElements.define('wc-panel', Panel);
