import {Router} from 'express';

import indexContoller from '../controllers/indexController';



class IndexRoutes {

    public router: Router = Router();
    constructor (){
        this.config();
    }
    config(): void {
        this.router.get('/', indexContoller.index);

    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;