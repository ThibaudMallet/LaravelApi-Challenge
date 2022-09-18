<?php

namespace App\Http\Controllers;

use App\Models\Videogame;
use Illuminate\Http\Request;

class VideogameController extends Controller
{
    /**
     * /videogames/[id]
     * GET
     */
    public function read($id)
    {
        // Get item or send 404 response if not
        $item = Videogame::find($id);

        // Si on a un résultat
        if (!empty($item)) {
            // Return JSON of this list
            return response()->json($item, 200);
        } else { // Sinon
            // HTTP status code 404 Not Found
            return response('', 404);
        }
    }

    /**
     * /videogames/[id]/reviews
     * GET
     */
    public function getReviews($id)
    {
        // Get item or send 404 response if not
        $item = Videogame::find($id);

        // Si on a un résultat
        if (!empty($item)) {
            // Retrieve all related Reviews (thanks to Relationships)
            // $reviews = $item->reviews->load(['videogame', 'platform']);
            // But, relationships with videogame & plaftorm are not configured yet
            $reviews = $item->reviews;

            // Return JSON of this list
            return response()->json($reviews, 200);
        } else { // Sinon
            // HTTP status code 404 Not Found
            return response('', 404);
        }
    }

    public function list()
    {
        // Get all items
        $list = Videogame::all();

        // Return JSON of this list
        return response()->json($list, 200);
    }

    public function create (Request $request) {
        // Extrait les données de la requêt
        $name = $request->input('name');
        $editor = $request->input('editor');

        // Vérifie les données et retourne une erreur 422 si besoin
        if ( empty($name) || empty($editor) ) return response(null, 422);

        // Crée une instance de Task et renseigne les propriétés
        $videogame = new Videogame();
        $videogame->name = $name;
        $videogame->editor = $editor;

        // Sauvegarde la donnée en bdd et réponds suivant l'état
        $result = $videogame->save();
        if ( !$result ) return response(null, 500);
        else return response()->json($videogame, 201);
    }
}
