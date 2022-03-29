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
    place: string;
    price: number;
    image: ImageProps["source"];
}


export const productList: Product[] = [
    {
        id: '1',
        name: 'Coca-Cola - 2l',
        place: 'Mercado Extra',
        price: 7.99,
        image: cocacola2Image,
    },
    {
        id: '2',
        name: 'Coca-Cola - 600ml',
        place: 'Mercado Extra',
        price: 3.99,
        image: cocacola600Image,
    },
    {
        id: '3',
        name: 'Coca-Cola - 600ml',
        place: 'Oxxo',
        price: 4.99,
        image: cocacola600Image,
    },
    {
        id: '4',
        name: 'Arroz Camil - 1kg',
        place: 'Oxxo',
        price: 5.40,
        image: arrozImage,
    },
    {
        id: '5',
        name: 'Feijão Carioca Meu Biju - 1kg',
        place: 'Mercado do Zé',
        price: 7.98,
        image: feijaoImage,
    },
    {
        id: '6',
        name: 'Maionese Heinz - 390g',
        place: 'Carrefour',
        price: 9.99,
        image: maioneseheinzImage,
    },
    {
        id: '7',
        name: 'Maionese Hellmann`s Tradicional - 500g',
        place: 'Carrefour',
        price: 6.90,
        image: maioneseImage,
    },
];
