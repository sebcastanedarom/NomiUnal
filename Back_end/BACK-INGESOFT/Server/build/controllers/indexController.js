"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json('yei');
    }
}
const indexContoller = new IndexController();
exports.default = indexContoller;
