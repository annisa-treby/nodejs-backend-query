const getCategoryList = async (req, res, service) =>{
    let categories;

    if (req.query.id){
        const id = req.query.id;
        categories = await service.getCategoryById(id);
    }else if (req.query.name){
        const name = req.query.name;
        categories = await service.getCategoryByName(name);
    } else {
        categories = await service.getAllCategories();
    }

    res.send(categories);
};

const addCategory = async (req, res, service) => {
       const body = req.body;
       const newData = await service.saveCategory(body);
       res.send(newData);
}

const updateNewCategory = async (req, res, service) => {
    const body = req.body;
    const newCategory = await service.updateCategory(body);
    res.send(newCategory);
}

const deletingCategory = async (req, res, service) => {
    const id = req.params.id;
    const response = await service.deleteCategory(id);
    res.send(response)
}

module.exports = {getCategoryList, addCategory, updateNewCategory, deletingCategory}