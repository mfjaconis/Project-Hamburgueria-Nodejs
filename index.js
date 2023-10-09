const express = require("express");
const uuid = require("uuid");

const port = 3000;
const app = express();
app.use(express.json());

const orders = [];

const checkedOrders = (request, response, next) => {
  const { id } = request.params;

  const index = orders.findIndex((order) => order.id === id);

  if (index < 0) {
    return response.status(404).json({ error: "User not found" });
  }

  request.orderIndex = index;
  request.orderId = id;

  next();
};

const checkOpeningWindow = (request, response, next) =>{
    console.log(request.method)
    console.log(request.url)


next()
}

app.get("/orders", checkOpeningWindow, (request, response) => {
  return response.json(orders);
});

app.get("/orders/:id", checkedOrders, checkOpeningWindow, (request, response) => {

    const index = request.orderIndex
    const id = request.orderId

  return response.status(201).json(orders[index])
});

app.post("/orders", checkOpeningWindow, (request, response) => {
  const { orde, clientName, price, status } = request.body;

  const order = { id: uuid.v4(), orde, clientName, price, status };

  orders.push(order);

  return response.status(201).json(order);
});

app.put("/orders/:id", checkedOrders, (request, response) => {
  const { orde, clientName, price, status } = request.body;

  const index = request.orderIndex;
  const id = request.orderId;

  const updateOrders = { id, orde, clientName, price, status };

  orders[index] = updateOrders;

  return response.json(updateOrders);
});

app.delete("/orders/:id", checkedOrders, checkOpeningWindow, (request, response) => {
  const index = request.orderIndex;

  orders.splice(index, 1);

  return response.status(204).json();
});

app.patch("/orders/:id", checkedOrders, checkOpeningWindow, (request, response) => {
    const { orde, clientName, price, status } = request.body;

    const index = request.orderIndex
    const id = request.orderId

    const updateStatus  = { id, orde: orders[index].orde, clientName: orders[index].clientName, price: orders[index].price, status:"pronto"}
    
    orders[index] = updateStatus 


  
    return response.status(201).json(updateStatus)   
})



app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
