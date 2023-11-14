import { heroes } from '../data/heroes';

export const getHeroesByPublisher = (publisher) => {
    const publishers = ['DC Comics', 'Marvel Comics'];
    if(!publishers.includes(publisher)) {
        throw new Error(`${publisher} no encontrado`);
    }

    return heroes.filter(hero => hero.publisher === publisher);
}