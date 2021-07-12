// Storage Controller

// Item Controller
const ItemController = (function () {
  // Item Constructor
  const Item = (id, name, calories) => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const state = {
    items: [
      {
        id: 0,
        name: "Steak Dinner",
        calories: 1200,
      },
      {
        id: 1,
        name: "Cookie",
        calories: 400,
      },
      {
        id: 2,
        name: "Eggs",
        calories: 300,
      },
    ],
    currentItem: null,
    totalcalories: 0,
  };

  // Public Methods
  return {
    logData: () => {
      return state;
    },
  };
})();

// UI Controller
const UIController = (function () {
  // Public Methods
  return {};
})();

// App Controller
const App = (function (ItemController, UIController) {
  // Public Methods
  return {
    init: () => {
      console.log("Initializing app...");
    },
  };
})(ItemController, UIController);

// Init App
App.init();
