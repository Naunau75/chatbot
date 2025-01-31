from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = Flask(__name__)
CORS(app)

# Charger le modèle et le tokenizer
model_name = "mistralai/Mistral-7B-v0.1"  # ou un autre modèle compatible
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    # Préparer l'entrée
    inputs = tokenizer(user_message, return_tensors="pt")

    # Générer la réponse
    with torch.no_grad():
        outputs = model.generate(
            inputs.input_ids, max_length=100, num_return_sequences=1, temperature=0.7
        )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)
