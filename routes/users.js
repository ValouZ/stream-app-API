var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var userController = require("../controllers/userControllers");
var auth = require("../middleware/auth");

/* GET users listing. 
http://localhost:8080/users
*/
router.get("/", auth, userController.getAllUsers);

/* POST users listing. 
http://localhost:8080/users/create
*/
router.post("/create", auth, userController.createUser);

// router.put("/", async (req, res, next) => {
//   res.json(
//     await mongoose.model("User").findByIdAndUpdate(req.params.id, req.body)
//   );
// });

/* PUT users listing. 
http://localhost:8080/users/update
*/
router.put("/update", auth, userController.updateUser);

/* DELETE users listing. 
http://localhost:8080/users/delete/:id
*/
router.delete("/delete/:id", auth, userController.deleteUser);

/* GET users listing. 
http://localhost:8080/users/:id
*/
router.get("/:id", auth, userController.getUser);

router.post("/login", userController.login);

module.exports = router;
