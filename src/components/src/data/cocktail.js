const drinkMadrid = [
    {
        "nazione": "MADRID",
        "nome": "Madrid",
        "prezzo": 10,
        "ingredienti": [
            "Triple sec",
            "Sciroppo di agave messicano",
            "Distillato di olive",
            "Vino rosso Chianti DOC"
        ],
        "descrizione": "Un cocktail intenso e passionale, come il battito di una notte spagnola. \nIl Triple Sec sprigiona note agrumate e seducenti, lo sciroppo di agave messicano avvolge con la sua dolcezza dorata, mentre il distillato di olive aggiunge un tocco audace e intrigante. \nIl vino rosso Chianti DOC completa il tutto con profondità e calore, creando un equilibrio sensuale tra forza e eleganza. \n Madrid è un brindisi al desiderio — profondo, sofisticato e irresistibilmente mediterraneo. \n",
        "valutazioni": {
            "alcool": 3,
            "citrico": 1,
            "amaro": 2,
            "dolce": 4,
            "fruttato": 1,
            "speziato": 4
        }
    }
];

const drinkSantaClausVillage = [
    {
        "nazione": "SANTA",
        "nome": "Santa Claus Village",
        "prezzo": 10,
        "ingredienti": [
            "Campari bitter",
            "Vermouth rosso",
            "Fonduta di cioccolato",
            "Liquore bio al cioccolato fondente"
        ],
        "descrizione": "Un irresistibile peccato di piacere, nato per sedurre i sensi. \nIl Campari Bitter e il Vermouth rubino creano un preludio elegante e intrigante, mentre la fonduta di cioccolato e il liquore bio al fondente si fondono in un abbraccio caldo e vellutato. \nOgni sorso è un gioco di seduzione tra amaro e dolce, luce e ombra. \nSanta Claus Village è pura tentazione liquida — intensa, sensuale e profondamente avvolgente.",
        "valutazioni": {
            "alcool": 3,
            "citrico": 1,
            "amaro": 1,
            "dolce": 4,
            "fruttato": 2,
            "speziato": 1
        }
    }
];

const drinkMosca = [
    {
        "nazione": "MOSCA",
        "nome": "Mosca",
        "prezzo": 10,
        "ingredienti": [
            "Altamura vodka",
            "Cordiale di lampone fresco",
            "Succo di lime fresco"
        ],
        "descrizione": "Un irresistibile peccato di piacere, nato per sedurre i sensi. \nIl Campari Bitter e il Vermouth rubino creano un preludio elegante e intrigante, mentre la fonduta di cioccolato e il liquore bio al fondente si fondono in un abbraccio caldo e vellutato. \nOgni sorso è un gioco di seduzione tra amaro e dolce, luce e ombra. \nSanta Claus Village è pura tentazione liquida — intensa, sensuale e profondamente avvolgente.",
        "valutazioni": {
            "alcool": 4,
            "citrico": 3,
            "amaro": 0,
            "dolce": 1,
            "fruttato": 1,
            "speziato": 1
        }
    }
];

const drinkHawaii = [
    {
        "nazione": "HAWAII",
        "nome": "Hawaii",
        "prezzo": 10,
        "ingredienti": [
            "Rum bianco infuso con ananas, scorze di lime e cocco",
            "Rum al cocco",
            "Dash di miele"
        ],
        "descrizione": "Un’esplosione di sensualità tropicale che conquista al primo sorso. \nIl rum bianco infuso con ananas, scorze di lime e cocco sprigiona profumi esotici e solari, mentre il rum al cocco accarezza il palato con la sua morbidezza vellutata. \nUn delicato tocco di miele ne amplifica il piacere, donando una dolcezza avvolgente e irresistibile. \nHawaii è un sogno di mare e passione — un viaggio sensuale tra onde, luce e desiderio.",
        "valutazioni": {
            "alcool": 5,
            "citrico": 3,
            "amaro": 3,
            "dolce": 1,
            "fruttato": 1,
            "speziato": 3
        }
    }
];

