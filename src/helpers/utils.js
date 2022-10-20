import axios from 'axios';
import $ from 'jquery';

export const setItemToStore = (key, payload, store = localStorage) =>
  store.setItem(key, payload);

export const getItemFromStore = (key, defaultValue, store = localStorage) => {
  try {
    return store.getItem(key) === null
      ? defaultValue
      : JSON.parse(store.getItem(key));
  } catch {
    return store.getItem(key) || defaultValue;
  }
};

export const getColor = (name, dom = document.documentElement) => {
  return getComputedStyle(dom).getPropertyValue(`--falcon-${name}`).trim();
};

export const reactBootstrapDocsUrl = 'https://react-bootstrap.github.io';

export const camelize = str => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const capitalize = str =>
  (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, ' ');

export const flatRoutes = childrens => {
  const allChilds = [];

  const flatChild = childrens => {
    childrens.forEach(child => {
      if (child.children) {
        flatChild(child.children);
      } else {
        allChilds.push(child);
      }
    });
  };
  flatChild(childrens);

  return allChilds;
};

export const getFlatRoutes = children =>
  children.reduce(
    (acc, val) => {
      if (val.children) {
        return {
          ...acc,
          [camelize(val.name)]: flatRoutes(val.children)
        };
      } else {
        return {
          ...acc,
          unTitled: [...acc.unTitled, val]
        };
      }
    },
    { unTitled: [] }
  );


export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};

export const isIterableArray = array => Array.isArray(array) && !!array.length;

export const getMenuTree = () => {
  const encryptedClientCode = localStorage.getItem("EncryptedClientCode");
  axios.get(process.env.REACT_APP_API_URL + '/get-menu-tree/' + encryptedClientCode)
    .then(res => {
      if (res.data.status == 200) {

        var menuTreeHtml = '<li class="nav-item">';
        var parentMenus = res.data.data.filter(x => x.parentId == 0);

        for (let i = 0; i < parentMenus.length; i++) {
          const name = parentMenus[i].menuItemName;
          const childId = parentMenus[i].childId;

          var childMenus = res.data.data.filter(x => x.parentId == childId);

          menuTreeHtml += `<a id="parent_${childId}" aria-current="page" class="nav-link ${childMenus.length > 0 ? 'dropdown-indicator collapsed\" aria-expanded="false' : ''}">
                                <div class="d-flex align-items-center"`;

          menuTreeHtml += childMenus.length > 0 ? `onClick="sidebarMenuClick('parent_${childId}', 'children_${childId}');"` : '';

          menuTreeHtml += `>
                            <span class="nav-link-icon"></span>
                            <span class="nav-link-text ps-1">${name}</span>
                          </div>
                      </a>`;

          if (childMenus.length > 0) {
            menuTreeHtml += `<ul id="children_${childId}" class="nav collapse">`;

            for (let j = 0; j < childMenus.length; j++) {
              const childId = childMenus[j].childId;
              const name = childMenus[j].menuItemName;
              const menuUrl = childMenus[j].menuItemPageURL;

              menuTreeHtml += `<li id="child_${childId}" class="nav-item">
                                      <a class="nav-link" href="${menuUrl}" data-bs-toggle="" aria-expanded="false">
                                        <div class="d-flex align-items-center">
                                         <span class="nav-link-text ps-1">${name}</span>
                                        </div>
                                      </a>
                                    </li>`;
            }

            menuTreeHtml += '</ul>';
          }
        }
        menuTreeHtml += '</li>';

        $('.navbar-vertical-content .navbar-nav .nav-item:not(:first-child)').remove();
        $('.navbar-vertical-content .navbar-nav').append(menuTreeHtml);
      }
    });
}