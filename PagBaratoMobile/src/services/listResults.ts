import { ImageProps } from "react-native";

const arrozImage = require('../assets/products/arroz.jpg');
const feijaoImage = require('../assets/products/feijao.webp');
const cocacola2Image = require('../assets/products/coca-cola-2.jpg');
const cocacola600Image = require('../assets/products/coca-cola-600.jpg');
const maioneseheinzImage = require('../assets/products/maionese_heinz.webp');
const maioneseImage = require('../assets/products/maionese.jpg');


export interface Product {
    id: string;
    name: string;
    establishment: string;
    price: number;
    image: ImageProps["source"];
}


