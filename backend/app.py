import sqlite3
import string
import random
from flask import Flask, request, redirect, jsonify
from flask_cors import CORS

#Config
app = Flask(__name__)
CORS(app)

#Function to connect the database
def get_db_connection():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row #Access rows by name
    return connection

#Generate a short link
def create_short_link():
    characters = string.ascii_letters + string.digits
    short_code = ''.join(random.choice(characters) for i in range (6))

    conn = get_db_connection()
    older_link = conn.execute('SELECT id FROM links WHERE short_code = ?', (short_code,)).fetchone()
    conn.close()

    if older_link:
        return create_short_link()
    else:
        return short_code

#Endpoints
@app.route('/short', methods =['POST'])
def shorten_link():
    data = request.get_json()
    original_link = data.get('url')
    
    if not original_link:
        return jsonify({'Error': 'URL is required'}), 400
    
    short_code = create_short_link()

    conn = get_db_connection()
    conn.execute('INSERT INTO links (original_link, short_code) VALUES (?, ?)', (original_link, short_code))
    conn.commit()
    conn.close()

    short_url = request.host_url + short_code
    return jsonify({'shortUrl' : short_url})

@app.route('/<short_code>')
def redirect_to_url(short_code):
    conn = get_db_connection()
    link = conn.execute('SELECT original_link FROM links WHERE short_code = ?', (short_code,)).fetchone()

    if link is None:
        return jsonify({'Error' : 'Link not found'}), 404
    conn.execute('UPDATE links SET clicks = clicks + 1 WHERE short_code = ?', (short_code,))
    conn.commit()
    conn.close()

    return redirect(link['original_link'])

@app.route('/stats')
def stats():
    conn = get_db_connection()
    links = conn.execute('SELECT original_link, short_code, clicks FROM links').fetchall()
    conn.close()

    links_list = [dict(link) for link in links]
    
    return jsonify(links_list)

if __name__ == '__main__':
    app.run(host = '0.0.0.0',debug = True)