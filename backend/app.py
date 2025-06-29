import sqlite3
import string
import random
from flask import Flask, request, redirect, jsonify
from flask_cors import CORS

# App configuration
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Function to connect to the SQLite database
def get_db_connection():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row  # Access rows by column name
    return connection

# Function to generate a unique short code for the URL
def create_short_link():
    characters = string.ascii_letters + string.digits  # Allowed characters
    short_code = ''.join(random.choice(characters) for i in range(6))  # Generate 6-char code

    conn = get_db_connection()
    # Check if the generated code already exists
    older_link = conn.execute('SELECT id FROM links WHERE short_code = ?', (short_code,)).fetchone()
    conn.close()

    if older_link:
        # If code exists, generate a new one recursively
        return create_short_link()
    else:
        return short_code

# --------------------------------------------------------------------------------------
# Endpoint to shorten a URL
@app.route('/short', methods=['POST'])
def shorten_link():
    data = request.get_json()
    original_link = data.get('url')
    
    if not original_link:
        # Return error if URL is missing
        return jsonify({'Error': 'URL is required'}), 400
    
    short_code = create_short_link()

    conn = get_db_connection()
    # Insert the original link and its short code into the database
    conn.execute('INSERT INTO links (original_link, short_code) VALUES (?, ?)', (original_link, short_code))
    conn.commit()
    conn.close()

    # Build the short URL using the host URL and the short code
    short_url = request.host_url + short_code
    return jsonify({'shortUrl': short_url})

# Endpoint to redirect from a short code to the original URL
@app.route('/<short_code>')
def redirect_to_url(short_code):
    conn = get_db_connection()
    # Retrieve the original link for the given short code
    link = conn.execute('SELECT original_link FROM links WHERE short_code = ?', (short_code,)).fetchone()

    if link is None:
        # Return error if the short code does not exist
        return jsonify({'Error': 'Link not found'}), 404
    # Increment the click counter for the link
    conn.execute('UPDATE links SET clicks = clicks + 1 WHERE short_code = ?', (short_code,))
    conn.commit()
    conn.close()

    # Redirect the user to the original URL
    return redirect(link['original_link'])

# Endpoint to get statistics for all shortened links
@app.route('/stats')
def stats():
    conn = get_db_connection()
    # Retrieve all links with their original URL, short code, and click count
    links = conn.execute('SELECT original_link, short_code, clicks FROM links').fetchall()
    conn.close()

    # Convert the result to a list of dictionaries
    links_list = [dict(link) for link in links]
    
    return jsonify(links_list)

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)