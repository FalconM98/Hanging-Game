let word : string[] = [
    'PAPAYA',
    'LUISA',
    'PEDRO',
    'AGUACATE',
    'GATO',
    'PIZZA'
];


export function getRamdonWord(){
    const randomIndex = (Math.floor(Math.random() * word.length));

    return word[randomIndex];
}