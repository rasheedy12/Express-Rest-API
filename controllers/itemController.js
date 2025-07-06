let items = [
  { id: 1, name: 'Laptop', description: 'A powerful computing device.' },
  { id: 2, name: 'Keyboard', description: 'A mechanical keyboard with RGB lighting.' }
];
let nextId = 3; 

// --- Controller Functions ---

exports.getAllItems = (req, res) => {
  res.status(200).json(items);
};

exports.getItemById = (req, res, next) => {
  const item = items.find(i => i.id === parseInt(req.params.id));

  if (!item) {
    const error = new Error(`Item with ID ${req.params.id} not found.`);
    error.status = 404;
    return next(error); 
  }

  res.status(200).json(item);
};


exports.createItem = (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    const error = new Error('Validation Error: Name and description are required.');
    error.status = 400; 
    return next(error);
  }

  const newItem = {
    id: nextId++,
    name,
    description
  };

  items.push(newItem);
  res.status(201).json(newItem);
};


exports.updateItem = (req, res, next) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex === -1) {
    const error = new Error(`Item with ID ${itemId} not found.`);
    error.status = 404;
    return next(error);
  }

  const { name, description } = req.body;
  if (!name || !description) {
    const error = new Error('Validation Error: Name and description are required.');
    error.status = 400;
    return next(error);
  }

  const updatedItem = { id: itemId, name, description };
  items[itemIndex] = updatedItem;

  res.status(200).json(updatedItem);
};

exports.deleteItem = (req, res, next) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex === -1) {
    const error = new Error(`Item with ID ${itemId} not found.`);
    error.status = 404;
    return next(error);
  }

  items.splice(itemIndex, 1);
  res.status(200).json({ message: `Item with ID ${itemId} has been deleted.` });
};