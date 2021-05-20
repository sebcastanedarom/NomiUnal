import {Request, Response} from 'express';


class IndexController {
    public index (req: Request, res: Response) {
        res.json('yei');
    }
}

const indexContoller = new IndexController();
export default indexContoller;