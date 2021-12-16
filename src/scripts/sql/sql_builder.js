const rand = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

const opts = {
  city: ["Delhi", "Pune", "Chennai", "Mumbai", "Guhawati", "Bangalore", "Kolkata", "Jaipur", "Indore"],
  type: ["Warehouse Service", "Leasable Space"],
  cluster: [2, 56, 7, 4, 21, 5, 76, 23, 86, 3, 6],
};

const uniques = {
  code: [],
  name: [],
};

const get = (field) => {
  switch (field) {
    case "code":
      const ucode = rand(10000);
      if (uniques.code.includes(ucode)) {
        return get("code");
      }
      uniques.code.push(ucode);
      return `W-${ucode}`;
    case "name":
      const uname = rand(10000);
      if (uniques.name.includes(uname)) {
        return get("name");
      }
      uniques.name.push(uname);
      return `Warehouse-${uname}`;
    case "city":
      return opts.city[rand(opts.city.length)];
    case "space_available":
      return rand(5000, 200);
    case "type":
      return opts.type[rand(opts.type.length)];
    case "cluster":
      return `Cluster-A-${opts.cluster[rand(opts.cluster.length)]}`;
    case "is_registered":
      return rand(2, 0) ? true : false;
    case "is_live":
      return rand(2, 0) ? true : false;
  }
};
// INSERT INTO warehouses VALUES ('W-00001','Warehouse-165','Delhi',1234,'Leasable Space','cluster-a-32',
//         TRUE,false);

let queries = [];

for (let i = 0; i <= 1000; i++) {
  const query = `insert into warehouses values('${get("code")}','${get("name")}','${get("city")}',${get(
    "space_available"
  )},'${get("type")}','${get("cluster")}',${get("is_registered")},${get("is_live")});`;
  queries.push(query);
}

let q = queries.join("\n");
console.log(q);

// Object.entries(data).forEach((k, vi) => {
//   const v = k[1];
//   const query = `insert into warehouses values('${v.code}','${v.name}','${v.city}',${v.space_available},'${v.type}','${v.cluster}',${v.is_registered},${v.is_live});`;
//   queries.push(query);
// });
