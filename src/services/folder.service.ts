/************************************************
 * Please define all the global constants and variables here
 *************************************************/
import * as GlobalConsts from "../constants/global_constants";
import { TFolderType } from "../types/boomgpt.types";
import * as LinkerConst from "../constants/linker_constants";

/************************************************
 * END of Global Functions
 *************************************************/

export default class FolderService {
  selectedCategories: TFolderType[] = [];
  global_boom_folders: any[] = [];
  global_folder_lists: any[] = [];

  setupCounter(element: HTMLButtonElement) {
    let counter = 0;
    const setCounter = (count: number) => {
      counter = count;
      element.innerHTML = `count is ${counter}`;
    };
    element.addEventListener("click", () => setCounter(counter + 1));
    setCounter(0);
  }

  resetSelectedCategories() {
    this.selectedCategories = [];
  }

  populateSidebarOnDialogCategory() {
    this.getAllFolders();
    // ApiFunc.getCategories().then(async (res) => {
    //   boom_folders = res?.data;

    //   let nested_boom_folders = createNestedTreeAndAddToDOM(boom_folders);
    //   createNewCategory(res?.data, nested_boom_folders);
    // });
  }

  createNestedTreeAndAddToDOM(boom_folders: any) {
    const category_listing_html: any = document.querySelectorAll(
      `#${GlobalConsts.myprefix}category_list_tree`
    )[0];
    const loader: any = document.getElementById(
      `${GlobalConsts.myprefix}loader`
    );

    while (category_listing_html.firstChild) {
      category_listing_html.firstChild.remove();
    }

    if (boom_folders?.length > 0) {
      let nested_boom_folders = GlobalFunc.createNestedTree(boom_folders);

      loader.classList.add(`${GlobalConsts.myprefix}hide`);

      nestedInsertFolderTree(category_listing_html, nested_boom_folders, 0);
      folderToggler();
      return nested_boom_folders;
    } else {
      // loader.classList.add(`${GlobalConsts.myprefix}hide`);
      let para = document.createElement("p");
      para.append("You have not created folders yet!");
      // category_listing_html.append(para);
      return boom_folders;
    }
  }

