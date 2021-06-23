"use strict";

class ListItem {
  constructor(title, bought = false) {
    this.title = title;
    this.bought = bought;
    this.renderListItem();
  }

  renderListItem() {
    const shoppingList = document.querySelector(".shopping-list-items");
    const shoppingListItem = document.createElement("div");
    shoppingListItem.classList.add("shopping-list-item");
    let content = `
      <div class="checkbox"></div>
      <p class="title">${this.title}</p>
      `;

    shoppingListItem.innerHTML = content;
    // shoppingListItem.addEventListener("click", () => {
    //   console.log(list.selectListItem(this));

    //   list.selectListItem(this);
    // });
    shoppingList.appendChild(shoppingListItem);
  }
}

class List {
  listItems = [];
  constructor() {
    this.initAddListItem();
    this.readListItemsFromLocalStorage();
    this.showInput();
    this.initSelectListItem();
  }

  saveListItemsInLocalStorage() {
    localStorage.setItem("listItems", JSON.stringify(this.listItems));
  }
  readListItemsFromLocalStorage() {
    this.listItems = [];
    const localListItems = localStorage.getItem("listItems");
    if (localListItems) {
      const listItemsShapes = JSON.parse(localStorage.getItem("listItems"));
      listItemsShapes.forEach((listItemShape) => {
        const listItem = new ListItem(listItemShape.title);
        this.listItems.push(listItem);
      });
    }
  }

  addListItem() {
    const title = document.getElementById("product-name").value;

    const listItem = new ListItem(title);
    this.listItems.push(listItem);
    this.saveListItemsInLocalStorage();
  }
  initAddListItem() {
    document.getElementById("add-item-btn").addEventListener("click", () => {
      this.addListItem();
      document.querySelector(".input-box").classList.toggle("active");
    });
  }
  showInput() {
    document.getElementById("create-item-btn").addEventListener("click", () => {
      document.querySelector(".input-box").classList.toggle("active");
    });
  }
  selectListItem(index) {
    const selectedItem = this.listItems.filter((_, i) => i === index);
    selectedItem[0].bought = !selectedItem[0].bought;

    this.saveListItemsInLocalStorage();
  }
  initSelectListItem() {
    document.querySelectorAll(".checkbox").forEach((checkbox, index) => {
      checkbox.addEventListener("click", () => {
        checkbox.classList.toggle("check");
        this.selectListItem(index);
      });
    });
  }
}

const list = new List();
