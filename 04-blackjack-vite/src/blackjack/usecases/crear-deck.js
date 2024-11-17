import _ from "underscore";
// Esta función crea un nuevo deck

/**
 * Esta función crea un nuevo deck
 * @param {Array<string>} tiposDeCarta -Ejemplo
 * @param {Array<string>} tiposEspeciales -Ejemplo
 * @returns {Array<string>}  retorna un nuevo deck
 */
export const crearDeck = (tiposDeCarta, tiposEspeciales) => {

    if(!tiposDeCarta || tiposDeCarta === 0 ) 
        throw new Error('TiposDeCarta es obligatorio como arreglo de string');

    let deck=[];

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tiposDeCarta ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos ) {
        for( let esp of tiposEspeciales ) {
            deck.push( esp + tipo);
        }
    }
    // console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}