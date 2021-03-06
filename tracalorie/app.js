// Storage Controller
const StorageController = (function () {
  // Public Methods
  return {
    storeItem: (newItem) => {
      let items;

      // Check if items in LS
      if (localStorage.getItem("items") === null) {
        items = [];
        items.push(newItem);

        // Set LS
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        // Get LS items
        items = JSON.parse(localStorage.getItem("items"));

        // Push new items
        items.push(newItem);

        // Re set LS
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsFromStorage: () => {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }

      return items;
    },
    updateItemStorage: (updatedItem) => {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });

      // Re set LS
      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteItemFromStorage: (id) => {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });

      // Re set LS
      localStorage.setItem("items", JSON.stringify(items));
    },
    clearAllItemsFromStorage: () => {
      localStorage.removeItem("items");
    },
  };
})();

// Item Controller
const ItemController = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const state = {
    // items: [
    //   {
    //     id: 0,
    //     name: "Steak Dinner",
    //     calories: 1200,
    //   },
    //   {
    //     id: 1,
    //     name: "Cookie",
    //     calories: 400,
    //   },
    //   {
    //     id: 2,
    //     name: "Eggs",
    //     calories: 300,
    //   },
    // ],
    items: StorageController.getItemsFromStorage(),
    currentItem: null,
    totalcalories: 0,
  };

  // Public Methods
  return {
    logData: () => {
      return state;
    },
    getItems: () => {
      return state.items;
    },
    addItem: (name, calories) => {
      let ID;
      // Create ID
      if (state.items.length > 0) {
        ID = state.items[state.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new Item
      const newItem = new Item(ID, name, calories);

      // Add to State array
      state.items.push(newItem);

      return newItem;
    },
    getTotalCalories: () => {
      let total = 0;

      state.items.forEach((item) => {
        total += item.calories;
      });

      state.totalcalories = total;

      return state.totalcalories;
    },
    getItemById: (id) => {
      let found = null;

      state.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },
    updatedItem: (name, calories) => {
      // Turn calories to number
      calories = parseInt(calories);

      let found = null;

      state.items.forEach((item) => {
        if (item.id === state.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: (id) => {
      // Get Ids
      ids = state.items.map((item) => {
        return item.id;
      });

      // Get Index
      const index = ids.indexOf(id);

      // Remove Item
      state.items.splice(index, 1);
    },
    setCurrentItem: (item) => {
      state.currentItem = item;
    },
    getCurrentItem: () => {
      return state.currentItem;
    },
    clearAllItems: () => {
      state.items = [];

      // Clear all items from Local Storage
      StorageController.clearAllItemsFromStorage();
    },
  };
})();

// UI Controller
const UIController = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    clearBtn: ".clear-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };

  // Public Methods
  return {
    populateItemList: (items) => {
      let html = "";

      items.forEach((item) => {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content edit-item"><i class="las la-edit"></i></a>
          </li>
        `;
      });

      // Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getUISelectors: () => {
      return UISelectors;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: (newItem) => {
      // Create list item element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${newItem.id}`;

      // Add html
      li.innerHTML = `
          <strong>${newItem.name}: </strong> <em>${newItem.calories} Calories</em>
          <a href="#" class="secondary-content edit-item"><i class="las la-edit"></i></a>
      `;

      // Inser Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);

      // Show List when adding item
      document.querySelector(UISelectors.itemList).style.display = "block";
    },
    updateListItem: (updatedItem) => {
      let listItems = Array.from(
        document.querySelectorAll(UISelectors.listItems)
      );

      listItems.forEach((item) => {
        const listID = parseInt(item.id.split("-")[1]);
        if (listID === updatedItem.id) {
          item.innerHTML = `
            <strong>${updatedItem.name}: </strong> <em>${updatedItem.calories} Calories</em>
            <a href="#" class="secondary-content edit-item"><i class="las la-edit"></i></a>
          `;
        }
      });

      // Get Total Calories
      const totalCalories = ItemController.getTotalCalories();

      // Add Calories to UI
      UIController.showTotalCalories(totalCalories);

      // Update LocalStorage
      StorageController.updateItemStorage(updatedItem);

      UIController.clearEditState();
    },
    deleteListItem: (id) => {
      const itemID = `#item-${id}`;

      const item = document.querySelector(itemID);
      item.remove();

      // Get Total Calories
      const totalCalories = ItemController.getTotalCalories();

      // Add Calories to UI
      UIController.showTotalCalories(totalCalories);

      // Delete Item from LS
      StorageController.deleteItemFromStorage(id);

      UIController.clearEditState();
    },
    removeListItems: () => {
      let items = document.querySelectorAll(UISelectors.listItems);

      items.forEach((item) => {
        item.remove();
      });

      // Get Total Calories
      const totalCalories = ItemController.getTotalCalories();

      // Add Calories to UI
      UIController.showTotalCalories(totalCalories);

      UIController.clearEditState();

      UIController.hideList();
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
    },
    clearEditState: () => {
      UIController.clearInput();
      document.querySelector(UISelectors.addBtn).style.display = "inline";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
    },
    showEditState: () => {
      document.querySelector(UISelectors.addBtn).style.display = "none";
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
    },
    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemController.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemController.getCurrentItem().calories;

      UIController.showEditState();
    },
  };
})();

// App Controller
const App = (function (ItemController, StorageController, UIController) {
  // Load Event Listeners
  const loadEventListeners = () => {
    const UISelectors = UIController.getUISelectors();

    // Add Item Event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Click Edit Item
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Update Item Event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Delete Item Event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Clear All Items Event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);

    // Back Btn Event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UIController.clearEditState());
  };

  // Add Item Submit
  const itemAddSubmit = (e) => {
    e.preventDefault();

    // Get form input from UI Controller

    const input = UIController.getItemInput();

    // Check for name and calorie input

    if (input.name !== "" && input.calories !== "") {
      // Add Item
      const newItem = ItemController.addItem(input.name, input.calories);

      // Add item to UI List
      UIController.addListItem(newItem);

      // Get Total Calories
      const totalCalories = ItemController.getTotalCalories();

      // Add Calories to UI
      UIController.showTotalCalories(totalCalories);

      // Store in LocalStorage
      StorageController.storeItem(newItem);

      // Clear Input
      UIController.clearInput();
    }
  };

  // Disable Submit on enter
  document.addEventListener("keypress", (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      return false;
    }
  });

  // Click Edit Item Event
  const itemEditClick = (e) => {
    e.preventDefault();

    if (e.target.parentElement.classList.contains("edit-item")) {
      // Get List Item ID

      const listID = e.target.parentNode.parentNode.id;

      // Get Number of class by splitting class by '-'
      const id = parseInt(listID.split("-")[1]);

      // Get Item to Edit
      const itemToEdit = ItemController.getItemById(id);

      // Set current Item
      ItemController.setCurrentItem(itemToEdit);

      // Add Item to form
      UIController.addItemToForm();
    }
  };

  // Update Item Submit
  const itemUpdateSubmit = (e) => {
    e.preventDefault();

    // Get Item Input
    const input = UIController.getItemInput();

    // Update Item
    const updatedItem = ItemController.updatedItem(input.name, input.calories);

    UIController.updateListItem(updatedItem);
  };

  const itemDeleteSubmit = (e) => {
    e.preventDefault();

    // Get Current Item
    const currentItem = ItemController.getCurrentItem();

    // Delete from Data Structure
    ItemController.deleteItem(currentItem.id);

    // Delete item from UI
    UIController.deleteListItem(currentItem.id);
  };

  const clearAllItemsClick = (e) => {
    e.preventDefault();

    // Delete all items from Data Structure
    ItemController.clearAllItems();

    // Remove List Items
    UIController.removeListItems();
  };

  // Public Methods
  return {
    init: () => {
      // Set Initial State
      UIController.clearEditState();

      // Fetch Items from state
      const items = ItemController.getItems();

      // Check if any items
      if (items.length === 0) {
        UIController.hideList();
      } else {
        // Populate List with items
        UIController.populateItemList(items);
      }

      // Get Total Calories
      const totalCalories = ItemController.getTotalCalories();

      // Add Calories to UI
      UIController.showTotalCalories(totalCalories);

      // Load Event Listeners
      loadEventListeners();
    },
  };
})(ItemController, StorageController, UIController);

// Init App
App.init();
