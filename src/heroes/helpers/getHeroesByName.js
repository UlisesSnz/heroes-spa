import { heroes } from '../data/heroes';

export const getHeroesByName = (name = '') => {
    const heroName = name.toLowerCase().trim();

    if(heroName.length <= 0) return [];

    return heroes.filter(hero => hero.superhero.toLowerCase().includes(heroName));
}