from flask import Flask, jsonify, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

# In-memory database
books = [
    {"id": 1, "title": "To Kill a Mockingbird", "author": "Harper Lee"},
    {"id": 2, "title": "1984", "author": "George Orwell"},
]

class Books(Resource):
    def get(self):
        return jsonify(books)

    def post(self):
        new_book = request.get_json()
        new_book["id"] = len(books) + 1
        books.append(new_book)
        return jsonify(new_book), 201

class Book(Resource):
    def get(self, book_id):
        book = next((book for book in books if book["id"] == book_id), None)
        if book:
            return jsonify(book)
        return {"message": "Book not found"}, 404

    def put(self, book_id):
        book = next((book for book in books if book["id"] == book_id), None)
        if book:
            updated_book = request.get_json()
            book.update(updated_book)
            return jsonify(book)
        return {"message": "Book not found"}, 404

    def delete(self, book_id):
        global books
        books = [book for book in books if book["id"] != book_id]
        return "", 204

api.add_resource(Books, "/books")
api.add_resource(Book, "/books/<int:book_id>")

if __name__ == "__main__":
    app.run(debug=True)
