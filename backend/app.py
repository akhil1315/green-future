from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory data store for ideas
ideas = []

# Route to get all ideas or add a new idea
@app.route('/ideas', methods=['GET', 'POST'])
def manage_ideas():
    if request.method == 'POST':
        idea_content = request.json.get('idea')
        if not idea_content or not idea_content.get('title') or not idea_content.get('description'):
            return jsonify({'error': 'Title and description are required'}), 400

        idea_id = len(ideas) + 1
        ideas.append({
            'id': idea_id,
            'content': {'title': idea_content['title'], 'description': idea_content['description']},
            'status': 'pending',  # Default status
            'votes': 0
        })
        return jsonify({'message': 'Idea submitted successfully', 'id': idea_id}), 201

    return jsonify(ideas)

# Route to update the status of an idea (approve/reject)
@app.route('/ideas/status/<int:idea_id>', methods=['PUT'])
def update_status(idea_id):
    new_status = request.json.get('status')
    if new_status not in ['approved', 'rejected']:
        return jsonify({'error': 'Invalid status'}), 400

    for idea in ideas:
        if idea['id'] == idea_id:
            idea['status'] = new_status
            return jsonify({'message': f'Idea {new_status} successfully'}), 200

    return jsonify({'error': 'Idea not found'}), 404

# Route to vote for an idea
@app.route('/ideas/vote/<int:idea_id>', methods=['POST'])
def vote_idea(idea_id):
    for idea in ideas:
        if idea['id'] == idea_id:
            if idea['status'] != 'approved':
                return jsonify({'error': 'Only approved ideas can be voted on'}), 403
            idea['votes'] += 1
            return jsonify({'message': 'Vote cast successfully'}), 200
    return jsonify({'error': 'Idea not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