  //Sending Data that is scraped in the backend or boomconsole website with an API call
  folderToggler() {
    let toggler = document.getElementsByClassName(
      `${GlobalConsts.myprefix}toggler`
    );
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function (e: any) {
        console.log(e);

        e.parentElement
          .querySelector(`.${GlobalConsts.myprefix}submenuLevel`)
          .classList.toggle(`${GlobalConsts.myprefix}active`);
      });
    }
  }

  addEventListenerToCheckboxElement(checkboxElem: any) {
    checkboxElem.addEventListener("change", (e: any) => {
      if (
        this.selectedCategories?.some(
          (x: any) => x.category_id == e.target.value
        )
      ) {
        this.selectedCategories = this.selectedCategories?.filter(
          (x: any) => x.category_id != e.target.value
        );
      } else {
        let folder: TFolderType = {
          category_name: e.target.name,
          category_id: e.target.value,
        };
        this.selectedCategories.push(folder);
      }
    });
  }

  nestedInsertFolderTree(parent: any, menu: any, level: number) {
    for (let i = 0; i < menu.length; i++) {
      let category_name =
        menu[i]?.data?.[GlobalConsts.categoryCompositionName]?.category_name;
      let category_id = menu[i]?.id;

      let checkBoxElement = this.insertCategoryListItem(
        parent,
        category_id,
        category_name
      );

      this.addEventListenerToCheckboxElement(checkBoxElement);

      let submenu = parent.querySelectorAll(":scope > li")[i];

      if (menu[i] && menu[i].children.length > 0) {
        submenu.setAttribute("class", `${GlobalConsts.myprefix}has_submenu`);
        let ulElem = document.createElement("ul");
        let toggler = document.createElement("span");
        toggler.setAttribute("class", `${GlobalConsts.myprefix}toggler`);
        ulElem.setAttribute("class", `${GlobalConsts.myprefix}submenuLevel`);
        submenu.append(ulElem);
        let new_parent = submenu.querySelectorAll("ul")[0];
        submenu.insertBefore(toggler, new_parent);

        this.nestedInsertFolderTree(new_parent, menu[i].children, level + 1);
      }
    }
  }

  // Prepare to create New Folder Action...
  prepareDomTocreateNewFolder(folders_list: any, boom_folders: any) {
    const add_category = document.getElementById(
      `${GlobalConsts.myprefix}create_category`
    );

    const parent = document.querySelectorAll(
      `#${GlobalConsts.myprefix}category_list_tree`
    );

    this.global_folder_lists = JSON.parse(JSON.stringify(folders_list));

    add_category?.removeEventListener("click", () => {});

    add_category?.addEventListener("click", () => {
      this.addCategoryBtnAction(parent);
    });
  }

  // Create DOM for creating new folder...
  addCategoryBtnAction(parent: any) {
    if (
      document.querySelectorAll(`#${GlobalConsts.myprefix}new_category_input`)
        ?.length == 0
    ) {
      let list = document.createElement("li");
      // For folder/category name
      let inputElement = document.createElement("input");
      inputElement.setAttribute("type", "text");
      inputElement.setAttribute(
        "id",
        `${GlobalConsts.myprefix}new_category_input`
      );
      inputElement.setAttribute("class", `${GlobalConsts.myprefix}field_input`);
      inputElement.setAttribute("placeholder", `New Folder name`);
      // Select Parent
      let selectElement = document.createElement("select");
      selectElement.setAttribute("id", `${GlobalConsts.myprefix}select_parent`);
      selectElement.setAttribute(
        "class",
        `${GlobalConsts.myprefix}field_select`
      );
      selectElement.appendChild(new Option("Select Parent", ""));
      // For displaying error
      let errorElement = document.createElement("div");
      errorElement.setAttribute("class", `${GlobalConsts.myprefix}field_error`);

      let successElement = document.createElement("div");
      successElement.setAttribute(
        "class",
        `${GlobalConsts.myprefix}field_success`
      );

      this.global_folder_lists.forEach((element: any) => {
        selectElement.appendChild(
          new Option(
            element?.data[GlobalConsts.categoryCompositionName]?.category_name,
            element?.id
          )
        );
      });

      let saveBtnElement = document.createElement("input");
      saveBtnElement.setAttribute("type", "button");
      saveBtnElement.setAttribute(
        "id",
        `${GlobalConsts.myprefix}new_category_button`
      );
      saveBtnElement.setAttribute("value", "Save");
      list.append(errorElement);
      list.append(inputElement);
      list.append(selectElement);
      list.append(saveBtnElement);

      parent[0].append(list);
      inputElement.focus();

      let boom_ulItem = document.querySelectorAll(
        ".boomconsole2023_sidebar_body"
      );
      boom_ulItem[0]?.append(successElement);
      saveBtnElement.addEventListener("click", (e) =>
        this.createNewCategoryHandler(
          selectElement,
          inputElement,
          list,
          errorElement,
          successElement
        )
      );
    }
  }

  // Handle Click action For create Folder
  createNewCategoryHandler(
    selectElement: any,
    inputElement: any,
    listItem: any,
    errorElement: any,
    successElement: any
  ) {
    if (
      inputElement.value != "" &&
      !this.global_folder_lists.some(
        (x) =>
          x?.data[
            GlobalConsts.categoryCompositionName
          ]?.category_name?.toLowerCase() == inputElement.value.toLowerCase()
      )
    ) {
      let category_composition: any = {};
      if (selectElement.value) {
        category_composition[GlobalConsts.categoryCompositionName] = {
          category_name: inputElement.value,
          category_parent: selectElement.value,
        };
      } else {
        category_composition[GlobalConsts.categoryCompositionName] = {
          category_name: inputElement.value,
          category_parent: "",
        };
      }

      inputElement.remove();
      selectElement.remove();

      this.createNewCategoryAndSave(
        category_composition,
        parent[0],
        listItem,
        successElement,
        errorElement
      );
    } else {
      successElement.innerHTML = "";
      errorElement.innerHTML = "Folder already exists";
    }
  }

  // Create New Folder is API Calls..
  createNewCategoryAndSave(
    category_composition: any,
    parent: any,
    list_element_to_remove: any,
    successElement: any,
    errorElement: any
  ) {
    let loader = document.getElementById(`${GlobalConsts.myprefix}loader`);
    loader?.classList.remove(`${GlobalConsts.myprefix}hide`);

    const response: any = await ApiFunc.createCompositionWithAuth(
      category_composition
    );
    // const folderDetails:any  = await response?.json()

    const folderId = response?.data?.chatgpt_category?.id;
    const parentFolderId =
      response?.data?.chatgpt_category?.data?.category_parent;

    const userDetails: any = await ApiFunc.getUser();
    const userConceptId = userDetails?.userConcept;

    // return
    if (parentFolderId) {
      const folderLinks = await ApiFunc.createLink(
        parentFolderId,
        folderId,
        LinkerConst.folderLinker
      );
      const folderWithConsoleLinks = await ApiFunc.createLink(
        parentFolderId,
        folderId,
        LinkerConst.consoleLinker
      );
    } else {
      const folderLinks = await ApiFunc.createLink(
        userConceptId,
        folderId,
        LinkerConst.folderLinker
      );
      const folderWithConsoleLinks = await ApiFunc.createLink(
        userConceptId,
        folderId,
        LinkerConst.consoleLinker
      );
    }

    loader?.classList.remove(`${GlobalConsts.myprefix}hide`);

    successElement.innerHTML = "New Folder Created!";
    errorElement.innerHTML = "";
    setTimeout(() => {
      this.getAllFolders();
    }, 1000);
  }

  async getAllFolders() {
    const userDetails: any = await ApiFunc.getUser();

    const userConceptId = userDetails?.userConcept;

    const folderLinker = `${LinkerConst.folderLinker}_s`;

    let data = {
      composition: userConceptId,
      listLinkers: [folderLinker],
      textSearch: "",
    };
    const res = await ApiFunc.recursiveSearchNestedLinks(data);

    this.global_boom_folders = res.filter((x: any) => {
      return !x?.data?.the_user;
    });

    let sortedFolderList = this.global_boom_folders?.sort(function (
      a: any,
      b: any
    ) {
      let a_name = a?.data?.chatgpt_category?.category_name?.toLowerCase();
      let b_name = b?.data?.chatgpt_category?.category_name?.toLowerCase();
      return a_name.localeCompare(b_name);
    });
    let nested_boom_folders = await this.createNestedTreeAndAddToDOM(
      sortedFolderList
    );

    this.prepareDomTocreateNewFolder(sortedFolderList, nested_boom_folders);
  }

  insertCategoryListItem(
    parent: any,
    category_id: string,
    category_name: string
  ) {
    let list = document.createElement("li");
    let checkboxElement = document.createElement("input");
    checkboxElement.setAttribute("type", "checkbox");
    checkboxElement.setAttribute("value", category_id);
    checkboxElement.setAttribute("name", category_name);
    list.append(checkboxElement);
    list.append(category_name);
    parent.append(list);
    return checkboxElement;
  }
}
