// ==UserScript==
// @name         Show high IV
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pokekartan.se/08n/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ivThreshold = 85;
    const specialPokemons = [
        'Nidoqueen',
        'Nidoking',
        'Ninetales',
        'Poliwrath',
        'Alakazam',
        'Machamp',
        'Victreebel',
        'Rapidash',
        'Exeggcutor',
        'Rhydon',
        'Chansey',
        'Gyarados',
        'Lapras',
        'Omastar',
        'Snorlax',
        'Zapdos',
        'Moltres',
        'Dragonair',
        'Dragonite',
        'Scizor',
        'Donphan',
        'Blissey',
        'Raikou',
        'Larvitar',
        'Pupitar',
        'Tyranitar',
        'Lugia'
    ];

    // Hook into ajax request so we can modify returned data
    $.ajaxSetup({
        dataFilter: function (data, type) {
            if (type !== 'json')
                return data;

            var json = JSON.parse(data);
            if (json !== undefined && json.pokemons !== undefined && json.pokemons.length > 0)
            {
                json.pokemons = xxx_filterPokemons(json.pokemons);
                return JSON.stringify(json);
            }

            return data;
        }
    });

    function xxx_filterPokemon(mon) {
        return xxx_hasEnoughIv(mon, ivThreshold) || xxx_isNamedMon(mon) || xxx_isUltraRare(mon);
    }

    function xxx_isUltraRare(mon) {
        return mon.pokemon_rarity === 'Ultra Rare';
    }

    function xxx_isNamedMon(mon) {
        return $.inArray(mon.pokemon_name, specialPokemons) > -1;
    }

    function xxx_hasEnoughIv(mon, threshold)
    {
        var a = mon.individual_attack;
        var d = mon.individual_defense;
        var s = mon.individual_stamina;
        if (a !== null && d !== null && s !== null)
            return getIv(a, d, s) >= threshold;

        return false;
    }

    function xxx_filterPokemons(pokemons) {
        var vals=[];
        for (var i= 0; i < pokemons.length; i++){
            if (xxx_filterPokemon(pokemons[i]) == true) {
                vals.push(pokemons[i]);
            }
        }
        return vals;
    }
})();