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
      <div class="checbox"></div>
      <p class="title">${this.title}</p>
      `;
    shoppingListItem.innerHTML = content;
    shoppingList.appendChild(shoppingListItem);
  }
}

class List {
  listItems = [];
  constructor() {
    this.initAddListItem();
    this.readListItemsFromLocalStorage();
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
    document.getElementById("add-list-btn").addEventListener("click", () => {
      this.addListItem();
    });
  }
}

const list = new List();