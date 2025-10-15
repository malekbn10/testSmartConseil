<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $books = Book::all();

            if ($books->isEmpty()) {
                return response()->json([
                    'message' => 'Aucun livre trouvé.'
                ], 200);
            }

            return response()->json($books, 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la récupération des livres.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'auteur' => 'required|string|max:255',
                'annee' => 'required|integer'
            ]);

            $book = Book::create($validated);

            return response()->json([
                'message' => 'Livre ajouté avec succès.',
                'book' => $book
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de l’ajout du livre.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Book::findOrFail($id);
        return response()->json($book, 200);


    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id)
    {
        try {
            $book = Book::findOrFail($id);

            $validated = $request->validate([
                'titre' => 'sometimes|string|max:255',
                'auteur' => 'sometimes|string|max:255',
                'annee' => 'sometimes|integer'
            ]);

            $book->update($validated);

            return response()->json([
                'message' => 'Livre mis à jour avec succès.',
                'book' => $book
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Livre introuvable'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la mise à jour du livre.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $book = Book::findOrFail($id);
            $book->delete();

            return response()->json([
                'message' => 'Livre supprimé avec succès.'
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Livre introuvable'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la suppression du livre.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}