import store from "../../store";

const dbFetchEverything = () => {
  try {
    fetch("https://basespace.glitch.me/warehouses")
      .then((response) => response.json())
      .then((warehouseArray) => {
        const warehouseObj = {};
        warehouseArray.forEach((warehouse) => {
          warehouseObj[warehouse.w_name] = warehouse;
        });
        console.log(warehouseObj);
        store.dispatch("setWarehouseDataAction", warehouseObj);
        store.dispatch("setIsFetchingDataAction", false);
      });
  } catch (err) {
    console.error(err.message);
  }
};

const dbDeleteWarehouse = (code) => {
  try {
    fetch(`https://basespace.glitch.me/warehouses/${code}`, { method: "DELETE" }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        dbFetchEverything();
      } else {
        console.error("Error while deleting warehouse");
      }
    });
  } catch (err) {
    console.error(err.message);
  }
};

const dbUpdateWarehouse = (code, editObj) => {
  console.log(code);
  console.log(editObj);
  let editList = [];
  let editString = "";
  Object.entries(editObj).forEach(([type, value]) => {
    console.log(type, value);
    editList.push(`${type}=${value}`);
  });
  editString = editList.join("&");
  const query = `https://basespace.glitch.me/warehouses/${code}?${editString}`;
  console.log(query);
  try {
    fetch(query, { method: "PUT" }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        dbFetchEverything();
      } else {
        console.error("Error while updating warehouse");
      }
    });
  } catch (err) {
    console.error(err.message);
  }
};

// dbDeleteWarehouse("W-40");

export { dbFetchEverything, dbDeleteWarehouse, dbUpdateWarehouse };
