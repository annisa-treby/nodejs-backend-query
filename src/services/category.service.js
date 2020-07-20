const connection = require("../../dbConn")
const logEvent = require("../../event/myEmitters")
const {ERROR} = require('../../constant/error-event.constant')

class CategoryService {

    async getAllCategories() {
        const categoryList = new Promise((resolve, reject) => {
            connection.query("SELECT * from Category",
                (err, rows, fields)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
                }
                )
        })
        let result;
        try {
            result = await categoryList;
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET ALL CATEGORY FAILED',
                logMessage: e
            })
        }
        return result;
    }

    async getCategoryById(id) {
        const category = new Promise((resolve, reject) => {
            connection.query(`SELECT * from Category where id=${id}`,
                (err, row, fields) => {
                if (err){
                    reject(err);
                } else {
                    resolve(row)
                }
                })
        })
        let result;
        try {
            result = await category;
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET CATEGORY BY ID FAILED',
                logMessage: e
            })        }
        return result;
    }

    async getCategoryByName(name){
        const category = new Promise((resolve, reject) => {
            connection.query(`SELECT * from Category where name like "%${name}%"`,
                (err, row, fields)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(row)
                }
                })
        })
        let result;
        try {
            result = await category;
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET CATEGORY BY NAME FAILED',
                logMessage: e
            })        }
        return result;
    }

    async saveCategory(category){
        const newCategory = new Promise((resolve, reject) => {
            connection.query('INSERT INTO Category (name) values (?)',[category.name] ,
                (err, row, fields) => {
                if (err){
                    reject(err);
                } else {
                    resolve(row);
                }
                })
        })
        let result;
        try {
            result = await newCategory;
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'POST CATEGORY FAILED',
                logMessage: e
            })
        }
        return result;
    }

    async updateCategory(category){
        const newCategory = new Promise((resolve, reject) => {
            connection.query('UPDATE Category set name=? where id=?',[category.name, category.id],
                (err, rows, fields) => {
                if (err){
                    reject(err);
                } else {
                    resolve(rows);
                }
                })
        })
        let result;
        try {
            result = await newCategory;
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'UPDATE CATEGORY FAILED',
                logMessage: e
            })
        }
        return result;
    }

    async deleteCategory(id){
        const category = new Promise((resolve, reject) => {
            connection.query(`DELETE FROM Category where id=${id}`,
                (err, rows, fields) => {
                    if (err){
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                })
        })
        let result;
        try {
            result =await category;
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'DELETE CATEGORY FAILED',
                logMessage: e
            })        }
        return result;
    }
}

module.exports = CategoryService;