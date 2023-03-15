import {
  readBlockConfig,
} from '../../scripts/scripts.js';

function togglePanel(tab, bShow) {
  tab.setAttribute('aria-selected', bShow);
  const panelId = tab.getAttribute('aria-controls');
  if (bShow) {
    document.getElementById(panelId)?.removeAttribute('hidden');
  } else {
    document.getElementById(panelId)?.setAttribute('hidden', '');
  }
}

const insertAfterLoading = (content, tabPanel) => {
  const observer = new MutationObserver(() => {
    if (content.getAttribute('data-section-status') === 'loaded') {
      tabPanel.append(content);
      observer.disconnect();
    }
  });
  observer.observe(content, {
    attributes: true,
  });
};

function createTabPanel(tab) {
  const tabPanelContent = document.querySelector(`[data-tab="${tab}" i]`);
  const tabPanel = document.createElement('div');
  tabPanel.className = 'tabpanel';
  tabPanel.role = 'tabpanel';
  if (tabPanelContent) {
    insertAfterLoading(tabPanelContent, tabPanel);
  }
  return tabPanel;
}

let initCount = 0;
export default function decorate(block) {
  const tabList = block.querySelector('ol');
  const config = readBlockConfig(block);
  let activeTab = config['active-tab'];
  const tabs = tabList.querySelectorAll('li');
  if (!activeTab) {
    activeTab = tabs.item(0).innerText.trim().toLowerCase();
  }
  activeTab = activeTab.replaceAll(' ', '-');
  tabList.setAttribute('role', 'tablist');
  const tabPanelContainer = document.createElement('div');
  tabPanelContainer.className = 'tab-panel-container';
  tabList.querySelectorAll('li').forEach((li, i) => {
    const text = li.textContent.trim().toLowerCase();
    const tabId = text.replaceAll(' ', '-');
    const selected = tabId === activeTab;
    li.setAttribute('role', 'tab');
    li.id = `tabs-${initCount}-${tabId}`;
    li.setAttribute('data-index', i);
    li.setAttribute('aria-selected', selected ? 'true' : 'false');

    const tabPanel = createTabPanel(text);
    tabPanel.id = `tabpanel-${initCount}-${tabId}`;
    if (!selected) {
      tabPanel.setAttribute('hidden', '');
    }
    tabPanelContainer.append(tabPanel);
    li.setAttribute('aria-controls', tabPanel.id);
    li.tabIndex = selected ? 0 : -1;
  });

  tabList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const currentTab = e.currentTarget.querySelector('li[aria-selected="true"]');
      togglePanel(currentTab, false);
      const nextTab = e.target;
      togglePanel(nextTab, true);
    }
  });

  tabList.addEventListener('keydown', (e) => {
    const currentTab = e.target;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      let nextTab;
      if (e.key === 'ArrowRight') {
        nextTab = currentTab.nextElementSibling;
        if (!nextTab) {
          nextTab = tabList.firstElementChild;
        }
      } else if (e.key === 'ArrowLeft') {
        nextTab = currentTab.previousElementSibling;
        if (!nextTab) {
          nextTab = tabList.lastElementChild;
        }
      }
      currentTab.tabIndex = -1;
      togglePanel(currentTab, false);
      togglePanel(nextTab, true);
      nextTab.tabIndex = 0;
      nextTab.focus();
    }
  });

  initCount += 1;
  block.replaceChildren(tabList, tabPanelContainer);
}
