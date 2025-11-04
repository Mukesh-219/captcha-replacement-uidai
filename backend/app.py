from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from model_utils import load_artifacts, prepare_features
import os


app = Flask(__name__, static_folder='static')
CORS(app)


clf, scaler = load_artifacts()


@app.route('/predict', methods=['POST'])
def predict():
data = request.get_json(force=True)
X = prepare_features(data)
Xs = scaler.transform(X)
prob = clf.predict_proba(Xs)[0]
pred = int(clf.predict(Xs)[0])
label = 'bot' if pred == 1 else 'human'
confidence = float(prob[pred])
return jsonify({'label': label, 'confidence': confidence})


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
return send_from_directory(app.static_folder, path)
else:
return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
app.run(host='0.0.0.0', port=5000)