const drinkNewYork = [
    {
        "nazione": "NEW YORK",
        "nome": "NewYork",
        "prezzo": 10,
        "ingredienti": [
            "Wild Turkey Whiskey",
            "Estratto di mandarino",
            "Liquore al melone",
            "Cordiale di mandarino e melone"
        ],
        "descrizione": "Audace, sofisticato e sorprendentemente sensuale. \nIl carattere deciso del Wild Turkey Whiskey si intreccia con la luce vibrante dell’estratto di mandarino, mentre il liquore e il cordiale al melone ne avvolgono i toni con una dolce carezza tropicale. \nNew York è un cocktail che incarna lo spirito della metropoli: intenso, elegante e inebriante come una notte a Manhattan.",
        "valutazioni": {
            "alcool": 3,
            "citrico": 2,
            "amaro": 2,
            "dolce": 1,
            "fruttato": 3,
            "speziato": 2
        }
    }
];

const drinkToronto = [
    {
        "nazione": "TORONTO",
        "nome": "Toronto",
        "prezzo": 10,
        "ingredienti": [
            "Bacardi carta blanca",
            "Menta liquida",
            "Cordiale di miele",
            "Soda al pompelmo rosa",
            "Estratto di pera"
        ],
        "descrizione": "Un cocktail dal fascino sottile e irresistibile. \nIl Bacardi Carta Blanca avvolge con la sua eleganza, mentre il cordiale di miele regala morbide sfumature dorate. \nL’estratto di pera aggiunge una dolcezza vellutata, esaltata dalla freschezza vivace della menta liquida e dalla frizzantezza della soda al pompelmo rosa. \nToronto è un sorso raffinato e sensuale, che conquista con la sua armonia tra dolce, fresco e fruttato.",
        "valutazioni": {
            "alcool": 5,
            "citrico": 4,
            "amaro": 4,
            "dolce": 3,
            "fruttato": 2,
            "speziato": 1
        }
    }
];

const drinkPraga = [
    {
        "nazione": "PRAGA",
        "nome": "Praga",
        "prezzo": 10,
        "ingredienti": [
            "Bacardi carta oro",
            "Essenza di ananas",
            "Cordiale di melograno e lampone",
            "Liquore ai fiori di sambuco"
        ],
        "descrizione": "Un elisir elegante e misterioso, come una notte tra le luci dorate della città. \nIl Bacardi Carta Oro svela il suo calore ambrato, accarezzato dall’essenza di ananas e dal cordiale di melograno e lampone, intensi e passionali. \nIl liquore ai fiori di sambuco avvolge il tutto in un profumo delicato e sensuale. \nPraga è un cocktail che seduce con grazia e profondità — un incontro tra dolcezza, mistero e fascino irresistibile.",
        "valutazioni": {
            "alcool": 5,
            "citrico": 4,
            "amaro": 4,
            "dolce": 3,
            "fruttato": 2,
            "speziato": 1
        }
    }
];

const drinkSeoul = [
    {
        "nazione": "SEOUL",
        "nome": "Seoul",
        "prezzo": 10,
        "ingredienti": [
            "Altamura vodka",
            "Purea di maracuja",
            "St Germain",
            "Ginger beer"
        ],
        "descrizione": "Vibrante, sensuale e sorprendente come una notte d’estate tra le luci della città. \nL’Altamura Vodka dona eleganza e purezza, la polpa di maracuja accende il palato con la sua passione tropicale, mentre lo St-Germain aggiunge una carezza floreale irresistibile. \nLa Ginger Beer chiude con una frizzante nota di carattere. \nSeoul è un’esplosione di fascino e desiderio — un cocktail che seduce con equilibrio, energia e mistero orientale.",
        "valutazioni": {
            "alcool": 5,
            "citrico": 4,
            "amaro": 4,
            "dolce": 3,
            "fruttato": 2,
            "speziato": 1
        }
    }
];


export { drinkMadrid, drinkHawaii, drinkNewYork, drinkMosca, drinkSantaClausVillage, drinkToronto, drinkPraga, drinkSeoul };
